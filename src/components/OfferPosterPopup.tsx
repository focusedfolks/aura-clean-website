import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FEATURED_OFFER } from "../data/products";

export const OFFER_POSTER_SRC = "/rabi-ul-awwal-offer.jpg";

export function OfferPosterDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { add } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const grabCombo = () => {
    add(FEATURED_OFFER.id);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="offer-poster" role="dialog" aria-modal="true" aria-labelledby="offer-poster-title">
      <div className="offer-poster-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="offer-poster-card">
        <button type="button" className="offer-poster-close" onClick={onClose} aria-label="Close offer poster">
          ×
        </button>
        <h2 id="offer-poster-title" className="sr-only">
          Rabi Ul Awwal Offer, 6-in-1 combo pack, ₹349
        </h2>
        <img
          src={OFFER_POSTER_SRC}
          alt="Aura Clean Rabi Ul Awwal Offer. 6-in-1 combo pack, all this only for ₹349."
          width={720}
          height={1024}
        />
        <div className="offer-poster-actions">
          <button type="button" className="offer-poster-cta" onClick={grabCombo}>
            Add combo to cart
          </button>
          <button type="button" className="offer-poster-later" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/** Home page only — shows the offer poster every time you land on home. */
export function OfferPosterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    window.dispatchEvent(new Event("aura-offer-popup-ready"));
  };

  return <OfferPosterDialog open={open} onClose={close} />;
}
