import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { site } from "../data/site.js";
import { usePrefersReducedMotion } from "../hooks/useMotion.js";
import "./ChatWidget.css";

/**
 * The front desk, on the website.
 *
 * Answers come from /api/chat, which is grounded in an approved knowledge base
 * and refuses to invent a price or a policy. Three things make it more than a
 * chat box:
 *
 * 1. It introduces itself. A one-time teaser tells the guest an AI assistant
 *    lives here and that it can answer anything, and the greeting says the same
 *    again in the open panel. Guests cannot ask for help they do not know exists.
 * 2. It navigates. When the assistant answers with a site path, that renders as
 *    a real button that moves the reader to the page, so a question becomes a
 *    visit rather than a wall of text in a 392px panel.
 * 3. It knows when to stop. An [ESCALATE] reply, or a question the knowledge
 *    base does not cover, surfaces the WhatsApp hand-off instead of guessing.
 */

const COPY = {
  en: {
    open: "Ask AI",
    title: "Head & Co.",
    subtitle: "AI assistant · ask me anything",
    placeholder: "Treatments, prices, hours, booking…",
    send: "Send",
    close: "Close",
    thinking: "Typing",
    online: "Online",
    escalate: "Message the team on WhatsApp",
    error: "Something went wrong. You can message the team directly.",
    greeting:
      "Hi, I'm the Head & Co. AI assistant. Ask me anything — treatments, prices, opening hours, booking, or which ritual suits you best.",
    starters: [
      "What is a head spa?",
      "How much is the Hyggee Spa?",
      "What time do you open?",
      "Which treatment suits me?",
    ],
    nudge: "I'm the Head & Co. AI assistant — ask me anything about treatments, prices and hours.",
    nudgeCta: "Ask me",
    nudgeDismiss: "Dismiss",
  },
  ar: {
    open: "اسأل المساعد",
    title: "هيد آند كو.",
    subtitle: "مساعد ذكي · اسألني عن أي شيء",
    placeholder: "الجلسات، الأسعار، المواعيد، الحجز…",
    send: "إرسال",
    close: "إغلاق",
    thinking: "يكتب",
    online: "متصل",
    escalate: "راسل الفريق على واتساب",
    error: "حدث خطأ. يمكنك مراسلة الفريق مباشرة.",
    greeting:
      "أهلاً، أنا المساعد الذكي لهيد آند كو. اسألني عن أي شيء — الجلسات، الأسعار، مواعيد الدوام، الحجز، أو وش الجلسة الأنسب لك.",
    starters: [
      "وش هو الـ head spa؟",
      "كم سعر الهيجي سبا؟",
      "متى تفتحون؟",
      "وش الجلسة الأنسب لي؟",
    ],
    nudge: "أنا مساعد هيد آند كو. الذكي — اسألني عن أي شيء: الجلسات، الأسعار، والمواعيد.",
    nudgeCta: "اسألني",
    nudgeDismiss: "إغلاق",
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

const CLOSE_MS = 220;
const NUDGE_DELAY_MS = 2600;
const NUDGE_HIDE_MS = 10000;

export default function ChatWidget() {
  const navigate = useNavigate();
  const onArabic = useLocation().pathname.replace(/\/+$/, "") === "/ar";
  const lang = onArabic ? "ar" : "en";
  const t = COPY[lang];
  const reduced = usePrefersReducedMotion();

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [history, setHistory] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [failed, setFailed] = useState(false);
  const [nudge, setNudge] = useState(false);

  const logRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const timerRef = useRef(null);
  const dismissedRef = useRef(false);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // The teaser appears once, a beat after load, then leaves on its own. A guest
  // who dismissed it in this session is not asked again on the next page.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    try {
      if (sessionStorage.getItem("hc-nudge-dismissed") === "1") return undefined;
    } catch {
      /* storage unavailable — still show */
    }
    const show = setTimeout(() => {
      if (!dismissedRef.current) setNudge(true);
    }, NUDGE_DELAY_MS);
    const hide = setTimeout(() => setNudge(false), NUDGE_HIDE_MS);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // Pin the transcript to the newest message, the way every messaging app does.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [history, busy, reduced]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const dismissNudge = useCallback(() => {
    dismissedRef.current = true;
    setNudge(false);
    try {
      sessionStorage.setItem("hc-nudge-dismissed", "1");
    } catch {
      /* non-fatal */
    }
  }, []);

  const close = useCallback(() => {
    if (closing) return;
    setNudge(false);
    setClosing(true);
    timerRef.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
      launcherRef.current?.focus();
    }, CLOSE_MS);
  }, [closing]);

  const openChat = useCallback(() => {
    setNudge(false);
    setOpen(true);
  }, []);

  // Escape closes, and focus goes back to the button that opened it. Tab is
  // kept inside the panel so a keyboard reader never lands on the page behind.
  const onPanelKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        e.currentTarget.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), [tabindex]:not([tabindex="-1"])'),
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [close],
  );

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
      close();
    },
    [navigate, close],
  );

  const botRow = (children) => (
    <div className="chat__row chat__row--bot">
      <span className="chat__avatar" aria-hidden="true">H&</span>
      {children}
    </div>
  );

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="chat__launcher"
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={t.open}
        onClick={() => (open ? close() : openChat())}
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

      {nudge && !open && (
        <div className="chat__nudge" role="status">
          <button type="button" className="chat__nudge-body" onClick={openChat}>
            <span className="chat__avatar" aria-hidden="true">H&</span>
            <span className="chat__nudge-text">
              {t.nudge} <span className="chat__nudge-cta">{t.nudgeCta} ↗</span>
            </span>
          </button>
          <button
            type="button"
            className="chat__nudge-close"
            aria-label={t.nudgeDismiss}
            onClick={dismissNudge}
          >
            ✕
          </button>
        </div>
      )}

      {(open || closing) && (
        <div
          id="chat-panel"
          className={closing ? "chat chat--closing" : "chat"}
          role="dialog"
          aria-label={t.title}
          lang={lang}
          dir={onArabic ? "rtl" : "ltr"}
          onKeyDown={onPanelKeyDown}
        >
          <div className="chat__top">
            <div>
              <p className="chat__title" dir="ltr">{site.name}</p>
              <p className="chat__sub">{t.subtitle}</p>
            </div>
            <div className="chat__top-side">
              <span className="chat__online">
                <i aria-hidden="true" />
                {t.online}
              </span>
              <button
                type="button"
                className="chat__close"
                aria-label={t.close}
                onClick={close}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="chat__log" ref={logRef} aria-live="polite">
            {botRow(<p className="chat__msg chat__msg--bot" dir="auto">{t.greeting}</p>)}

            {history.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="chat__row chat__row--me">
                  <p className="chat__msg chat__msg--me" dir="auto">{m.content}</p>
                </div>
              ) : (
                botRow(<p className="chat__msg chat__msg--bot" dir="auto">{renderReply(m.content, go)}</p>)
              ),
            )}

            {busy &&
              botRow(
                <p className="chat__msg chat__msg--bot chat__msg--wait">
                  <span className="chat__dots" aria-label={t.thinking}>
                    <i />
                    <i />
                    <i />
                  </span>
                </p>,
              )}

            {failed && botRow(<p className="chat__msg chat__msg--bot" dir="auto">{t.error}</p>)}

            {escalated &&
              botRow(
                <a
                  className="chat__escalate"
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.escalate} ↗
                </a>,
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
              autoComplete="off"
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
