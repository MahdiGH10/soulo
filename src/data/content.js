/**
 * Site content. Every service name, duration and price below is as published on
 * the business's Fresha profile; every review is quoted verbatim with its real
 * attribution and date. Nothing here is invented — see PRODUCT.md, principle 2.
 */

export const services = [
  {
    id: "hyggee-spa",
    name: "Hyggee Spa",
    badge: "Signature",
    duration: "1 hr",
    price: "SAR 490",
    description: "The six-stage head ritual: warm-water cleanse, scalp, neck and shoulders, treatment and finish.",
    group: "head",
  },
  {
    id: "hyggee-spa-face",
    name: "Hyggee Spa + Face Massage",
    duration: "1 hr 30 min",
    price: "SAR 690",
    description: "The ritual extended into a facial sequence. The longest visit on the menu.",
    group: "head",
  },
  {
    id: "buccal",
    name: "Hyggee Spa + Buccal Massage",
    duration: "By request",
    price: null,
    description: "Intra-oral facial work added to the head ritual.",
    group: "head",
  },
  {
    id: "signature",
    name: "HEAD & CO. Signature",
    duration: "By request",
    price: null,
    description: "The house experience, arranged with your specialist.",
    group: "head",
  },
  {
    id: "mani-pedi",
    name: "Classic Manicure & Pedicure",
    duration: "1 hr 15 min",
    price: "SAR 280",
    description: "Hands and feet, unhurried. Often booked alongside the head ritual.",
    group: "nails",
  },
  {
    id: "nail-polish",
    name: "Regular Nail Polish",
    duration: "15 min",
    price: "SAR 35",
    description: "A quick finish, added to any visit.",
    group: "nails",
  },
];

export const faqs = [
  {
    q: "Is this a salon wash or a spa treatment?",
    a: "It is closer to a spa ritual: warm-water scalp cleansing, hand pressure through the head, neck and shoulders, treatment, and a quiet finish.",
  },
  {
    q: "Which service should I choose first?",
    a: "Start with the Hyggee Spa. It is the 60-minute signature treatment and the clearest way to understand the room, rhythm and technique.",
  },
  {
    q: "Can I add nails or face massage?",
    a: "Yes. The head ritual can be extended with face massage, and nail services can be booked in the same visit through Fresha.",
  },
  {
    q: "How do I ask a question before booking?",
    a: "Use WhatsApp for the quickest local reply, or book directly on Fresha for instant confirmation.",
  },
];

export const ritualStages = [
  {
    n: "01",
    name: "Arrive",
    body: "Shoes off, tea poured, the noise of King Abdulaziz Road left at the door. Nothing begins until you have sat down.",
  },
  {
    n: "02",
    name: "Consult",
    body: "A short conversation about your scalp, your hair and the pressure you prefer. A question of comfort, not diagnosis.",
  },
  {
    n: "03",
    name: "Cleanse",
    body: "Warm water, poured slowly, twice. The stage most guests remember afterwards without being able to say why.",
  },
  {
    n: "04",
    name: "Release",
    body: "Scalp, neck and shoulders worked through by hand. Add the face or buccal massage and this is where the visit lengthens.",
  },
  {
    n: "05",
    name: "Restore",
    body: "Treatment, warm towel, and a few minutes where nothing at all happens. Deliberately.",
  },
  {
    n: "06",
    name: "Finish",
    body: "Dried and styled by a specialist, or left as it is. Nails can follow in the same visit.",
  },
];

/**
 * Nine bookable specialists, plus Rana at reception. Quotes are verbatim
 * substrings of real Fresha reviews, credited to the reviewer and date.
 */
export const specialists = [
  {
    id: "milana",
    name: "Milana",
    role: "Head spa specialist",
    rating: "4.9 · 300+ reviews",
    bookable: true,
    quote: { text: "Milana is the best", credit: "Ayat A. · 12 July 2026" },
  },
  {
    id: "jeren",
    name: "Jeren",
    role: "Head & face specialist",
    rating: "4.9 · 300+ reviews",
    bookable: true,
    quote: {
      text: "she was kind, professional, and incredibly helpful throughout my visit",
      credit: "R. · 10 July 2026",
    },
  },
  {
    id: "diana",
    name: "Diana",
    role: "Head & nails master",
    rating: "4.9 · 200+ reviews",
    bookable: true,
  },
  {
    id: "elzat",
    name: "ELZAT",
    role: "Head spa specialist",
    rating: "4.9 · 200+ reviews",
    bookable: true,
    quote: {
      text: "She’s very experienced and very friendly",
      credit: "Tala S. · 10 July 2026",
    },
  },
  {
    id: "urgal",
    name: "Urgal",
    role: "Head massage specialist",
    rating: "4.9 · 100+ reviews",
    bookable: true,
    quote: {
      text: "So professional I recommend Urgal she’s the best",
      credit: "Sara M. · 13 July 2026",
    },
  },
  {
    id: "sameera",
    name: "Sameera",
    role: "Blow dry specialist",
    rating: "4.8 · 50+ reviews",
    bookable: true,
  },
  {
    id: "aygul",
    name: "Aygul",
    role: "Head spa specialist",
    rating: "4.9 · 100+ reviews",
    bookable: true,
  },
  {
    id: "nazira",
    name: "Nazira",
    role: "Nail technician",
    rating: "4.8 · 50+ reviews",
    bookable: true,
  },
  {
    id: "gulnara",
    name: "Gulnara",
    role: "Head spa specialist",
    rating: "4.7 · 50+ reviews",
    bookable: true,
  },
  {
    id: "rana",
    name: "Rana",
    role: "Reception & guest care",
    rating: "Front of house",
    bookable: false,
  },
];

export const reviews = [
  {
    id: "technique",
    text: "The massage technique totally different to what I have tried before. Plus it’s not busy, very calm and lovely tea on offer.",
    credit: "Fresha guest · 13 July 2026",
    lang: "en",
  },
  {
    id: "dana",
    text: "Words can’t describe how amazing this was 10/10",
    credit: "Dana A. · 17 July 2026",
    lang: "en",
  },
  {
    id: "athoub",
    text: "تجربة رائعة وفعلا حسيت بأن شعري تنفس والاخصائية لطيفة جدا وشاطرة",
    credit: "Athoub A. · 17 July 2026",
    lang: "ar",
  },
  {
    id: "details",
    text: "تجربة رائعة و اهتمام بادق التفاصيل و راحة العميل فوق كل شيء اعجبني جدًا",
    credit: "Fresha guest · 26 July 2026",
    lang: "ar",
  },
];
