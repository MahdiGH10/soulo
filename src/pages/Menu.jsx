import { freshaUrl } from "../data/site.js";
import { services } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import ServiceRow from "../components/ServiceRow.jsx";
import PageHead from "../components/PageHead.jsx";
import Picture from "../components/Picture.jsx";
import Close from "../components/Close.jsx";
import "./Menu.css";

export default function Menu() {
  const head = services.filter((s) => s.group === "head");
  const nails = services.filter((s) => s.group === "nails");

  return (
    <>
      <PageHead
        eyebrow="Menu"
        title="What you can book"
        lede="Prices as published on Fresha, August 2026. Availability, specialist choice and payment are handled there. Instant confirmation, pay in the app."
      />

      <section className="section section--tight">
        <div className="shell">
          <Reveal className="group-head">
            <h2 className="group-head__name">Head Spa</h2>
            <span className="group-head__note">Scalp, hair and face</span>
          </Reveal>
          <ul className="srows">
            {head.map((s, i) => (
              <ServiceRow key={s.id} service={s} campaign="menu-page" delay={i * 60} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <Reveal className="group-head">
            <h2 className="group-head__name">Nails</h2>
            <span className="group-head__note">Hands and feet</span>
          </Reveal>
          <ul className="srows">
            {nails.map((s, i) => (
              <ServiceRow key={s.id} service={s} campaign="menu-page" delay={i * 60} />
            ))}
          </ul>

          {/* The only photography on this site that is genuinely Head & Co.'s own,
              taken from their Fresha portfolio. Everything else is still stock. */}
          <Reveal className="menu__work" style={{ marginTop: 40 }}>
            <Picture
              base="collection-nails"
              alt="A pink and white French set with a hand-painted star accent, by Head & Co."
              sizes="(max-width: 860px) 100vw, 42vw"
            />
            <div>
              <p className="caption">Nail work by Head &amp; Co., from their Fresha portfolio.</p>
              <p className="lede" style={{ marginTop: 18 }}>
                Forty-one services in total on Fresha, including nail extensions, gel and styling.
                Packages are sold separately for guests who plan to return.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <Reveal as="h2" className="h2">Included in every visit</Reveal>
          <Reveal as="ul" delay={80} className="included">
            <li>Tea, poured before the ritual begins.</li>
            <li>A short consultation. Pressure, scent and quiet, agreed before you lie down.</li>
            <li>A specialist you can request by name.</li>
            <li>Instant confirmation, and payment handled in the Fresha app.</li>
          </Reveal>
        </div>
      </section>

      <Close
        title="Choose a service and confirm."
        body="Every price above is the price on Fresha. Booking takes about a minute."
        href={freshaUrl("menu-close")}
      />
    </>
  );
}
