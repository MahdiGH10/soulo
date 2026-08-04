import { Link } from "react-router-dom";
import { freshaUrl } from "../data/site.js";
import Reveal from "../components/Reveal.jsx";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "60svh", display: "grid", alignItems: "center" }}>
      <div className="shell">
        <Reveal as="p" className="eyebrow">404</Reveal>
        <Reveal as="h1" delay={80} className="h1" style={{ margin: "20px 0 0", maxWidth: "16ch" }}>
          That page has gone quiet.
        </Reveal>
        <Reveal as="p" delay={140} className="lede" style={{ marginTop: 26 }}>
          The page you were looking for is not here. The ritual, the menu and the specialists all
          are.
        </Reveal>
        <Reveal delay={200} style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 14 }}>
          <Link className="btn btn--primary" to="/">Back to the start</Link>
          <a className="btn btn--primary" href={freshaUrl("404")} target="_blank" rel="noopener noreferrer">
            Book on Fresha <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
