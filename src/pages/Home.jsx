import { Link } from "react-router-dom";
import { site, freshaUrl, mapsUrl, mapsEmbedUrl, isOpenNow } from "../data/site.js";
import { services, ritualStages, specialists, reviews, faqs } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import Picture from "../components/Picture.jsx";
import ServiceRow from "../components/ServiceRow.jsx";
import "./Home.css";

export default function Home() {
  const open = isOpenNow();
  const featured = specialists.filter((s) => s.bookable).slice(0, 5);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero__media">
          <Picture base="hero" alt="Warm lantern light on a wooden lattice doorway" eager sizes="100vw" />
        </div>
        <div className="hero__scrim" aria-hidden="true" />

        <div className="shell hero__body">
          <Reveal as="p" className="eyebrow hero__eyebrow">{site.slogan}</Reveal>
          <Reveal as="h1" delay={90} className="hero__title">
            An hour that asks nothing of you.
          </Reveal>
          <Reveal as="p" delay={180} className="hero__lede">
            Scalp and hair care shaped around hygge, on {site.address.street}. Warm water,
            unhurried hands, low light, and a room built for stillness.
          </Reveal>

          <Reveal delay={260} className="hero__actions">
            <a className="btn btn--invert" href={freshaUrl("hero")} target="_blank" rel="noopener noreferrer">
              Reserve the Hyggee Spa <span aria-hidden="true">↗</span>
            </a>
            <Link className="btn btn--ghost" to="/ritual">See the ritual</Link>
          </Reveal>

          <Reveal delay={320} className="hero__premium">
            <div>
              <span className="hero__meta-label">Signature ritual</span>
              <span className="hero__meta-value">Hyggee Spa - SAR 490 - 60 min</span>
            </div>
            <div>
              <span className="hero__stars" aria-label={`${site.rating.value} stars`}>★★★★★</span>
              <span className="hero__meta-value">
                {site.rating.value} from {site.rating.count.toLocaleString("en-US")} Fresha reviews
              </span>
            </div>
          </Reveal>

          {/* The rating already sits in hero__premium above. This strip carries
              only what that one does not: when they are open, where, and how
              booking resolves. */}
          <Reveal delay={390} className="hero__proof">
            <span>{site.hours.label}</span>
            {open ? <span className="hero__open">Open now</span> : null}
            <span>{site.address.district}, {site.address.city}</span>
            <span>Instant confirmation</span>
          </Reveal>
        </div>
      </section>

      <section className="press" aria-label="Press and social proof">
        <div className="shell press__inner">
          <Reveal as="p" className="press__item">
            Featured in{" "}
            <a href={site.press.url} target="_blank" rel="noopener noreferrer">
              {site.press.name} <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
          <Reveal as="p" delay={80} className="press__item">Open every day until 11 PM</Reveal>
          <Reveal as="p" delay={140} className="press__item">Instant Fresha booking</Reveal>
        </div>
      </section>

      {/* ---------- Philosophy ---------- */}
      <section className="section">
        <div className="shell split">
          <div>
            <Reveal as="p" className="eyebrow">Hygge, in Jeddah</Reveal>
            <Reveal as="h2" delay={80} className="h2">Comfort, treated as a craft.</Reveal>
            <Reveal as="p" delay={150} className="lede" style={{ marginTop: 30 }}>
              Head &amp; Co. was built around a single idea borrowed from the Danish word hygge:
              that ease is something you can design. Temperature, light, pressure, pace: each one
              decided in advance so that nothing during your visit needs deciding by you.
            </Reveal>
            <Reveal as="p" delay={200} className="lede" style={{ marginTop: 20 }}>
              The result is a scalp and hair experience closer to a spa treatment than a salon wash,
              followed (if you like) by nails, styling and a slow return to the street outside.
            </Reveal>

            <Reveal as="dl" delay={260} className="facts">
              <div><dt>Signature</dt><dd>Hyggee Spa</dd></div>
              <div><dt>From</dt><dd>SAR 490</dd></div>
              <div><dt>Duration</dt><dd>60 - 90 min</dd></div>
              <div><dt>Guests cared for</dt><dd>{site.rating.count.toLocaleString("en-US")} reviews</dd></div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Picture
              base="philosophy"
              alt="Warm tea in a ceramic cup on a wooden tray beside dried botanicals"
              className="img--tall"
              sizes="(max-width: 860px) 100vw, 45vw"
            />
            <p className="caption">Tea, poured before the ritual begins.</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- The ritual ---------- */}
      <section id="ritual" className="section section--dark">
        <div className="shell split split--sticky">
          <div className="ritual__intro">
            <Reveal as="h2" className="h2">Six stages, one hour, no decisions.</Reveal>
            <Reveal as="p" delay={140} className="lede" style={{ marginTop: 26 }}>
              Every visit follows the same arc. Knowing it in advance is part of the rest.
            </Reveal>
            <Reveal as="p" delay={260} style={{ marginTop: 30 }}>
              <Link className="link link--accent" to="/ritual">Read the ritual in full ↗</Link>
            </Reveal>
          </div>

          <ol className="stages">
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

      {/* ---------- Full bleed ---------- */}
      <section className="bleed" aria-hidden="true">
        <Picture base="ritual-water" alt="" sizes="100vw" />
      </section>

      {/* ---------- Menu ---------- */}
      <section id="menu" className="section">
        <div className="shell">
          <div className="row-head">
            <div>
              <Reveal as="h2" className="h2">What you can book.</Reveal>
            </div>
            <Reveal as="p" delay={140} className="row-head__aside">
              Availability, specialist choice and payment are handled on Fresha. Instant
              confirmation, pay in the app.
            </Reveal>
          </div>

          <ul className="srows">
            {services.map((s, i) => (
              <ServiceRow key={s.id} service={s} campaign="menu" delay={i * 60} />
            ))}
          </ul>

          <Reveal as="p" style={{ marginTop: 34 }} className="lede">
            41 services in total, including nail extensions, gel and styling, plus packages if you
            plan to return. <Link to="/menu">See the full menu ↗</Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell revenue">
          <div>
            <Reveal as="h2" className="h2">Gift an hour they do not have to plan.</Reveal>
          </div>
          <Reveal as="p" delay={140} className="lede revenue__copy">
            Fresha supports packages and repeat visits. For birthdays, recovery weeks or a quiet
            evening after work, choose the Hyggee Spa first and let the recipient pick a specialist.
          </Reveal>
          <Reveal delay={210}>
            <a className="btn btn--primary" href={freshaUrl("gift-packages", "packages")} target="_blank" rel="noopener noreferrer">
              View packages <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------- The space ---------- */}
      <section id="space" className="section section--tint">
        <div className="shell">
          <Reveal as="h2" className="h2">Low light, warm wood, and very little noise.</Reveal>

          <div className="gallery">
            {[
              ["space-lanterns", "Fabric lanterns glowing above a timber beam", "Soft lanterns, warm beams"],
              ["space-reception", "Reception counter with ceramics and woven detail", "Ceramics at reception"],
              ["space-room", "A treatment room arranged for stillness", "A room built for stillness"],
            ].map(([base, alt, caption], i) => (
              <Reveal as="figure" key={base} delay={i * 120} className="gallery__fig">
                <Picture base={base} alt={alt} className="img--gallery" sizes="(max-width: 720px) 100vw, 33vw" />
                <figcaption className="caption">{caption}</figcaption>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="note" style={{ marginTop: 30 }}>
            Venue photography from Head &amp; Co.'s public listing.
          </Reveal>
        </div>
      </section>

      {/* ---------- Specialists ---------- */}
      <section id="team" className="section">
        <div className="shell">
          <div className="row-head">
            <div>
              <Reveal as="h2" className="h2">The hands you can ask for.</Reveal>
            </div>
            <Reveal as="p" delay={140} className="row-head__aside">
              Every specialist can be requested by name when you book. Ratings are guest averages on
              Fresha.
            </Reveal>
          </div>

          <ul className="team">
            {featured.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 90} className="team__card">
                <span className="monogram" aria-hidden="true">{s.name.charAt(0)}</span>
                <div>
                  <h3 className="team__name">{s.name}</h3>
                  <p className="team__role">{s.role}</p>
                  <p className="team__rating">{s.rating}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal as="p" style={{ marginTop: 22 }}>
            <Link className="link" to="/specialists">All nine specialists, and who to ask for ↗</Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section className="section section--dark">
        <div className="shell">
          <Reveal className="rating">
            <span className="rating__figure">{site.rating.value}</span>
            <span>from {site.rating.count.toLocaleString("en-US")} verified reviews on Fresha</span>
          </Reveal>

          <ul className="quotes">
            {reviews.map((r, i) => (
              <Reveal as="li" key={r.id} delay={i * 120} className="quote">
                <blockquote
                  className={r.lang === "ar" ? "quote__text quote__text--ar" : "quote__text"}
                  {...(r.lang === "ar" ? { dir: "rtl", lang: "ar" } : {})}
                >
                  {r.lang === "ar" ? `«${r.text}»` : `“${r.text}”`}
                </blockquote>
                <p className="quote__credit">{r.credit}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell faq">
          <div>
            <Reveal as="h2" className="h2">Questions guests ask before they book.</Reveal>
          </div>
          <div className="faq__list">
            {faqs.map((item, i) => (
              <Reveal as="details" key={item.q} delay={i * 70} className="faq__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Visit ---------- */}
      <section id="visit" className="section">
        <div className="shell split">
          <div>
            <Reveal as="p" className="eyebrow">Visit</Reveal>
            <Reveal as="h2" delay={80} className="h2">{site.address.street}, {site.address.city}.</Reveal>

            <Reveal delay={140} className="details">
              <div>
                <p className="details__label">Address</p>
                <p className="details__body">
                  {site.name}<br />{site.address.street}<br />
                  {site.address.district}, {site.address.city} {site.address.postalCode}
                </p>
                <p><a className="link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Get directions ↗</a></p>
              </div>
              <div>
                <p className="details__label">Hours</p>
                <p className="details__body">Every day<br />2:00 PM - 11:00 PM</p>
                <p className="details__open">{open ? "Open now" : "Opens at 2:00 PM"}</p>
                <p><Link className="link" to="/visit">Before your first visit ↗</Link></p>
              </div>
              <div>
                <p className="details__label">Booking</p>
                <p className="details__body">Instant confirmation<br />Pay by app</p>
                <p>
                  <a className="link" href={site.instagram} target="_blank" rel="noopener noreferrer">
                    {site.instagramHandle} ↗
                  </a>
                </p>
                <p>
                  <a className="link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp {site.phone} ↗
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="map">
            <iframe
              title={`Map of ${site.name} on ${site.address.street}, ${site.address.city}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="cta">
        <div className="cta__media" aria-hidden="true">
          <Picture base="ritual-hands" alt="" sizes="100vw" />
        </div>
        <div className="cta__scrim" aria-hidden="true" />
        <div className="shell cta__body">
          <Reveal as="h2" className="h2">Come and be looked after.</Reveal>
          <Reveal as="p" delay={90} className="lede" style={{ maxWidth: "32rem" }}>
            Same-day appointments are often available. Choose your specialist, confirm instantly.
          </Reveal>
          <Reveal delay={160}>
            <a className="btn btn--invert" href={freshaUrl("final-cta")} target="_blank" rel="noopener noreferrer">
              Book on Fresha <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
