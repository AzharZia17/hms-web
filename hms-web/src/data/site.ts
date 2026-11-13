/**
 * Central site configuration. No verified contact details were supplied with the
 * brand assets, so everything below is read from environment variables
 * (see .env.example). Anything left empty is simply not shown on the site.
 */
const env = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

const digits = (v?: string) => v?.replace(/[^\d]/g, "");

export const site = {
  name: "HMS Plastic",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",
  description:
    "HMS Plastic designs and supplies Plastic Sanitary Fitting & Bathroom Accessories — taps, mixers, shower heads, health faucets, hoses and floor drains.",
  /** From the HMS catalogue (back page). */
  phones: ["0300-7467419", "0300-4502303"] as readonly string[],
  /** WhatsApp number supplied by the client: +92 321 6401604. */
  phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? "+92 321 6401604",
  trademark: "RTM No: 903238",
  parent: "Four Brothers",
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "info@hmsplastic.com",
  address: env(process.env.NEXT_PUBLIC_CONTACT_ADDRESS) ?? "Super Star Road Link, G.T Road, Kangniwala, Gujranwala",
  /** Digits only, with country code, e.g. 923001234567 */
  whatsapp: digits(env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)) ?? "923216401604",
  /** Google Maps embed URL (the src of the iframe from Share → Embed a map). */
  mapEmbedUrl:
    env(process.env.NEXT_PUBLIC_MAP_EMBED_URL) ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.8974421225967!2d74.19307939678951!3d32.12607190000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2b908168455b%3A0x647de0336110a435!2sIlmas%20Industry!5e0!3m2!1sen!2s!4v1793477559629!5m2!1sen!2s",
  social: {
    facebook: env(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK),
    instagram: env(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    tiktok: env(process.env.NEXT_PUBLIC_SOCIAL_TIKTOK),
    linkedin: env(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
    youtube: env(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE),
  },
} as const;

export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;

export function whatsappLink(message: string) {
  if (!site.whatsapp) return undefined;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-story", label: "Our Story" },
  { href: "/products", label: "Products", dropdown: true },
  { href: "/collections", label: "Collections" },
  { href: "/gallery", label: "Gallery" },
  { href: "/environment", label: "Environment" },
  { href: "/contact", label: "Contact" },
] as const;
