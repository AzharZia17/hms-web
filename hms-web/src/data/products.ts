import type { Product, ProductImage } from "@/types/product";

/**
 * Product catalogue. To add a product: drop a photo in /public/images/products,
 * then add an entry below. `code` is intentionally empty until real catalogue
 * codes are available. `specs` lists only what is visible in the photography.
 */
/** Frame colour sampled from each photo's own edges so letterboxing blends in. */
const BG: Record<string, string> = {"angle-valve": "#868686", "bib-cock-two-way": "#5e5e5e", "floor-drain-plain": "#686868", "floor-drain-star": "#737373", "health-faucet-chrome": "#cdcdcd", "health-faucet-white": "#dcdcdc", "shower-head-round": "#c1c0c5", "shower-head-square": "#aeadb2", "shower-hose-chrome": "#d2d2d2", "shower-hose-pvc-white": "#d5d5d5", "sink-cock-table-swan": "#bbbbbb", "sink-cock-wall-swan": "#bbbbbb", "sink-mixer-pillar": "#bbbbbb", "sink-mixer-wall": "#d5d5d5", "wall-mixer-3in1": "#c9c9c9"};

const img = (
  file: string,
  alt: string,
  width: number,
  height: number,
  extra: Partial<ProductImage> = {},
): ProductImage => ({ src: `/images/products/${file}.jpg`, alt, width, height, fit: "contain", bg: BG[file], ...extra });

const white = { label: "Photo shown in", value: "White" };
const chrome = { label: "Connector", value: "Chrome-finish" };

