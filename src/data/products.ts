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
  >;
  badge: string;
  title: string;
  blurb: string;
  price: string;
  was?: string;
  saveLabel: string;
  gift?: string;
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
  flavors?: ProductFlavor[];
  sizes?: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "hand-wash",
    name: "Hand Wash",
    category: "hand-wash",
    src: "/product-handwash-charcoal.webp?v=11",
    tone: "#222",
    blurb: "Deep cleanse and lasting protection, pick your favourite fragrance.",
    spec: "99.9% Cleaning Protection",
    volume: "250 ml - 5 Ltr",
    flavors: [
      {
        id: "charcoal",
        label: "Charcoal",
        src: "/product-handwash-charcoal.webp?v=11",
        tone: "#222",
      },
      {
        id: "lemon",
        label: "Lemon",
        src: "/product-handwash-lemon.webp",
        tone: "#f0c400",
      },
      {
        id: "rose",
        label: "Rose",
        src: "/product-handwash-rose.webp",
        tone: "#e85a9b",
      },
    ],
    sizes: ["250 ml", "500 ml", "600 ml", "5 Ltr"],
  },
  {
    id: "toilet",
    name: "Powerful Toilet Cleaner",
    category: "toilet",
    src: "/product-toilet.webp?v=3",
    tone: "#1c4fa0",
    blurb: "10x Power. Removes tough stains. Fresh fragrance. Deep cleaning.",
    spec: "Kills 99.9% Germs",
    volume: "500 ml - 1 Ltr",
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "bathroom",
    name: "Disinfectant Bathroom Cleaner",
    category: "bathroom",
    src: "/product-bathroom.webp?v=3",
    tone: "#6e1010",
    blurb: "10X better cleaning for sinks, tiles and fittings.",
    spec: "Kills 99.9% Germs",
    volume: "500 ml - 1 Ltr",
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "laundry",
    name: "Laundry Detergent Liquid",
    category: "laundry",
    src: "/product-laundry.webp?v=7",
    tone: "#3d7ad6",
    blurb: "Deep clean. Fresh fragrance. Gentle on fabric.",
    spec: "1 Ltr · 5 Ltr",
    volume: "1 Ltr - 5 Ltr",
    sizes: ["1 Ltr", "5 Ltr"],
  },
  {
    id: "floor",
    name: "Premium Floor Cleaner",
    category: "floor",
    src: "/product-floor-lavender.webp?v=1",
    tone: "#7b4fd1",
    blurb: "Plant-extract powered shine, pick Lavender, Lemon Fresh, or Rose Fresh.",
    spec: "10X Litter & Bacteria Stronger Clean",
    volume: "500 ml - 1 Ltr",
    flavors: [
      {
        id: "lavender",
        label: "Lavender",
        src: "/product-floor-lavender.webp?v=1",
        tone: "#7b4fd1",
      },
      {
        id: "lemon",
        label: "Lemon",
        src: "/product-floor-lemon.webp?v=5",
        tone: "#f0c400",
      },
      {
        id: "rose",
        label: "Rose",
        src: "/product-floor-rose.webp?v=8",
        tone: "#e85a9b",
      },
    ],
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "dish",
    name: "Dish Wash Liquid",
    category: "dish",
    src: "/product-dish.webp?v=3",
    tone: "#c5a000",
    blurb: "Tough on grease. Gentle on hands. Fresh lemon fragrance.",
    spec: "Powerful Grease Removal",
    volume: "1 Ltr",
    sizes: ["1 Ltr"],
  },
];

/** Featured 6-in-1 banner, shown at the top of the Offers page. */
export const FEATURED_OFFER: OfferDeal = {
  id: "combo",
  badge: "Exclusive deal",
  title: "The Ultimate 6-in-1 Home Care Combo",
  blurb: "6 Essentials. 1 Family. Total Home Hygiene, laundry, floor, dish, bath, toilet and hand wash.",
  price: "₹349",
  was: "₹499",
  saveLabel: "You save ₹150",
  theme: "featured",
  includes: [
    { id: "laundry", label: "1 Ltr Laundry" },
    { id: "dish", label: "1 Ltr Dishwash" },
    { id: "floor", label: "500 ml Floor", flavor: "lavender" },
    { id: "bathroom", label: "500 ml Bath" },
    { id: "toilet", label: "500 ml Toilet" },
    { id: "hand-wash", label: "500 ml Hand Wash", flavor: "charcoal" },
  ],
};

