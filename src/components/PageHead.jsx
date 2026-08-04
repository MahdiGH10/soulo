import Reveal from "./Reveal.jsx";
import "./PageHead.css";

/** The interior-page opener: label, title, and a single paragraph of orientation. */
export default function PageHead({ eyebrow, title, lede }) {
  return (
    <section className="section section--tight pagehead">
      <div className="shell">
        <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>
        <Reveal as="h1" delay={80} className="h1 pagehead__title">{title}</Reveal>
        {lede && (
          <Reveal as="p" delay={140} className="lede pagehead__lede">{lede}</Reveal>
        )}
      </div>
    </section>
  );
}
