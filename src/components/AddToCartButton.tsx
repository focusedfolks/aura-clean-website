import { useState } from "react";
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
      }}
      aria-label={
        (() => {
          const product = findProduct(id);
          if (!product) return "Add to cart";
          const resolvedFlavor = flavor ?? defaultFlavor(product);
          const resolvedSize = size ?? defaultSize(product);
          const amount = productPrice(product, resolvedSize);
          const label = formatVariantLabel(product, resolvedFlavor, resolvedSize);
          return amount != null
            ? `Add ${label} ${formatRupee(amount)} to cart`
            : `Add ${label} to cart`;
        })()
      }
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
