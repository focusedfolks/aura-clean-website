import { useState } from "react";
import { whatsappHref } from "../data/contact";
import {
  defaultFlavor,
  defaultSize,
  findProduct,
  formatRupee,
  formatVariantLabel,
  productPrice,
  type ProductId,
} from "../data/products";
import { useCart } from "../context/CartContext";

type Props = {
  id: ProductId;
  flavor?: string;
  size?: string;
  className?: string;
};

export function AddToCartButton({ id, flavor, size, className }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={className ?? "add-cart"}
      onClick={() => {
        add(id, { flavor, size });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
        const product = findProduct(id);
        if (!product) return;
        const resolvedFlavor = flavor ?? defaultFlavor(product);
        const resolvedSize = size ?? defaultSize(product);
        const label = formatVariantLabel(product, resolvedFlavor, resolvedSize);
        const amount = productPrice(product, resolvedSize);
        const price = amount != null ? ` (${formatRupee(amount)})` : product.price ? ` (${product.price})` : "";
        const message =
          `Hi Aura Clean,\nI want to order:\n• ${label}${price}\n\nPlease share availability and delivery details.`;
        window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
      }}
    >
      {added ? "Opening WhatsApp…" : "Add to cart"}
    </button>
  );
}