export const products: Product[] = [
  {
    slug: "sink-cock-table-swan",
    name: "Side Piller Cock",
    category: "taps-cocks",
    summary: "A tall swan-neck spout with a single HMS handle for table-mounted sinks.",
    images: [img("sink-cock-table-swan", "White swan-neck table-mounted sink cock with HMS handle", 868, 1280)],
    specs: [white, { label: "Spout", value: "Swan-neck" }, { label: "Mounting", value: "Table / deck" }, { label: "Handle", value: "Single, HMS-branded" }, { label: "Internal", value: "With brass mohra" }],
    featured: true,
  },
  {
    slug: "sink-cock-wall-swan",
    name: "Sink Cock",
    category: "taps-cocks",
    summary: "Wall-mounted swan-neck sink cock with a single HMS handle.",
    images: [img("sink-cock-wall-swan", "White wall-mounted swan-neck sink cock with HMS handle", 928, 1280)],
    specs: [white, { label: "Spout", value: "Swan-neck" }, { label: "Mounting", value: "Wall" }, { label: "Handle", value: "Single, HMS-branded" }, { label: "Internal", value: "With brass mohra" }],
  },
  {
    slug: "bib-cock-two-way",
    name: "Double BIB Cock",
    category: "taps-cocks",
    summary: "Two-handle wall bib cock with an additional outlet for hose or appliance connections.",
    images: [img("bib-cock-two-way", "White two-way wall bib cock with two handles and wall flange", 1280, 974)],
    specs: [white, { label: "Handles", value: "Two" }, { label: "Mounting", value: "Wall, with flange" }, { label: "Internal", value: "With brass mohra" }],
    featured: true,
  },
  {
    slug: "angle-valve",
    name: "T Cock",
    category: "taps-cocks",
    summary: "Compact angle valve with a round wall flange for concealed supply lines.",
    images: [img("angle-valve", "White angle valve with threaded outlet and round wall flange", 754, 1280)],
    specs: [white, { label: "Type", value: "Angle valve with flange" }, { label: "Internal", value: "With brass mohra" }],
  },
  {
    slug: "sink-mixer-wall",
    name: "Sink Mixer",
    category: "mixers",
    summary: "Two-handle wall mixer with a curved swan-neck spout.",
    images: [img("sink-mixer-wall", "White wall-mounted sink mixer with two HMS handles and swan-neck spout", 1280, 1267)],
    specs: [white, { label: "Spout", value: "Swan-neck" }, { label: "Handles", value: "Two, HMS-branded" }, { label: "Mounting", value: "Wall" }, { label: "Internal", value: "With brass mohra" }],
    featured: true,
  },
  {
    slug: "sink-mixer-pillar",
    name: "Basin Mixer",
    category: "mixers",
    summary: "Deck-mounted two-handle pillar mixer with a tall swan-neck spout.",
    images: [img("sink-mixer-pillar", "White deck-mounted pillar sink mixer with two handles and tall swan-neck spout", 872, 1280)],
    specs: [white, { label: "Spout", value: "Swan-neck" }, { label: "Handles", value: "Two, HMS-branded" }, { label: "Mounting", value: "Deck" }, { label: "Internal", value: "With brass mohra" }],
    featured: true,
  },
  {
    slug: "wall-mixer-3in1",
    name: "3-in-1 Wall Mixer",
    category: "mixers",
    summary: "Three-handle wall mixer combining a spout and an upper outlet for bath and shower use.",
    images: [img("wall-mixer-3in1", "White 3-in-1 wall mixer with three HMS-branded handles", 1383, 1400)],
    specs: [white, { label: "Handles", value: "Three, HMS-branded" }, { label: "Mounting", value: "Wall" }, { label: "Internal", value: "With brass mohra" }],
    featured: true,
  },
  {
    slug: "shower-head-round",
    name: "Round Shower Head",
    category: "shower-heads",
    code: "S2",
    summary: "Round white shower head with a dark accent ring and chrome-finish neck.",
    images: [img("shower-head-round", "Round white shower head with black accent ring and chrome neck", 1388, 1400)],
    specs: [white, { label: "Shape", value: "Round" }, { label: "Neck", value: "Chrome-finish" }],
    featured: true,
  },
  {
    slug: "shower-head-square",
    name: "Square Shower Head",
    category: "shower-heads",
    code: "S1",
    summary: "Square overhead shower head with a fine grid of spray nozzles.",
    images: [img("shower-head-square", "Square white overhead shower head with grid of spray nozzles", 1400, 1090)],
    specs: [white, { label: "Shape", value: "Square" }, { label: "Neck", value: "Chrome-finish" }],
  },
  {
    slug: "health-faucet-chrome",
    name: "Toilet Shower (Chrome)",
    category: "health-faucets",
    summary: "Chrome-finish hand-held health faucet with metal flexible hose and wall holder.",
    images: [img("health-faucet-chrome", "Chrome-finish health faucet with metal flexible hose and wall holder", 803, 1280)],
    specs: [{ label: "Finish", value: "Chrome" }, { label: "Hose", value: "Metal flexible" }, { label: "Includes", value: "Wall holder" }],
    featured: true,
  },
  {
    slug: "health-faucet-white",
    name: "Toilet Shower",
    category: "health-faucets",
    summary: "White hand-held health faucet with white flexible hose and wall holder.",
    images: [img("health-faucet-white", "White health faucet with white flexible hose and wall holder", 705, 1280)],
    specs: [white, { label: "Hose", value: "White flexible" }, { label: "Includes", value: "Wall holder" }],
  },
  {
    slug: "shower-hose-chrome",
    name: "Metal Flexible Shower Hose",
    category: "shower-hoses",
    summary: "Chrome-finish metal flexible hose with knurled connector nuts.",
    images: [img("shower-hose-chrome", "Coiled chrome metal flexible shower hose with connector nuts", 1280, 1233)],
    specs: [{ label: "Finish", value: "Chrome" }, { label: "Style", value: "Metal flexible" }],
    featured: true,
  },
  {
    slug: "shower-hose-pvc-white",
    name: "White Shower Hose",
    category: "shower-hoses",
    summary: "Smooth white flexible hose with chrome-finish end connectors.",
    images: [img("shower-hose-pvc-white", "Coiled white flexible shower hose with chrome end connectors", 1280, 1262)],
    specs: [white, chrome],
  },
  {
    slug: "floor-drain-star",
    name: "Floor Drain — Star Grating",
    category: "floor-drains",
    code: "F2",
    summary: "Square white floor drain with a decorative star-pattern removable grating.",
    images: [img("floor-drain-star", "Square white floor drain with star-pattern grating", 1280, 632)],
    specs: [white, { label: "Shape", value: "Square" }, { label: "Grating", value: "Removable, star pattern" }],
  },
  {
    slug: "floor-drain-plain",
    name: "Floor Drain — Plain Cover",
    category: "floor-drains",
    code: "F1",
    summary: "Square white floor drain with a clean, flush round cover.",
    images: [img("floor-drain-plain", "Square white floor drain with plain round cover", 1280, 505)],
    specs: [white, { label: "Shape", value: "Square" }, { label: "Cover", value: "Plain round" }],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (category: string) => products.filter((p) => p.category === category);
export const featuredProducts = products.filter((p) => p.featured);
export const relatedProducts = (p: Product, n = 4) => {
  const same = products.filter((x) => x.category === p.category && x.slug !== p.slug);
  const rest = products.filter((x) => x.category !== p.category);
  return [...same, ...rest].slice(0, n);
};
