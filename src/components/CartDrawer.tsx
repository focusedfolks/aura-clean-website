import { useEffect } from "react";
import { Link } from "react-router-dom";
import { whatsappHref } from "../data/contact";
import {
  findProduct,
  flavorOf,
  formatRupee,
  formatVariantLabel,
  productPrice,
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

  const items = lines
    .map((line) => {
      const product = findProduct(line.id);
      return product ? { ...line, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const orderLines = items
    .map(({ qty, product, flavor, size }) => {
      const label = formatVariantLabel(product, flavor, size);
      const amount = productPrice(product, size);
      const price = amount != null ? ` - ${formatRupee(amount)}` : product.price ? ` - ${product.price}` : "";
      return `• ${label} x${qty}${price}`;
    })
    .join("\n");

  const whatsappOrder = whatsappHref(
    items.length === 0
      ? "Hi Aura Clean, I want to place an order."
      : `Hi Aura Clean,\nI want to order:\n${orderLines}\n\nPlease share availability and delivery details.`,
  );

  return (
    <div className={`cart-layer${open ? " is-open" : ""}`} hidden={!open}>
      <button
        type="button"
        className="cart-backdrop"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
      />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <header>
          <h2>Your cart</h2>
          <button type="button" className="cart-close" onClick={() => setOpen(false)}>
            <CloseIcon />
            <span className="sr-only">Close cart</span>
          </button>
        </header>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add a bottle from the range.</p>
        ) : (
          <ul className="cart-lines">
            {items.map(({ key, qty, product, flavor, size }) => {
              const image = flavorOf(product, flavor)?.src ?? product.src;
              const amount = productPrice(product, size);
              return (
                <li key={key}>
                  <img src={image} alt="" width={72} height={120} />
                  <div>
                    <strong>{formatVariantLabel(product, flavor, size)}</strong>
                    <span>
                      {amount != null
                        ? `${formatRupee(amount)} · ${size}`
                        : product.price
                          ? `${product.price} · ${size}`
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
                  <button type="button" className="cart-remove" onClick={() => remove(key)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <footer>
          {items.length > 0 ? (
            <button type="button" className="cart-clear" onClick={clear}>
              Clear cart
            </button>
          ) : null}
          <a
            className="cta cta-whatsapp"
            href={whatsappOrder}
            target="_blank"
            rel="noopener noreferrer"
          >
            Order on WhatsApp
          </a>
          <Link className="cart-clear" to="/contact" onClick={() => setOpen(false)}>
            Or write to us
          </Link>
        </footer>
      </aside>
    </div>
  );
}
