import { Link } from "react-router-dom";
import { freshaUrl } from "../data/site.js";
import { ritualStages } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import Picture from "../components/Picture.jsx";
import PageHead from "../components/PageHead.jsx";
import Close from "../components/Close.jsx";

export default function Ritual() {
  return (
    <>
      <PageHead
        eyebrow="The Ritual"
        title="The Hyggee Spa"
        lede="One hour of scalp and hair care, arranged as six stages so that nothing during the visit needs deciding by you."
      />

      <section className="section section--tight">
        <div className="shell split">
          <div>
            <Reveal as="h2" className="h2">What it is</Reveal>
            <Reveal as="p" delay={80} className="lede" style={{ marginTop: 24 }}>
              A head spa is closer to a spa treatment than a salon wash. You lie back, your hair and
              scalp are cleansed with warm water poured slowly, and the work moves through the
              scalp, neck and shoulders by hand. Most guests describe it as the first hour in a long
              time where nothing was asked of them.
            </Reveal>
            <Reveal as="p" delay={140} className="lede" style={{ marginTop: 20 }}>
              It is not a medical treatment and it is not a diagnosis. It is comfort, designed in
              advance and delivered the same way every time.
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Picture
              base="ritual-water"
              alt="A folded Head & Co. towel, embroidered with the house mark and Est. 2024"
              className="img--tall"
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell">
          <Reveal as="p" className="eyebrow">Six stages</Reveal>
          <Reveal as="h2" delay={80} className="h2" style={{ marginTop: 22, maxWidth: "16ch" }}>
            The same arc, every visit.
          </Reveal>
          <ol className="stages" style={{ marginTop: "clamp(44px, 7vh, 72px)" }}>
            {ritualStages.map((stage, i) => (
              <Reveal as="li" key={stage.n} delay={i * 60} className="stage">
                <span className="stage__n">{stage.n}</span>
                <div>
                  <h3 className="h3">{stage.name}</h3>
                  <p className="stage__body">{stage.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell split">
          <Reveal>
            <Picture
              base="ritual-hands"
              alt="Herbal compress bundles in a woven tray beside ceramic bowls"
              className="img--tall"
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </Reveal>
          <div>
            <Reveal as="h2" className="h2">Extending it</Reveal>
            <Reveal as="p" delay={80} className="lede" style={{ marginTop: 24 }}>
              The hour can be lengthened at the fourth stage. A face massage adds a facial sequence
              and takes the visit to ninety minutes. Buccal massage adds intra-oral work and is
              arranged by request. Nails can follow in the same visit.
            </Reveal>
            <Reveal as="p" delay={140} style={{ marginTop: 24 }}>
              <Link className="link" to="/menu">See durations and prices ↗</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <Reveal as="h2" className="h2">Practicalities</Reveal>
          <Reveal as="ul" delay={80} className="included">
            <li>Your hair will be wet. Allow time for it to be dried and styled before you leave.</li>
            <li>Come as you are. Nothing needs preparing beforehand.</li>
            <li>Pressure is agreed at the consultation and can be changed at any point.</li>
            <li>Arrive a few minutes early if you would like the tea before you begin.</li>
          </Reveal>
        </div>
      </section>

      <Close
        title="Reserve the Hyggee Spa."
        body="One hour, six stages, and a specialist you can request by name."
        href={freshaUrl("ritual-close", "hyggee-spa")}
      />
    </>
  );
}
