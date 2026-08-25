import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AddToCartButton } from "../components/AddToCartButton";
import { ProductOptionCard } from "../components/ProductOptionCard";
import {
  CATALOG_ORDER,
  CATEGORIES,
  PRODUCTS,
  type CategoryId,
  type ProductId,
} from "../data/products";
import {
  ArrowIcon,
  BanIcon,
  DermIcon,
  FamilyIcon,
  FlaskIcon,
  LeafIcon,
  PhIcon,
  SearchIcon,
  ShieldIcon,
  StarShieldIcon,
} from "../components/icons";

const BENEFITS = [
  "99.9% Germ Protection",
  "Tough on Stains",
  "Fresh Fragrance",
  "Gentle on Hands",
  "Disinfectant Action",
] as const;

const FEATURES = [
  { icon: ShieldIcon, label: "Germ Protection" },
  { icon: FlaskIcon, label: "Activated Charcoal" },
  { icon: LeafIcon, label: "Gentle on Hands" },
  { icon: StarShieldIcon, label: "Fresh & Clean Feel" },
] as const;

const STEPS = [
  { n: "01", title: "Apply", body: "Wet hands and dispense a small amount of Aura Clean Hand Wash." },
  { n: "02", title: "Lather", body: "Rub thoroughly between fingers, nails and wrists for 20 seconds." },
  { n: "03", title: "Rinse", body: "Rinse with clean water and dry. Repeat through the day." },
] as const;

const CERTS = [
  { icon: PhIcon, label: "pH Balanced" },
  { icon: FlaskIcon, label: "Paraben Free" },
  { icon: BanIcon, label: "Toxin Free" },
  { icon: DermIcon, label: "Dermatologically Tested" },
  { icon: FamilyIcon, label: "Safe for Your Family" },
] as const;

const START_MARK: Partial<Record<ProductId, string>> = {
  "hand-wash": "3 fragrances",
  floor: "3 fragrances",
  toilet: "2 sizes",
  bathroom: "2 sizes",
  laundry: "2 sizes",
  dish: "Lemon",
};

const CHIP_LABELS: Partial<Record<CategoryId, string>> = {
  all: "All",
  "hand-wash": "Hand Wash",
  toilet: "Toilet",
  bathroom: "Bathroom",
  laundry: "Laundry",
  floor: "Floor",
  dish: "Dish",
};

export function ProductPage() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rank = new Map(CATALOG_ORDER.map((id, index) => [id, index]));
    return PRODUCTS.filter((item) => {
      const inCat = category === "all" || item.category === category;
      if (!inCat) return false;
      if (!q) return true;
      const flavorText = item.flavors?.map((f) => f.label).join(" ") ?? "";
      const sizeText = item.sizes?.join(" ") ?? "";
      return `${item.name} ${item.blurb} ${item.spec} ${flavorText} ${sizeText}`
        .toLowerCase()
        .includes(q);
    }).sort((a, b) => (rank.get(a.id) ?? 99) - (rank.get(b.id) ?? 99));
  }, [category, query]);

  const handWash = PRODUCTS.find((item) => item.id === "hand-wash")!;
  const charcoalSrc =
    handWash.flavors?.find((item) => item.id === "charcoal")?.src ?? handWash.src;

  return (
    <main id="main" className="catalog">
      <div className="catalog-controls">
        <div className="catalog-chips" role="tablist" aria-label="Product categories">
          {CATEGORIES.map((item) => {
            const count =
              item.id === "all"
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === item.id).length;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={category === item.id}
                className={category === item.id ? "is-active" : undefined}
                onClick={() => setCategory(item.id)}
              >
                {CHIP_LABELS[item.id] ?? item.label}
                <span>{count}</span>
              </button>
            );
          })}
        </div>
        <label className="catalog-search">
          <SearchIcon />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={query}
            placeholder="Search lemon, rose, laundry…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <section id="catalog-list" className="catalog-list">
        <header className="catalog-toolbar">
          <div>
            <h2>
              {category === "all"
                ? "All products"
                : CATEGORIES.find((c) => c.id === category)?.label}
            </h2>
            <p>{list.length} in this view</p>
          </div>
          <ul className="catalog-benefit-row" aria-label="Benefits">
            {BENEFITS.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </header>

        {list.length === 0 ? (
          <p className="catalog-empty">No products match that search.</p>
        ) : (
          <ul className="product-grid catalog-product-grid">
            {list.map((item) => (
              <ProductOptionCard
                key={item.id}
                product={item}
                mark={START_MARK[item.id]}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="featured" id="featured">
        <div className="featured-stage" data-sku="hand-wash">
          <img src={charcoalSrc} alt="Hand Wash Charcoal" width={420} height={840} />
        </div>
        <div className="featured-copy">
          <p className="lux-kicker">Best seller</p>
          <h2>Hand Wash Charcoal</h2>
          <p className="stars" aria-label="5 stars">
            ★★★★★ <span>(256 Reviews)</span>
          </p>
          <p className="page-lead">
            Activated charcoal draws out daily grime while the formula stays gentle enough for
            the whole family.
          </p>
          <ul className="feature-pills">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon />
                {label}
              </li>
            ))}
          </ul>
          <ul className="check-list">
            <li>3X Faster Germs Kill</li>
            <li>pH balanced</li>
            <li>Suitable for all skin types</li>
          </ul>
          <AddToCartButton
            id="hand-wash"
            flavor="charcoal"
            size="500 ml"
            className="add-cart add-cart-solid"
          />
        </div>
      </section>

      <section className="band how-band">
        <header className="band-head lux-head">
          <p className="lux-kicker">The ritual</p>
          <h2>How to use</h2>
        </header>
        <ol className="how-row">
          {STEPS.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="final-cta catalog-cta">
        <div>
          <h2>Powerful cleaning for every part of your home</h2>
          <Link className="cta cta-lime" to="/contact">
            Enquire to order
            <span className="cta-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </section>

      <ul className="trust-bar">
        {CERTS.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon />
            {label}
          </li>
        ))}
      </ul>
    </main>
  );
}
