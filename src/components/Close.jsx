import Reveal from "./Reveal.jsx";
import { site } from "../data/site.js";
import "./Close.css";

/** The closing call to action every interior page ends on. */
export default function Close({ title, body, href }) {
  return (
    <section className="section section--dark close">
      <div className="shell close__body">
        <Reveal as="h2" className="h2">{title}</Reveal>
        {body && <Reveal as="p" delay={90} className="lede close__lede">{body}</Reveal>}
        <Reveal as="p" delay={120} className="close__hours">{site.hours.label}</Reveal>
        <Reveal delay={160}>
          <a className="btn btn--invert" href={href} target="_blank" rel="noopener noreferrer">
            Book on Fresha <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
