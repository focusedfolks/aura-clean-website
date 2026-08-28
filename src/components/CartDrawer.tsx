import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { whatsappHref } from "../data/contact";
import {
  findProduct,
  flavorOf,
  formatRupee,
  formatVariantLabel,
  lineUnitPrice,
} from "../data/products";
import { useCart } from "../context/CartContext";
import { CloseIcon } from "./icons";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, clear } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = findProduct(line.id);
          if (!product) return null;
          const unit = lineUnitPrice(product, line.size);
          return { ...line, product, unit, lineTotal: unit * line.qty };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [lines],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.lineTotal, 0),
    [items],
  );

  const orderLines = items
    .map(({ qty, product, flavor, size, unit }) => {
      const label = formatVariantLabel(product, flavor, size);
      const price = unit > 0 ? ` - ${formatRupee(unit)}` : "";
      return `• ${label} x${qty}${price}`;
    })
    .join("\n");

  const whatsappOrder = whatsappHref(
    items.length === 0
      ? "Hi Aura Clean, I want to place an order."
      : `Hi Aura Clean,\nI want to order:\n${orderLines}\n\nSubtotal: ${formatRupee(subtotal)}\n\nPlease share availability and delivery details.`,
  );

  if (!open) return null;

  return (
    <div className="cart-layer is-open" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button
        type="button"
        className="cart-backdrop"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
      />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <header>
          <h2 id="cart-title">Your cart</h2>
          <button type="button" className="cart-close" onClick={() => setOpen(false)}>
            <CloseIcon />
            <span className="sr-only">Close cart</span>
          </button>
        </header>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add a bottle from the range.</p>
        ) : (
          <ul className="cart-lines">
            {items.map(({ key, qty, product, flavor, size, unit, lineTotal }) => {
              const image = flavorOf(product, flavor)?.src ?? product.src;
              return (
                <li key={key}>
                  <img
                    src={image}
                    alt={formatVariantLabel(product, flavor, size)}
                    width={72}
                    height={120}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <strong>{formatVariantLabel(product, flavor, size)}</strong>
                    <span>
                      {unit > 0
                        ? `${formatRupee(unit)} · ${size}`
                        : size}
                    </span>
                    <div className="cart-qty">
                      <button type="button" onClick={() => setQty(key, qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <em>{qty}</em>
                      <button type="button" onClick={() => setQty(key, qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-line-side">
                    <p className="cart-line-total">{formatRupee(lineTotal)}</p>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => remove(key)}
                      aria-label={`Remove ${formatVariantLabel(product, flavor, size)} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <footer>
          {items.length > 0 ? (
            <>
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>{formatRupee(subtotal)}</strong>
              </div>
              <button type="button" className="cart-clear" onClick={clear}>
                Clear cart
              </button>
              <a
                className="cta cta-whatsapp"
                href={whatsappOrder}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on WhatsApp
              </a>
            </>
          ) : (
            <Link className="cta cta-lime" to="/product" onClick={() => setOpen(false)}>
              Browse products
            </Link>
          )}
          <Link className="cart-clear" to="/contact" onClick={() => setOpen(false)}>
            Or write to us
          </Link>
        </footer>
      </aside>
    </div>
  );
}
