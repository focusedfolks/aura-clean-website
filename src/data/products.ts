export type ProductId =
  | "hand-wash"
  | "toilet"
  | "bathroom"
  | "laundry"
  | "floor"
  | "dish"
  | "combo"
  | "combo-essential"
  | "combo-kitchen-bath"
  | "combo-mega"
  | "combo-hygiene"
  | "combo-saver"
  | "combo-ultimate"
  | "combo-power"
  | "combo-kitchen"
  | "combo-shine"
  | "combo-trio"
  | "combo-fresh-surface"
  | "combo-daily-essentials"
  | "combo-kitchen-refresh"
  | "combo-washroom-starter"
  /** Legacy cart / deep-link ids */
  | "charcoal"
  | "lemon"
  | "rose"
  | "floor-lemon"
  | "floor-rose";

export type OfferTheme = "featured" | "citrus" | "blush" | "ink";

export type OfferInclude = {
  id: "hand-wash" | "toilet" | "bathroom" | "laundry" | "floor" | "dish";
  label: string;
  flavor?: string;
};

export type OfferDeal = {
  id: Extract<
    ProductId,
    | "combo"
    | "combo-essential"
    | "combo-kitchen-bath"
    | "combo-mega"
    | "combo-hygiene"
    | "combo-saver"
    | "combo-ultimate"
    | "combo-power"
    | "combo-kitchen"
    | "combo-shine"
    | "combo-trio"
    | "combo-fresh-surface"
    | "combo-daily-essentials"
    | "combo-kitchen-refresh"
    | "combo-washroom-starter"
  >;
  badge: string;
  title: string;
  blurb: string;
  price: string;
  was?: string;
  saveLabel?: string;
  gift?: string;
  comingSoon?: boolean;
  theme: OfferTheme;
  includes: OfferInclude[];
};

export type CategoryId =
  | "all"
  | "hand-wash"
  | "toilet"
  | "bathroom"
  | "laundry"
  | "floor"
  | "dish";

export type ProductFlavor = {
  id: string;
  label: string;
  src: string;
  tone?: string;
};

export type Product = {
  id: ProductId;
  name: string;
  category: Exclude<CategoryId, "all">;
  src: string;
  tone: string;
  blurb: string;
  spec: string;
  /** Default / summary volume shown before a size is picked. */
  volume: string;
  price?: string;
  /** Retail price in ₹ keyed by size label (e.g. "500 ml"). */
  prices?: Record<string, number>;
  flavors?: ProductFlavor[];
  sizes?: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "floor",
    name: "Premium Floor Cleaner",
    category: "floor",
    src: "/product-floor-lemon.webp?v=5",
    tone: "#7A5C00",
    blurb: "Plant-extract powered shine, pick Lemon, Rose, or Lavender.",
    spec: "10X Litter & Bacteria Stronger Clean",
    volume: "500 ml - 1 Ltr",
    price: "₹59",
    prices: {
      "500 ml": 59,
      "1 Ltr": 95,
    },
    flavors: [
      {
        id: "lemon",
        label: "Lemon",
        src: "/product-floor-lemon.webp?v=5",
        tone: "#7A5C00",
      },
      {
        id: "rose",
        label: "Rose",
        src: "/product-floor-rose.webp?v=8",
        tone: "#6B1D3D",
      },
      {
        id: "lavender",
        label: "Lavender",
        src: "/product-floor-lavender.webp?v=1",
        tone: "#3B1E54",
      },
    ],
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "dish",
    name: "Dish Wash Liquid",
    category: "dish",
    src: "/product-dish.webp?v=3",
    tone: "#6E5600",
    blurb: "Tough on grease. Gentle on hands. Fresh lemon fragrance.",
    spec: "Powerful Grease Removal",
    volume: "1 Ltr",
    price: "₹95",
    prices: {
      "1 Ltr": 95,
    },
    flavors: [
      {
        id: "lemon",
        label: "Lemon",
        src: "/product-dish.webp?v=3",
        tone: "#6E5600",
      },
    ],
    sizes: ["1 Ltr"],
  },
  {
    id: "hand-wash",
    name: "Hand Wash",
    category: "hand-wash",
    src: "/product-handwash-rose.webp",
    tone: "#6B1D3D",
    blurb: "Deep cleanse and lasting protection, pick your favourite fragrance.",
    spec: "99.9% Cleaning Protection",
    volume: "250 ml - 5 Ltr",
    price: "₹59",
    prices: {
      "250 ml": 59,
      "500 ml": 69,
      "5 Ltr": 389,
    },
    flavors: [
      {
        id: "rose",
        label: "Rose",
        src: "/product-handwash-rose.webp",
        tone: "#6B1D3D",
      },
      {
        id: "charcoal",
        label: "Charcoal",
        src: "/product-handwash-charcoal.webp?v=11",
        tone: "#1E1E1E",
      },
      {
        id: "lemon",
        label: "Lemon",
        src: "/product-handwash-lemon.webp",
        tone: "#6E5600",
      },
    ],
    sizes: ["250 ml", "500 ml", "5 Ltr"],
  },
  {
    id: "toilet",
    name: "Powerful Toilet Cleaner",
    category: "toilet",
    src: "/product-toilet.webp?v=3",
    tone: "#0E2A47",
    blurb: "10x Power. Removes tough stains. Fresh fragrance. Deep cleaning.",
    spec: "Kills 99.9% Germs",
    volume: "500 ml - 1 Ltr",
    price: "₹59",
    prices: {
      "500 ml": 59,
      "1 Ltr": 99,
    },
    flavors: [
      {
        id: "unscented",
        label: "Unscented",
        src: "/product-toilet.webp?v=3",
        tone: "#0E2A47",
      },
    ],
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "bathroom",
    name: "Disinfectant Bathroom Cleaner",
    category: "bathroom",
    src: "/product-bathroom.webp?v=3",
    tone: "#5B0E14",
    blurb: "10X better cleaning for sinks, tiles and fittings.",
    spec: "Kills 99.9% Germs",
    volume: "500 ml - 1 Ltr",
    price: "₹59",
    prices: {
      "500 ml": 59,
      "1 Ltr": 99,
    },
    flavors: [
      {
        id: "unscented",
        label: "Unscented",
        src: "/product-bathroom.webp?v=3",
        tone: "#5B0E14",
      },
    ],
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "laundry",
    name: "Laundry Detergent Liquid",
    category: "laundry",
    src: "/product-laundry.webp?v=7",
    tone: "#1A3B66",
    blurb: "Deep clean. Fresh fragrance. Gentle on fabric.",
    spec: "1 Ltr · 5 Ltr",
    volume: "1 Ltr - 5 Ltr",
    price: "₹99",
    prices: {
      "1 Ltr": 99,
      "5 Ltr": 399,
    },
    flavors: [
      {
        id: "unscented",
        label: "Unscented",
        src: "/product-laundry.webp?v=7",
        tone: "#1A3B66",
      },
    ],
    sizes: ["1 Ltr", "5 Ltr"],
  },
];

