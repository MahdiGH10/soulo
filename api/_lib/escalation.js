export function parseAssistantReply(raw) {
  const text = String(raw || '').trim();
  if (/\[ESCALATE\]/i.test(text)) {
    return { reply: text.replace(/\[ESCALATE\]/gi, '').trim(), escalate: true };
  }
  return { reply: text, escalate: false };
}
