import { site, freshaUrl, mapsUrl, mapsEmbedUrl, isOpenNow } from "../data/site.js";
import Reveal from "../components/Reveal.jsx";
import Picture from "../components/Picture.jsx";
import PageHead from "../components/PageHead.jsx";
import Close from "../components/Close.jsx";

export default function Visit() {
  const open = isOpenNow();

  return (
    <>
      <PageHead
        eyebrow="Visit"
        title={site.address.street}
        lede={`${site.address.district}, ${site.address.city}. Open every day from two in the afternoon until eleven at night.`}
      />

      <section className="section section--tight">
        <div className="shell split">
          <div>
            <Reveal className="details" style={{ marginTop: 0 }}>
              <div>
                <p className="details__label">Address</p>
                <p className="details__body">
                  {site.name}<br />{site.address.street}<br />{site.address.district}<br />
                  {site.address.city} {site.address.postalCode}, Saudi Arabia
                </p>
                <p>
                  <a className="link" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps ↗
                  </a>
                </p>

              </div>
              <div>
                <p className="details__label">Hours</p>
                <p className="details__body">Every day<br />2:00 PM - 11:00 PM</p>
                <p className="details__open">{open ? "Open now" : "Opens at 2:00 PM"}</p>
              </div>
              <div>
                <p className="details__label">Booking</p>
                <p className="details__body">Instant confirmation<br />Pay by app<br />Packages sold separately</p>
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

      <section className="section section--tight">
        <div className="shell">
          <Reveal as="h2" className="h2">Before your first visit</Reveal>
          <Reveal as="ul" delay={80} className="included">
            <li>Your hair gets wet. Allow time for drying and styling before you leave.</li>
            <li>Come as you are. Nothing needs preparing beforehand.</li>
            <li>Arrive a few minutes early if you would like the tea before you begin.</li>
            <li>Evenings after 7 fill first. The quietest hours are just after opening.</li>
          </Reveal>
          <Reveal as="p" className="note" style={{ marginTop: 30 }}>
            For parking, guest policy and cancellation details, message before booking or review the
            Fresha confirmation.
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell">
          <Reveal as="p" className="eyebrow">The Space</Reveal>
          <Reveal as="h2" delay={80} className="h2" style={{ marginTop: 22 }}>
            Low light, warm wood, very little noise.
          </Reveal>
          <div className="gallery">
            {[
              ["space-reception", "Reception counter with ceramics and woven detail", "Reception"],
              ["space-lanterns", "Fabric lanterns glowing above a timber beam", "Soft lanterns"],
              ["space-room", "A treatment room arranged for stillness", "A treatment room"],
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

      <Close
        title="We are open every day."
        body="Same-day appointments are often available."
        href={freshaUrl("visit-close")}
      />
    </>
  );
}
