import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../components/icons";
import { useCart } from "../context/CartContext";
import { whatsappHref } from "../data/contact";
import {
  FEATURED_OFFER,
  OFFERS,
  offerBottleSrc,
  type OfferDeal,
} from "../data/products";

function DealCta({ offer }: { offer: OfferDeal }) {
  const { add } = useCart();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      className="offers-cta"
      onClick={() => {
        add(offer.id);
        setBusy(true);
        window.setTimeout(() => setBusy(false), 1400);
        const message =
          `Hi Aura Clean,\nI want to order:\n• ${offer.title} (${offer.price})\n\nPlease share availability and delivery details.`;
        window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
      }}
    >
      {busy ? "Opening WhatsApp…" : "Grab this deal"}
      <span aria-hidden="true">
        <ArrowIcon />
      </span>
    </button>
  );
}

function DealPrice({ offer }: { offer: OfferDeal }) {
  return (
    <div className="offers-price-row">
      {offer.was ? (
        <p className="offers-price-was">
          Regular <s>{offer.was}</s>
        </p>
      ) : null}
      <p className="offers-price-now">
        Combo <strong>{offer.price}</strong>
      </p>
      <span>{offer.saveLabel}</span>
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

function DealCard({ offer, index }: { offer: OfferDeal; index: number }) {
  return (
    <motion.article
      className={`offers-card theme-${offer.theme}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <em className="offers-badge">{offer.badge}</em>
      <BottleStack offer={offer} />
      <div className="offers-card-copy">
        <h3>{offer.title}</h3>
        <p>{offer.blurb}</p>
        <DealPrice offer={offer} />
        <ul className="offers-chips" aria-label="Included products">
          {offer.includes.map((item, i) => (
            <li key={`${item.id}-${item.label}-${i}`}>{item.label}</li>
          ))}
        </ul>
        <DealCta offer={offer} />
      </div>
    </motion.article>
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
          Start with the full 6-in-1 home pack, then pick smaller combos for the kitchen, bath, and
          everyday clean.
        </p>
      </header>

      <FeaturedDeal offer={FEATURED_OFFER} />

      <section className="offers-grid" aria-label="More combo deals">
        <header className="offers-grid-head">
          <p className="lux-kicker">More packs</p>
          <h2>Six household combo offers</h2>
        </header>
        <div className="offers-grid-list">
          {OFFERS.map((offer, index) => (
            <DealCard key={offer.id} offer={offer} index={index} />
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