/** Featured 6-in-1 banner, shown at the top of the Offers page. */
export const FEATURED_OFFER: OfferDeal = {
  id: "combo",
  badge: "🔥 YOU SAVE ₹55!",
  title: "6-in-1 Ultimate Cleaning Bundle",
  blurb:
    "Six essentials, one family pack. Laundry, dishes, floors, bath, toilet and hand wash, everything your home needs in a single smart bundle.",
  price: "₹349",
  was: "₹404",
  saveLabel: "🔥 YOU SAVE ₹55!",
  theme: "featured",
  includes: [
    { id: "laundry", label: "1 Ltr Laundry Detergent" },
    { id: "dish", label: "1 Ltr Dishwash" },
    { id: "floor", label: "500 ml Floor Cleaner", flavor: "lavender" },
    { id: "bathroom", label: "500 ml Bathroom Cleaner" },
    { id: "toilet", label: "500 ml Toilet Cleaner" },
    { id: "hand-wash", label: "500 ml Handwash", flavor: "charcoal" },
  ],
};

/** Combo / offer packs, cart only, not listed as regular catalog SKUs. */
export const OFFERS: OfferDeal[] = [
  {
    id: "combo-kitchen-refresh",
    badge: "Kitchen pick",
    title: "Kitchen & Floor Maintenance Combo",
    blurb:
      "Grease-free dishes, fresh hands, shining floors. The everyday kitchen-to-hallway reset, all in one pack.",
    price: "₹180",
    comingSoon: true,
    theme: "citrus",
    includes: [
      { id: "dish", label: "1 Ltr Dishwash" },
      { id: "hand-wash", label: "500 ml Handwash", flavor: "lemon" },
      { id: "floor", label: "500 ml Floor Cleaner", flavor: "lemon" },
    ],
  },
  {
    id: "combo-washroom-starter",
    badge: "Everyday value",
    title: "Essential Washroom & Laundry Combo",
    blurb:
      "Fresh laundry, a clean toilet, and a sparkling bath. The washroom staples every home needs, priced to move.",
    price: "₹200",
    comingSoon: true,
    theme: "ink",
    includes: [
      { id: "laundry", label: "1 Ltr Liquid Detergent" },
      { id: "toilet", label: "500 ml Toilet Cleaner" },
      { id: "bathroom", label: "500 ml Bathroom Cleaner" },
    ],
  },
  {
    id: "combo-daily-essentials",
    badge: "🎁 FREE 250ML HANDWASH",
    title: "Daily Cleaning & Wash Trio Pack",
    blurb:
      "Laundry, toilet and dishes in full 1L bottles. Three chores you never skip, plus a free handwash gift.",
    price: "₹240",
    gift: "FREE 250ml Handwash",
    comingSoon: true,
    theme: "blush",
    includes: [
      { id: "laundry", label: "1 Ltr Liquid Detergent" },
      { id: "toilet", label: "1 Ltr Toilet Cleaner" },
      { id: "dish", label: "1 Ltr Dishwash" },
    ],
  },
  {
    id: "combo-fresh-surface",
    badge: "🎁 FREE 250ML HANDWASH",
    title: "Complete Home Surface Care Pack",
    blurb:
      "Toilet, bathroom and floors in three full litres. Surface-deep clean for every room, with a free handwash bonus.",
    price: "₹270",
    gift: "FREE 250ml Handwash",
    comingSoon: true,
    theme: "citrus",
    includes: [
      { id: "toilet", label: "1 Ltr Toilet Cleaner" },
      { id: "bathroom", label: "1 Ltr Bathroom Cleaner" },
      { id: "floor", label: "1 Ltr Floor Cleaner", flavor: "lavender" },
    ],
  },
];

