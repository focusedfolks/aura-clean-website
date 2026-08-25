export const ENQUIRY = {
  display: "+91 63539 04865",
  href: "tel:+916353904865",
} as const;

export const WHATSAPP = {
  display: "+91 63539 04865",
  number: "916353904865",
} as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;
}

export const PHONE = {
  display: "+91 72029 1060",
  href: "tel:+91720291060",
} as const;

export const EMAIL = {
  display: "info.auraclean@gmail.com",
  href: "mailto:info.auraclean@gmail.com",
} as const;

export const ADDRESS = {
  line: "236, Seventh Heaven",
  city: "Ahmedabad",
  display: "236, Seventh Heaven, Ahmedabad",
  maps: "https://www.google.com/maps/search/?api=1&query=236+Seventh+Heaven+Ahmedabad",
} as const;

export const MANUFACTURER = {
  label: "Manufactured by",
  name: "Laiba Lubricants Pvt. Ltd.",
} as const;

export const SOCIAL = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/auraclean.in/",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/auraclean.in",
  },
] as const;
