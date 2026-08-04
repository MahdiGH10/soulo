import { freshaUrl } from "../data/site.js";
import { specialists } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import PageHead from "../components/PageHead.jsx";
import Close from "../components/Close.jsx";
import "./Specialists.css";

export default function Specialists() {
  return (
    <>
      <PageHead
        eyebrow="Specialists"
        title="The hands you can ask for"
        lede="Nine specialists you can book by name, and Rana at reception. Guests name them unprompted in their reviews — if you find hands that suit you, request them again. Most do, and it makes a difference."
      />

      <section className="section section--tight">
        <div className="shell">
          <ul className="roster">
            {specialists.map((s, i) => (
              <Reveal as="li" key={s.id} delay={(i % 3) * 90} className="roster__card">
                <span className="monogram" aria-hidden="true">{s.name.charAt(0)}</span>
                <div>
                  <h2 className="team__name">{s.name}</h2>
                  <p className="team__role">{s.role}</p>
                  <p className="team__rating">{s.rating}</p>

                  {s.bookable ? (
                    <p style={{ margin: "12px 0 0", fontSize: "var(--t-meta)" }}>
                      <a
                        className="link"
                        href={freshaUrl("specialists", s.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book with {s.name} ↗
                      </a>
                    </p>
                  ) : (
                    <p className="roster__nb">Not bookable</p>
                  )}

                  {s.quote && (
                    <blockquote className="roster__quote">
                      “{s.quote.text}”
                      <footer>{s.quote.credit}</footer>
                    </blockquote>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal as="p" className="note" style={{ marginTop: 30 }}>
            [ monograms shown until the portfolio portraits from the Fresha listing are imported.
            Names, roles and ratings from Fresha, August 2026; review counts are rounded. ]
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell split">
          <div>
            <Reveal as="h2" className="h2">Ask for the same hands twice.</Reveal>
          </div>
          <div>
            <Reveal as="p" className="lede">
              Choose your specialist while booking, or leave it open and we will match you to
              whoever is free. Regular guests almost always return to the same person — pressure and
              pace are personal, and a specialist who already knows yours starts from a better
              place.
            </Reveal>
            <Reveal as="p" delay={80} className="lede" style={{ marginTop: 20 }}>
              If your specialist is fully booked, ask at reception. Evenings after 7 fill first, and
              the quietest hours are just after opening.
            </Reveal>
          </div>
        </div>
      </section>

      <Close
        title="Choose your specialist and confirm."
        body="Every bookable name above can be requested when you book."
        href={freshaUrl("specialists-close")}
      />
    </>
  );
}