/** Combo / offer packs, cart only, not listed as regular catalog SKUs. */
export const OFFERS: OfferDeal[] = [
  {
    id: "combo-kitchen-bath",
    badge: "Hot deal",
    title: "Kitchen & Floor Care Pack",
    blurb: "Grease off the plates. Shine on the tiles. Fresh floors underfoot. The weekend reset, for less.",
    price: "₹160",
    was: "₹213",
    saveLabel: "You save ₹53",
    theme: "citrus",
    includes: [
      { id: "dish", label: "1 Ltr Dishwash" },
      { id: "bathroom", label: "500 ml Bathroom Cleaner" },
      { id: "floor", label: "500 ml Floor Cleaner", flavor: "lemon" },
    ],
  },
  {
    id: "combo-saver",
    badge: "Top saver",
    title: "Kitchen & Washroom Saver Pack",
    blurb: "From the sink to the washroom. Dishwash, handwash and toilet cleaner at a sharp combo price.",
    price: "₹160",
    was: "₹223",
    saveLabel: "You save ₹63",
    theme: "citrus",
    includes: [
      { id: "dish", label: "1 Ltr Dishwash" },
      { id: "hand-wash", label: "500 ml Handwash", flavor: "lemon" },
      { id: "toilet", label: "500 ml Toilet Cleaner" },
    ],
  },
  {
    id: "combo-essential",
    badge: "Everyday trio",
    title: "Essential Home Care Pack",
    blurb: "Clothes, hands, toilet. Three daily staples every home reaches for first, now in one smarter pack.",
    price: "₹210",
    was: "₹227",
    saveLabel: "You save ₹17",
    theme: "ink",
    includes: [
      { id: "laundry", label: "1 Ltr Liquid Detergent" },
      { id: "hand-wash", label: "500 ml Handwash", flavor: "charcoal" },
      { id: "toilet", label: "500 ml Toilet Cleaner" },
    ],
  },
  {
    id: "combo-hygiene",
    badge: "Daily ritual",
    title: "Daily Wash & Clean Combo",
    blurb: "Wash the load. Mop the floor. Wipe the bath. A quiet daily circuit that keeps the house finished.",
    price: "₹210",
    was: "₹217",
    saveLabel: "You save ₹7",
    theme: "ink",
    includes: [
      { id: "laundry", label: "1 Ltr Liquid Detergent" },
      { id: "floor", label: "500 ml Floor Cleaner", flavor: "lavender" },
      { id: "bathroom", label: "500 ml Bathroom Cleaner" },
    ],
  },
  {
    id: "combo-mega",
    badge: "Free gift",
    title: "Mega 1L Trio Pack",
    blurb: "Three full litres for laundry, dishes and floors. Plus a FREE Handwash 250 ml in the box.",
    price: "₹250",
    was: "₹289",
    saveLabel: "You save ₹39",
    gift: "FREE 250ML HANDWASH with this Combo",
    theme: "blush",
    includes: [
      { id: "laundry", label: "1 Ltr Liquid Detergent" },
      { id: "dish", label: "1 Ltr Dishwash" },
      { id: "floor", label: "1 Ltr Floor Cleaner", flavor: "lavender" },
    ],
  },
  {
    id: "combo-power",
    badge: "Free gift",
    title: "Complete Cleaning Power Combo",
    blurb: "Laundry, dishes and toilet in 1 Ltr bottles. Plus a FREE Handwash 250 ml with this combo.",
    price: "₹260",
    was: "₹293",
    saveLabel: "You save ₹33",
    gift: "FREE 250ML HANDWASH with this Combo",
    theme: "citrus",
    includes: [
      { id: "laundry", label: "1 Ltr Liquid Detergent" },
      { id: "dish", label: "1 Ltr Dishwash" },
      { id: "toilet", label: "1 Ltr Toilet Cleaner" },
    ],
  },
  {
    id: "combo-ultimate",
    badge: "Free gift",
    title: "Whole House Heavy Duty 1L Pack",
    blurb: "Three 1 Ltr bottles for laundry, toilet and bathroom. Plus a FREE Handwash 250 ml with every order.",
    price: "₹280",
    was: "₹297",
    saveLabel: "You save ₹17",
    gift: "FREE 250ML HANDWASH with this Combo",
    theme: "ink",
    includes: [
      { id: "laundry", label: "1 Ltr Liquid Detergent" },
      { id: "toilet", label: "1 Ltr Toilet Cleaner" },
      { id: "bathroom", label: "1 Ltr Bathroom Cleaner" },
    ],
  },
];

export const ALL_OFFERS: OfferDeal[] = [FEATURED_OFFER, ...OFFERS];

function offerToProduct(offer: OfferDeal): Product {
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
  "hand-wash",
  "toilet",
  "bathroom",
  "laundry",
  "floor",
  "dish",
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
