import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/smoothui/product-card";
import { ArrowIcon } from "../components/icons";
import { useCart } from "../context/CartContext";
import { whatsappHref } from "../data/contact";
import {
  FEATURED_OFFER,
  OFFERS,
  offerBottleSrc,
  type OfferDeal,
} from "../data/products";

function parseOfferPrice(price: string): number {
  const value = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function DealCta({ offer }: { offer: OfferDeal }) {
  const { add } = useCart();
  const [busy, setBusy] = useState(false);

  if (offer.comingSoon) {
    return (
      <button type="button" className="offers-cta is-soon" disabled>
        Coming Soon
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`offers-cta${offer.gift ? " has-gift" : ""}`}
      onClick={() => {
        add(offer.id);
        setBusy(true);
        window.setTimeout(() => setBusy(false), 1400);
        const message =
          `Hi Aura Clean,\nI want to order:\n• ${offer.title} (${offer.price})\n\nPlease share availability and delivery details.`;
        window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
      }}
    >
      {busy ? "Opening WhatsApp…" : "Buy Now"}
      <span aria-hidden="true">
        <ArrowIcon />
      </span>
    </button>
  );
}

function DealPrice({ offer }: { offer: OfferDeal }) {
  return (
    <div className="offers-price-row">
      <p className="offers-price-now">
        Special Combo Price <strong>{offer.price}</strong>
      </p>
    </div>
  );
}

function BottleStack({ offer }: { offer: OfferDeal }) {
  return (
    <div className="offers-bottles" aria-hidden="true">
      {offer.includes.map((item, index) => (
        <img
          key={`${item.id}-${item.flavor ?? item.label}-${index}`}
          src={offerBottleSrc(item)}
          alt=""
          width={120}
          height={220}
          style={{ zIndex: offer.includes.length - index }}
        />
      ))}
    </div>
  );
}

function FeaturedDeal({ offer }: { offer: OfferDeal }) {
  return (
    <motion.article
      className="offers-featured"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="offers-featured-glow" aria-hidden="true" />
      <div className="offers-featured-copy">
        <em className="offers-badge">{offer.badge}</em>
        <p className="lux-kicker">Home care pack</p>
        <h2>{offer.title}</h2>
        <p className="offers-lead">{offer.blurb}</p>
        <DealPrice offer={offer} />
        <ul className="offers-chips" aria-label="Included products">
          {offer.includes.map((item) => (
            <li key={`${item.id}-${item.label}`}>{item.label}</li>
          ))}
        </ul>
        <DealCta offer={offer} />
      </div>
      <BottleStack offer={offer} />
    </motion.article>
  );
}

function OfferProductCard({ offer }: { offer: OfferDeal }) {
  const { add } = useCart();
  const badge = offer.gift ? "🎁 FREE 250ML HANDWASH" : offer.comingSoon ? "Coming Soon" : offer.badge;
  const secondaryBadge =
    offer.gift && offer.comingSoon ? "Coming Soon" : undefined;

  return (
    <ProductCard
      badge={badge}
      className="offers-smooth-card"
      comingSoon={offer.comingSoon}
      ctaLabel="Buy Now"
      currency="₹"
      description={offer.blurb}
      hideWishlist
      includes={offer.includes.map((item) => item.label)}
      media={<BottleStack offer={offer} />}
      price={parseOfferPrice(offer.price)}
      secondaryBadge={secondaryBadge}
      title={offer.title}
      onAddToCart={() => {
        add(offer.id);
        const message =
          `Hi Aura Clean,\nI want to order:\n• ${offer.title} (${offer.price})\n\nPlease share availability and delivery details.`;
        window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
      }}
    />
  );
}

export function OffersPage() {
  return (
    <main id="main" className="lux-page offers-page">
      <header className="offers-hero">
        <p className="lux-kicker">Offers & combos</p>
        <h1>
          Deals that clean
          <br />
          more for less.
        </h1>
        <p>
          Start with the full 6-in-1 home pack, then choose from four focused combos for kitchen,
          washroom, and everyday cleaning.
        </p>
      </header>

      <FeaturedDeal offer={FEATURED_OFFER} />

      <section className="offers-grid" aria-label="More combo deals">
        <header className="offers-grid-head">
          <p className="lux-kicker">More packs</p>
          <h2>Four focused combo packs</h2>
        </header>
        <div className="offers-product-grid">
          {OFFERS.map((offer) => (
            <OfferProductCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      <section className="offers-foot">
        <div>
          <h2>Want single bottles instead?</h2>
          <p>Browse the full range and pick flavours and sizes one by one.</p>
        </div>
        <Link className="cta cta-lime" to="/product">
          Shop all products
          <span className="cta-arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </section>
    </main>
  );
}
