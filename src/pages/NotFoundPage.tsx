import { Link } from "react-router-dom";
import { ArrowIcon } from "../components/icons";

export function NotFoundPage() {
  return (
    <main id="main" className="not-found-page">
      <header className="contact-hero not-found-hero">
        <p className="lux-kicker">404</p>
        <h1>This page isn&apos;t in the range.</h1>
        <p>
          The link may be outdated or mistyped. Head back to Aura Clean to shop hand wash,
          floor cleaner, and the full home care collection.
        </p>
        <div className="not-found-actions">
          <Link className="cta cta-lime" to="/">
            Back to home
            <span className="cta-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
          <Link className="cta cta-ghost" to="/product">
            Browse products
          </Link>
        </div>
      </header>
    </main>
  );
}
