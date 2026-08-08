import { Link } from "react-router-dom";
import { site, freshaUrl } from "../data/site.js";
import "./Footer.css";

export default function Footer({ campaign = "footer" }) {
  return (
    <footer className="ftr">
      <div className="shell ftr__grid">
        <div>
          <p className="ftr__mark">{site.name}</p>
          <p className="ftr__slogan">{site.slogan}</p>
        </div>

        <nav className="ftr__nav" aria-label="Footer">
          <Link className="link" to="/ritual">The Ritual</Link>
          <Link className="link" to="/menu">Menu &amp; Prices</Link>
          <Link className="link" to="/specialists">Specialists</Link>
          <Link className="link" to="/visit">Visit</Link>
        </nav>

        <div className="ftr__col">
          <p style={{ margin: 0 }}>
            {site.address.street}
            <br />
            {site.address.district}, {site.address.city}
          </p>
          <p style={{ margin: "12px 0 0" }}>{site.hours.label}</p>
          <p style={{ margin: "2px 0 0" }}>{site.hours.saturdayLabel}</p>
          <p style={{ margin: "12px 0 0" }}>
            <a className="link" href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>

        <div className="ftr__nav">
          <a className="link" href={site.instagram} target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
          <a className="link" href={site.tiktok} target="_blank" rel="noopener noreferrer">
            TikTok ↗
          </a>
          <a className="link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp ↗
          </a>
          <a className="link" href={site.press.url} target="_blank" rel="noopener noreferrer">
            Arab News ↗
          </a>
          <a
            className="link"
            href={freshaUrl(campaign)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book on Fresha ↗
          </a>
        </div>
      </div>

      <div className="shell ftr__legal">
        <p style={{ margin: 0 }}>
          Bookings handled by Fresha. Ratings and reviews shown as published there.
        </p>
        <p style={{ margin: 0 }}>© 2026 {site.name}, {site.locality}</p>
      </div>
    </footer>
  );
}
