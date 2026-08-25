import { useState } from "react";
import ProductCard from "@/components/smoothui/product-card";
import { useCart } from "../context/CartContext";
import {
  defaultFlavor,
  defaultSize,
  flavorOf,
  productPrice,
  type Product,
} from "../data/products";

type CardProps = {
  product: Product;
  mark?: string;
};

export function ProductOptionCard({ product, mark }: CardProps) {
  const { add } = useCart();
  const [flavorId, setFlavorId] = useState(defaultFlavor(product));
  const [size, setSize] = useState(defaultSize(product));
  const active = flavorOf(product, flavorId);
  const src = active?.src ?? product.src;
  const price = productPrice(product, size) ?? 0;
  const showFlavors = Boolean(product.flavors && product.flavors.length > 0);
  const showSizes = Boolean(product.sizes && product.sizes.length > 0);

  return (
    <li id={product.id} data-sku={product.id} data-flavor={flavorId ?? ""} className="catalog-card-item">
      <ProductCard
        badge={mark}
        className="catalog-smooth-card"
        ctaLabel="Add to Cart"
        currency="₹"
        description={product.blurb}
        hideWishlist
        image={src}
        imageFit="contain"
        price={price}
        title={product.name}
        options={
          <div className="catalog-card-options">
            {showFlavors ? (
              <div className="catalog-option-block">
                <p className="catalog-option-label">Fragrance</p>
                <div className="catalog-option-row" role="group" aria-label={`${product.name} fragrance`}>
                  {product.flavors!.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`catalog-option-chip${flavorId === item.id ? " is-active" : ""}`}
                      aria-pressed={flavorId === item.id}
                      onClick={() => setFlavorId(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {showSizes ? (
              <div className="catalog-option-block">
                <p className="catalog-option-label">Size</p>
                <div className="catalog-option-row" role="group" aria-label={`${product.name} size`}>
                  {product.sizes!.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`catalog-option-chip${size === item ? " is-active" : ""}`}
                      aria-pressed={size === item}
                      onClick={() => setSize(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        }
        onAddToCart={() => {
          add(product.id, { flavor: flavorId, size });
        }}
      />
    </li>
  );
}