export const ALL_OFFERS: OfferDeal[] = [FEATURED_OFFER, ...OFFERS];

function offerToProduct(offer: OfferDeal): Product {
  const amount = Number(offer.price.replace(/[^\d.]/g, ""));
  return {
    id: offer.id,
    name: offer.title,
    category: "hand-wash",
    src:
      PRODUCTS.find((p) => p.id === offer.includes[0]?.id)?.src ??
      "/product-handwash-charcoal.webp?v=11",
    tone: "#1c1408",
    blurb: offer.blurb,
    spec: offer.includes.map((item) => item.label).join(" · "),
    volume: "Combo pack",
    price: offer.price,
    prices: Number.isFinite(amount)
      ? {
          "Combo pack": amount,
        }
      : undefined,
    sizes: ["Combo pack"],
  };
}

export const COMBO_PRODUCTS: Product[] = ALL_OFFERS.map(offerToProduct);

/** @deprecated Prefer FEATURED_OFFER, kept for older imports. */
export const COMBO_PRODUCT = offerToProduct(FEATURED_OFFER);

/** @deprecated Prefer FEATURED_OFFER.includes */
export const COMBO_INCLUDES = FEATURED_OFFER.includes;

export function resolveProductId(id: ProductId): ProductId {
  if (id === "charcoal" || id === "lemon" || id === "rose") return "hand-wash";
  if (id === "floor-lemon" || id === "floor-rose") return "floor";
  return id;
}

export function findProduct(id: ProductId): Product | undefined {
  const resolved = resolveProductId(id);
  const combo = COMBO_PRODUCTS.find((item) => item.id === resolved);
  if (combo) return combo;
  return PRODUCTS.find((item) => item.id === resolved);
}

export function offerBottleSrc(include: OfferInclude): string {
  const product = PRODUCTS.find((item) => item.id === include.id);
  if (!product) return "/product-handwash-charcoal.webp?v=11";
  if (include.flavor) {
    return product.flavors?.find((f) => f.id === include.flavor)?.src ?? product.src;
  }
  return product.src;
}

export function defaultFlavor(product: Product): string | undefined {
  return product.flavors?.[0]?.id;
}

export function defaultSize(product: Product): string {
  return product.sizes?.[0] ?? product.volume;
}

export function flavorOf(product: Product, flavorId?: string): ProductFlavor | undefined {
  if (!product.flavors?.length) return undefined;
  return product.flavors.find((item) => item.id === flavorId) ?? product.flavors[0];
}

export function productPrice(product: Product, size?: string): number | undefined {
  const key = size ?? defaultSize(product);
  if (product.prices?.[key] != null) return product.prices[key];
  if (product.price) {
    const amount = Number(product.price.replace(/[^\d.]/g, ""));
    return Number.isFinite(amount) ? amount : undefined;
  }
  return undefined;
}

export function formatRupee(amount: number): string {
  return `₹${amount}`;
}

export function lineUnitPrice(product: Product, size?: string): number {
  return productPrice(product, size) ?? 0;
}

export function formatVariantLabel(
  product: Product,
  flavorId?: string,
  size?: string,
): string {
  const flavor = flavorOf(product, flavorId)?.label;
  const parts = [product.name, flavor, size].filter(Boolean);
  return parts.join(" · ");
}

export function cartLineKey(id: ProductId, flavor: string | undefined, size: string): string {
  return `${resolveProductId(id)}__${flavor ?? "-"}__${size}`;
}

export const HAND_WASH = PRODUCTS.filter((item) => item.category === "hand-wash");
export const RANGE_PRODUCTS = PRODUCTS.filter((item) => item.category !== "hand-wash");

export const CATALOG_ORDER: ProductId[] = [
  "floor",
  "dish",
  "hand-wash",
  "toilet",
  "bathroom",
  "laundry",
];

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "hand-wash", label: "Hand Wash" },
  { id: "toilet", label: "Powerful Toilet Cleaner" },
  { id: "bathroom", label: "Disinfectant Bathroom Cleaner" },
  { id: "laundry", label: "Laundry Detergent Liquid" },
  { id: "floor", label: "Premium Floor Cleaner" },
  { id: "dish", label: "Dish Wash Liquid" },
];
