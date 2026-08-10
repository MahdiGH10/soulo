export function retrieve(query, cards, limit = 3) {
  const q = String(query || '').toLowerCase().trim();
  if (!q) return [];

  const scored = [];
  for (const card of cards) {
    const title = card.title.toLowerCase();
    let score = 0;
    for (const kw of card.keywords) {
      const k = kw.toLowerCase();
      if (q.includes(k)) {
        score += 1;
        if (title.includes(k)) score += 1;
      }
    }
    if (score > 0) scored.push({ card, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.card);
}
