/** Production site URL — override with VITE_SITE_URL on Vercel if needed. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://www.auraclean.in"
) as string;

export const SITE_NAME = "Aura Clean";

export const SITE_TAGLINE = "Pure Hands, Pure Care";

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

export const ROUTE_SEO: Record<string, PageSeo> = {
  "/": {
    path: "/",
    title: `${SITE_NAME} | ${SITE_TAGLINE} — Hand Wash & Home Care`,
    description:
      "Shop Aura Clean hand wash, floor cleaner, dishwash, toilet cleaner, bathroom cleaner, and laundry detergent. 99.9% germ protection for Indian homes.",
  },
  "/product": {
    path: "/product",
    title: `Shop ${SITE_NAME} Products | Hand Wash, Floor & Home Care`,
    description:
      "Browse all Aura Clean products with fragrance and size options. Hand wash, floor cleaner, dishwash, toilet, bathroom, and laundry essentials at 10% off retail.",
  },
  "/offers": {
    path: "/offers",
    title: `${SITE_NAME} Combo Offers | Bundle Deals & Savings`,
    description:
      "Save on Aura Clean combo packs — 6-in-1 Ultimate Cleaning Bundle at ₹349, plus kitchen, washroom, and surface care packs with free handwash gifts.",
  },
  "/about": {
    path: "/about",
    title: `About ${SITE_NAME} | Our Story & Home Care Promise`,
    description:
      "Aura Clean is made for Indian homes — thoughtful formulas, 99.9% germ protection, and care from the basin to every room. Made in Ahmedabad.",
  },
  "/contact": {
    path: "/contact",
    title: `Contact ${SITE_NAME} | Ahmedabad Enquiries & Orders`,
    description:
      "Call, email, or visit Aura Clean in Ahmedabad. Trade, press, and product enquiries at +91 63539 04865 or info.auraclean@gmail.com.",
  },
};

export const NOT_FOUND_SEO: PageSeo = {
  path: "/404",
  title: `Page Not Found | ${SITE_NAME}`,
  description:
    "This page doesn't exist. Return to Aura Clean to shop hand wash and home care products.",
  noindex: true,
};

export const PUBLIC_ROUTES = Object.keys(ROUTE_SEO);

export function seoForPath(pathname: string): PageSeo {
  const path = pathname.split("?")[0] || "/";
  return ROUTE_SEO[path] ?? { ...NOT_FOUND_SEO, path };
}
