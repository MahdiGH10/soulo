import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { site } from "../data/site.js";
import { usePrefersReducedMotion } from "../hooks/useMotion.js";
import "./ChatWidget.css";

/**
 * The front desk, on the website.
 *
 * Answers come from /api/chat, which is grounded in an approved knowledge base
 * and refuses to invent a price or a policy. Two things make it more than a
 * chat box:
 *
 * 1. It navigates. When the assistant answers with a site path, that renders as
 *    a real button that moves the reader to the page, so a question becomes a
 *    visit rather than a wall of text in a 380px panel.
 * 2. It knows when to stop. An [ESCALATE] reply, or a question the knowledge
 *    base does not cover, surfaces the WhatsApp hand-off instead of guessing.
 */

const COPY = {
  en: {
    open: "Ask a question",
    title: "Head & Co.",
    subtitle: "Ask about treatments, prices or your visit",
    placeholder: "Type your question",
    send: "Send",
    close: "Close",
    thinking: "Typing",
    escalate: "Message the team on WhatsApp",
    error: "Something went wrong. You can message the team directly.",
    greeting:
      "Hello. I can help with treatments, prices, hours and booking. What would you like to know?",
    starters: ["What is a head spa?", "How much is the Hyggee Spa?", "What time do you open?"],
  },
  ar: {
    open: "اسأل سؤالاً",
    title: "هيد آند كو.",
    subtitle: "اسأل عن الجلسات أو الأسعار أو زيارتك",
    placeholder: "اكتب سؤالك",
    send: "إرسال",
    close: "إغلاق",
    thinking: "يكتب",
    escalate: "راسل الفريق على واتساب",
    error: "حدث خطأ. يمكنك مراسلة الفريق مباشرة.",
    greeting: "أهلاً بك. أقدر أساعدك في الجلسات والأسعار والمواعيد والحجز. وش تحب تعرف؟",
    starters: ["وش هو الـ head spa؟", "كم سعر الهيجي سبا؟", "متى تفتحون؟"],
  },
};

/**
 * The model is told to write *bold* and to use exact URLs. This turns that into
 * markup: bold spans, and links split into internal paths (which navigate) and
 * external URLs (which open in a new tab). Anything else is escaped by React.
 */
function renderReply(text, onNavigate) {
  const parts = String(text).split(/(\*[^*\n]+\*|https?:\/\/[^\s)]+|(?:^|\s)\/(?:ritual|menu|specialists|visit|ar)\b)/g);

  return parts.filter(Boolean).map((part, i) => {
    if (/^\*[^*\n]+\*$/.test(part)) {
      return <strong key={i}>{part.slice(1, -1)}</strong>;
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer">
          {part.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]} ↗
        </a>
      );
    }
    const path = part.trim();
    if (/^\/(ritual|menu|specialists|visit|ar)$/.test(path)) {
      return (
        <button key={i} type="button" className="chat__jump" onClick={() => onNavigate(path)}>
          {path} →
        </button>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatWidget() {
  const navigate = useNavigate();
  const onArabic = useLocation().pathname.replace(/\/+$/, "") === "/ar";
  const lang = onArabic ? "ar" : "en";
  const t = COPY[lang];
  const reduced = usePrefersReducedMotion();

  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [failed, setFailed] = useState(false);

  const logRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  // Pin the transcript to the newest message, the way every messaging app does.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [history, busy, reduced]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes, and focus goes back to the button that opened it.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text) => {
      const content = text.trim();
      if (!content || busy) return;

      const next = [...history, { role: "user", content }];
      setHistory(next);
      setDraft("");
      setBusy(true);
      setFailed(false);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ history: next }),
        });
        const data = await res.json();

        if (!res.ok || !data.reply) {
          setFailed(true);
          setEscalated(true);
        } else {
          setHistory((h) => [...h, { role: "assistant", content: data.reply }]);
          if (data.escalate) setEscalated(true);
        }
      } catch {
        setFailed(true);
        setEscalated(true);
      } finally {
        setBusy(false);
      }
    },
    [busy, history],
  );

  const go = useCallback(
    (path) => {
      navigate(path);
      setOpen(false);
    },
    [navigate],
  );

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="chat__launcher"
        aria-expanded={open}
        aria-label={t.open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.9 8.9 0 0 1-3.9-.9L3 20.5l1.7-4.4a8.2 8.2 0 0 1-1.1-4.1A8.4 8.4 0 0 1 12.1 3.2 8.4 8.4 0 0 1 21 11.5z"
          />
        </svg>
        <span className="chat__launcher-label">{t.open}</span>
      </button>

      {open && (
        <div
          className="chat"
          role="dialog"
          aria-label={t.title}
          lang={lang}
          dir={onArabic ? "rtl" : "ltr"}
        >
          <div className="chat__top">
            <div>
              <p className="chat__title" dir="ltr">{site.name}</p>
              <p className="chat__sub">{t.subtitle}</p>
            </div>
            <button
              type="button"
              className="chat__close"
              aria-label={t.close}
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
            >
              ✕
            </button>
          </div>

          <div className="chat__log" ref={logRef} aria-live="polite">
            <p className="chat__msg chat__msg--bot">{t.greeting}</p>

            {history.map((m, i) => (
              <p
                key={i}
                className={m.role === "user" ? "chat__msg chat__msg--me" : "chat__msg chat__msg--bot"}
              >
                {m.role === "user" ? m.content : renderReply(m.content, go)}
              </p>
            ))}

            {busy && (
              <p className="chat__msg chat__msg--bot chat__msg--wait">
                {t.thinking}
                <span className="chat__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </p>
            )}

            {failed && <p className="chat__msg chat__msg--bot">{t.error}</p>}

            {escalated && (
              <a
                className="chat__escalate"
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.escalate} ↗
              </a>
            )}
          </div>

          {history.length === 0 && (
            <div className="chat__starters">
              {t.starters.map((s) => (
                <button key={s} type="button" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              maxLength={1200}
            />
            <button type="submit" disabled={busy || !draft.trim()}>
              {t.send}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
