import { freshaUrl } from "../data/site.js";
import Reveal from "./Reveal.jsx";
import "./ServiceRow.css";

/**
 * The system's signature pattern: a full-width priced link divided by a
 * hairline, never a card. Deep-links to its own service so the guest does not
 * re-pick on Fresha what they just chose here.
 */
export default function ServiceRow({ service, campaign, delay = 0 }) {
  const { id, name, badge, duration, price, description } = service;

  return (
    <Reveal as="li" delay={delay} className="srow__wrap">
      <a
        className="srow"
        href={freshaUrl(campaign, id)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <span className="srow__head">
            <span className="srow__name">{name}</span>
            {badge && <span className="srow__badge">{badge}</span>}
          </span>
          <span className="srow__desc">{description}</span>
        </span>
        <span className="srow__dur">{duration}</span>
        <span className={price ? "srow__price" : "srow__price srow__price--none"}>
          {price ?? "See on Fresha"} <span aria-hidden="true">↗</span>
        </span>
      </a>
    </Reveal>
  );
}
