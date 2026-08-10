import { KNOWLEDGE_CARDS } from "./_lib/knowledge-base.js";
import { retrieve } from "./_lib/retrieve.js";
import { parseAssistantReply } from "./_lib/escalation.js";

/**
 * The assistant endpoint.
 *
 * Ported from the Netlify build in head-and-co-openrouter-ready/. The logic is
 * unchanged; what moved is the platform. It runs on Vercel's edge runtime,
 * which speaks the same Request/Response the original already used.
 *
 * The whole reason this is a server function and not a fetch from the browser
 * is the API key. OPENROUTER_API_KEY is read from the environment here and
 * never reaches the client bundle. A chat widget calling OpenRouter directly
 * would publish the key to anyone who opens devtools, and it bills to whoever
 * owns it.
 */
export const config = { runtime: "edge" };

const MODEL_COOLDOWN_MS = 60_000;
const modelCooldownUntil = {};

/** One message is a question, not an essay. Caps what a stranger can bill. */
const MAX_CHARS = 1200;

const SYSTEM_PROMPT = `You are a warm, professional assistant for Head & Co, a head spa on King Abdulaziz Road, Al Mohammadiyyah, Jeddah. You are embedded in the business's own website.

Below "VERIFIED BUSINESS INFO:" are the ONLY business facts you may use, including any links listed under each card.

Rules:
- Reply in the same language the guest wrote in (Arabic or English). Sound like a real front-desk person, not a script.
- Short warm blocks separated by line breaks. Put key facts (hours, prices, treatment names) in *bold*. Use a short bullet list only when you list 3 or more items. At most 1-2 light emoji.
- Answer ONLY from the verified info. Never invent a price, duration, policy, link or fact that is not listed below.
- You are on the website, so guide people around it. When a verified card gives a link starting with "/" that answers the question better than a paragraph can, offer it: "you can read the whole ritual here: /ritual". Use the exact path.
- Be a helpful guide: after answering, if it feels natural, offer one next step - recommend a treatment based on what the guest needs, point at the right page, or ask one short follow-up question.
- Never confirm or create a booking yourself. Direct the guest to Fresha or say the team will follow up to confirm.
- Links: use the exact URL from the verified info. Do not change it.
- If the guest asks for a person, manager or real human, is upset or complaining, or the need cannot be handled here (refunds, complaints, complex booking), end your reply with a line containing only: [ESCALATE]
- If the verified info does not cover what was asked (a price not listed, live availability, parking, anything unsure), say clearly that you are not certain and a team member will confirm shortly. Never guess.
- Do not mention that you are an AI unless the guest directly asks.`;

function sendJson(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export default async function handler(req) {
  if (req.method !== "POST") return sendJson(405, { error: "Method not allowed" });

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    return sendJson(500, {
      error: "The assistant is not configured yet. OPENROUTER_API_KEY is missing.",
    });
  }

  const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";
  const OPENROUTER_FALLBACK_MODELS = (
    process.env.OPENROUTER_FALLBACK_MODELS ||
    [
      "google/gemma-4-26b-a4b-it:free",
      "poolside/laguna-s-2.1:free",
      "openai/gpt-oss-20b:free",
      "poolside/laguna-xs-2.1:free",
      "nvidia/nemotron-3-nano-30b-a3b:free",
    ].join(",")
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const APP_URL = process.env.SITE_URL || "https://soulo-bice.vercel.app";

  let body;
  try {
    body = await req.json();
  } catch {
    return sendJson(400, { error: "Invalid JSON" });
  }

  const history = Array.isArray(body.history) ? body.history : [];
  const messages = history
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return sendJson(400, { error: "A user message is required." });
  }

  const query = messages[messages.length - 1].content;
  const matched = retrieve(query, KNOWLEDGE_CARDS, 3);

  // A question nothing matched is the most useful signal this thing produces:
  // it is a gap in the knowledge base, in a real guest's own words.
  if (!matched.length) console.warn("[knowledge-gap]", query);

  const verifiedInfo = matched.length
    ? matched
        .map((c) => {
          const lines = [`## ${c.title}`, c.body];
          for (const link of c.links || []) lines.push(`- ${link.label}: ${link.url}`);
          return lines.join("\n");
        })
        .join("\n\n")
    : "(No verified business info matched this question. Say you are not certain, tell the guest a team member will confirm shortly, and escalate.)";

  const models = [...new Set([OPENROUTER_MODEL, ...OPENROUTER_FALLBACK_MODELS])];
  let lastStatus = 0;
  let lastError = "The assistant is unavailable right now.";

  for (const model of models) {
    if ((modelCooldownUntil[model] || 0) > Date.now()) continue;

    let resp;
    try {
      resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": APP_URL,
          "X-Title": "Head & Co Assistant",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: `${SYSTEM_PROMPT}\n\nVERIFIED BUSINESS INFO:\n${verifiedInfo}` },
            ...messages,
          ],
          max_tokens: 400,
          temperature: 0.4,
        }),
      });
    } catch (err) {
      lastStatus = 502;
      lastError = err.message || "The assistant is unavailable right now.";
      continue;
    }

    let data;
    try {
      data = await resp.json();
    } catch {
      data = {};
    }

    // A free model that is rate limited is not broken, it is busy. Cool it off
    // and try the next one rather than showing the guest an error.
    if (resp.status === 429) {
      modelCooldownUntil[model] = Date.now() + MODEL_COOLDOWN_MS;
      lastStatus = 429;
      lastError = data?.error?.message || "Busy right now.";
      continue;
    }

    if (!resp.ok) {
      return sendJson(resp.status, { error: data?.error?.message || "The assistant is unavailable." });
    }

    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== "string" || !raw.trim()) {
      return sendJson(502, { error: "The assistant returned nothing." });
    }

    const parsed = parseAssistantReply(raw);
    return sendJson(200, {
      reply: parsed.reply,
      model: data?.model || model,
      escalate: parsed.escalate || !matched.length,
    });
  }

  return sendJson(lastStatus || 503, { error: lastError });
}
