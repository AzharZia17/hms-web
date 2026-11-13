import type { Product, ProductImage } from "@/types/product";

/**
 * Product catalogue. To add a product: drop a photo in /public/images/products,
 * then add an entry below.  is intentionally empty until real catalogue
 * codes are available.  lists only what is visible in the photography.
 */
/** Frame colour sampled from each photo's own edges so letterboxing blends in. */
const BG: Record<string, string> = {
  "angle-valve": "#000000",
  "bib-cock-two-way": "#000000",
  "floor-drain-plain": "#000000",
  "floor-drain-star": "#000000",
  "health-faucet-chrome": "#000000",
  "health-faucet-white": "#000000",
  "shower-head-round": "#000000",
  "shower-head-square": "#000000",
  "shower-hose-chrome": "#000000",
  "shower-hose-pvc-white": "#000000",
  "sink-cock-table-swan": "#000000",
  "sink-cock-wall-swan": "#000000",
  "sink-mixer-pillar": "#000000",
  "sink-mixer-wall": "#000000",
  "wall-mixer-3in1": "#000000",
};

const img = (
  file: string,
  alt: string,
  width: number,
  height: number,
  extra: Partial<ProductImage> = {},
): ProductImage => {
  const ext = file.includes(".") ? "" : ".png";
  const base = file
    .replace(/\.(png|jpg|jpeg)$/, "")
    .replace(/-alt$/, "")
    .replace(/^variants\//, "")
    .replace(/-(white|black|pink|blue|sage-green|gray|beige|ivory)$/, "");
  return {
    src: `/images/products/${file}${ext}`,
    alt,
    width,
    height,
    fit: "contain",
    bg: BG[base] ?? "#000000",
    ...extra,
  };
};

const white = { label: "Photo shown in", value: "White" };
const chrome = { label: "Connector", value: "Chrome-finish" };

export const products: Product[] = [
  {
    slug: "sink-cock-table-swan",
    name: "Side Piller Cock",
    category: "taps-cocks",
    summary: "A tall swan-neck spout with a single HMS handle for table-mounted sinks.",
    images: [
      img("variants/sink-cock-table-swan-white", "White swan-neck table-mounted sink cock with HMS handle on stone base", 1033, 1523),
      img("sink-cock-table-swan-alt", "White swan-neck table-mounted sink cock with HMS handle", 1033, 1523),
    ],
    colorImages: {
      "White": img("variants/sink-cock-table-swan-white", "White Side Piller Cock", 1033, 1523),
      "Black": img("variants/sink-cock-table-swan-black", "Black Side Piller Cock", 1033, 1522),
      "Pink": img("variants/sink-cock-table-swan-pink", "Pink Side Piller Cock", 1033, 1523),
      "Blue": img("variants/sink-cock-table-swan-blue", "Blue Side Piller Cock", 1033, 1523),
      "Sage Green": img("variants/sink-cock-table-swan-sage-green", "Sage Green Side Piller Cock", 1033, 1523),
      "Gray": img("variants/sink-cock-table-swan-gray", "Gray Side Piller Cock", 1033, 1523),
      "Beige": img("variants/sink-cock-table-swan-beige", "Beige Side Piller Cock", 1033, 1523),
      "Ivory": img("variants/sink-cock-table-swan-ivory", "Ivory Side Piller Cock", 1033, 1523),
    },
    specs: [white, { label: 'Spout', value: 'Swan-neck' }, { label: 'Filter', value: 'With Filter' }, { label: 'Mounting', value: 'Table / deck' }, { label: 'Handle', value: 'Single, HMS-branded' }, { label: 'Internal', value: 'With brass mohra' }],
    featured: true,
  },
  {
    slug: "sink-cock-wall-swan",
    name: "Sink Cock",
    category: "taps-cocks",
    summary: "Wall-mounted swan-neck sink cock with a single HMS handle.",
    images: [
      img("variants/sink-cock-wall-swan-white", "White wall-mounted swan-neck sink cock with HMS handle", 1068, 1473),
    ],
    colorImages: {
      "White": img("variants/sink-cock-wall-swan-white", "White Sink Cock", 1068, 1473),
      "Black": img("variants/sink-cock-wall-swan-black", "Black Sink Cock", 1068, 1473),
      "Pink": img("variants/sink-cock-wall-swan-pink", "Pink Sink Cock", 1068, 1473),
      "Blue": img("variants/sink-cock-wall-swan-blue", "Blue Sink Cock", 1068, 1473),
      "Sage Green": img("variants/sink-cock-wall-swan-sage-green", "Sage Green Sink Cock", 1068, 1473),
      "Gray": img("variants/sink-cock-wall-swan-gray", "Gray Sink Cock", 1068, 1473),
      "Beige": img("variants/sink-cock-wall-swan-beige", "Beige Sink Cock", 1068, 1473),
      "Ivory": img("variants/sink-cock-wall-swan-ivory", "Ivory Sink Cock", 1068, 1473),
    },
    specs: [white, { label: 'Spout', value: 'Swan-neck' }, { label: 'Filter', value: 'With Filter' }, { label: 'Mounting', value: 'Wall' }, { label: 'Handle', value: 'Single, HMS-branded' }, { label: 'Internal', value: 'With brass mohra' }],
  },
  {
    slug: "bib-cock-two-way",
    name: "Double BIB Cock",
    category: "taps-cocks",
    summary: "Two-handle wall bib cock with an additional outlet for hose or appliance connections.",
    images: [
      img("variants/bib-cock-two-way-white", "White two-way wall bib cock with two handles and wall flange", 1438, 1094),
    ],
    colorImages: {
      "White": img("variants/bib-cock-two-way-white", "White Double BIB Cock", 1438, 1094),
      "Black": img("variants/bib-cock-two-way-black", "Black Double BIB Cock", 1438, 1094),
      "Pink": img("variants/bib-cock-two-way-pink", "Pink Double BIB Cock", 1438, 1094),
      "Blue": img("variants/bib-cock-two-way-blue", "Blue Double BIB Cock", 1438, 1094),
      "Sage Green": img("variants/bib-cock-two-way-sage-green", "Sage Green Double BIB Cock", 1438, 1094),
      "Gray": img("variants/bib-cock-two-way-gray", "Gray Double BIB Cock", 1438, 1094),
      "Beige": img("variants/bib-cock-two-way-beige", "Beige Double BIB Cock", 1438, 1094),
      "Ivory": img("variants/bib-cock-two-way-ivory", "Ivory Double BIB Cock", 1438, 1094),
    },
    specs: [white, { label: 'Heads', value: 'Two' }, { label: 'Mounting', value: 'Wall, with flange' }, { label: 'Internal', value: 'With brass mohra' }, { label: 'Available with', value: 'Filter' }],
    featured: true,
  },
  {
    slug: "angle-valve",
    name: "T Cock",
    category: "taps-cocks",
    summary: "Compact angle valve with a round wall flange for concealed supply lines.",
    images: [
      img("variants/angle-valve-white", "White T Cock angle valve with threaded outlet and round wall flange", 963, 1634),
      img("angle-valve", "White angle valve high-resolution studio photograph", 942, 1600),
    ],
    colorImages: {
      "White": img("variants/angle-valve-white", "White T Cock", 963, 1634),
      "Black": img("variants/angle-valve-black", "Black T Cock", 963, 1634),
      "Pink": img("variants/angle-valve-pink", "Pink T Cock", 963, 1633),
      "Blue": img("variants/angle-valve-blue", "Blue T Cock", 963, 1634),
      "Sage Green": img("variants/angle-valve-sage-green", "Sage Green T Cock", 963, 1634),
      "Gray": img("variants/angle-valve-gray", "Gray T Cock", 963, 1633),
      "Beige": img("variants/angle-valve-beige", "Beige T Cock", 962, 1634),
      "Ivory": img("variants/angle-valve-ivory", "Ivory T Cock", 962, 1634),
    },
    specs: [white, { label: 'Internal', value: 'With brass mohra' }],
  },
  {
    slug: "sink-mixer-wall",
    name: "Sink Mixer",
    category: "mixers",
    summary: "Two-handle wall mixer with a curved swan-neck spout.",
    images: [
      img("variants/sink-mixer-wall-white", "White wall-mounted sink mixer with two HMS handles and swan-neck spout", 1254, 1254),
    ],
    colorImages: {
      "White": img("variants/sink-mixer-wall-white", "White Sink Mixer", 1254, 1254),
      "Black": img("variants/sink-mixer-wall-black", "Black Sink Mixer", 1254, 1254),
      "Pink": img("variants/sink-mixer-wall-pink", "Pink Sink Mixer", 1254, 1254),
      "Blue": img("variants/sink-mixer-wall-blue", "Blue Sink Mixer", 1254, 1254),
      "Sage Green": img("variants/sink-mixer-wall-sage-green", "Sage Green Sink Mixer", 1254, 1254),
      "Gray": img("variants/sink-mixer-wall-gray", "Gray Sink Mixer", 1254, 1254),
      "Beige": img("variants/sink-mixer-wall-beige", "Beige Sink Mixer", 1254, 1254),
      "Ivory": img("variants/sink-mixer-wall-ivory", "Ivory Sink Mixer", 1254, 1254),
    },
    specs: [white, { label: 'Spout', value: 'Swan-neck' }, { label: 'Filter', value: 'With Filter' }, { label: 'Heads', value: 'Two, HMS-branded' }, { label: 'Mounting', value: 'Wall' }, { label: 'Cup', value: '2 Round Cups' }, { label: 'Internal', value: 'With brass mohra' }],
    featured: true,
  },
  {
    slug: "sink-mixer-pillar",
    name: "Basin Mixer",
    category: "mixers",
    summary: "A two-head basin mixer with a tall swan-neck spout and HMS-branded heads, finished in clean white.",
    images: [
      img("variants/sink-mixer-pillar-white", "White pillar basin mixer with two heads and tall swan-neck spout", 1035, 1519),
    ],
    colorImages: {
      "White": img("variants/sink-mixer-pillar-white", "White Basin Mixer", 1035, 1519),
      "Black": img("variants/sink-mixer-pillar-black", "Black Basin Mixer", 1035, 1519),
      "Pink": img("variants/sink-mixer-pillar-pink", "Pink Basin Mixer", 1036, 1519),
      "Blue": img("variants/sink-mixer-pillar-blue", "Blue Basin Mixer", 1036, 1518),
      "Sage Green": img("variants/sink-mixer-pillar-sage-green", "Sage Green Basin Mixer", 1036, 1518),
      "Gray": img("variants/sink-mixer-pillar-gray", "Gray Basin Mixer", 1036, 1518),
      "Beige": img("variants/sink-mixer-pillar-beige", "Beige Basin Mixer", 1036, 1518),
      "Ivory": img("variants/sink-mixer-pillar-ivory", "Ivory Basin Mixer", 1036, 1518),
    },
    specs: [white, { label: 'Spout', value: 'Swan-neck' }, { label: 'Filter', value: 'With Filter' }, { label: 'Heads', value: 'Two, HMS-branded' }, { label: 'Internal', value: 'With brass mohra' }],
    featured: true,
  },
  {
    slug: "wall-mixer-3in1",
    name: "Wall Shower",
    category: "mixers",
    summary: "Three-handle wall mixer combining a spout and an upper outlet for bath and shower use.",
    images: [
      img("variants/wall-mixer-3in1-white", "White wall shower mixer with three HMS-branded handles", 1254, 1254),
    ],
    colorImages: {
      "White": img("variants/wall-mixer-3in1-white", "White Wall Shower", 1254, 1254),
      "Black": img("variants/wall-mixer-3in1-black", "Black Wall Shower", 1254, 1254),
      "Blue": img("variants/wall-mixer-3in1-blue", "Blue Wall Shower", 1254, 1254),
      "Sage Green": img("variants/wall-mixer-3in1-sage-green", "Sage Green Wall Shower", 1254, 1254),
      "Gray": img("variants/wall-mixer-3in1-gray", "Gray Wall Shower", 1254, 1254),
      "Beige": img("variants/wall-mixer-3in1-beige", "Beige Wall Shower", 1254, 1254),
      "Ivory": img("variants/wall-mixer-3in1-ivory", "Ivory Wall Shower", 1254, 1254),
    },
    specs: [white, { label: 'Heads', value: 'Three, HMS-branded' }, { label: 'Mounting', value: 'Wall' }, { label: 'Internal', value: 'With brass mohra' }],
  },
  {
    slug: "shower-head-round",
    name: "Round Shower Head",
    category: "shower-heads",
    summary: "Round white shower head with a dark accent ring and chrome-finish neck.",
    images: [
      img("variants/shower-head-round-white", "Round white shower head with black accent ring and chrome neck", 1254, 1254),
      img("shower-head-round", "Round shower head studio photograph", 1293, 1216),
    ],
    colorImages: {
      "White": img("variants/shower-head-round-white", "White Round Shower Head", 1254, 1254),
      "Black": img("variants/shower-head-round-black", "Black Round Shower Head", 1254, 1254),
      "Pink": img("variants/shower-head-round-pink", "Pink Round Shower Head", 1254, 1254),
      "Blue": img("variants/shower-head-round-blue", "Blue Round Shower Head", 1254, 1254),
      "Sage Green": img("variants/shower-head-round-sage-green", "Sage Green Round Shower Head", 1254, 1254),
      "Gray": img("variants/shower-head-round-gray", "Gray Round Shower Head", 1254, 1254),
      "Beige": img("variants/shower-head-round-beige", "Beige Round Shower Head", 1254, 1254),
      "Ivory": img("variants/shower-head-round-ivory", "Ivory Round Shower Head", 1254, 1254),
    },
    specs: [white, { label: 'Shape', value: 'Round' }, { label: 'Neck', value: 'Chrome-finish' }],
    featured: true,
  },
  {
    slug: "shower-head-square",
    name: "Square Shower Head",
    category: "shower-heads",
    summary: "Square overhead shower head with a fine grid of spray nozzles.",
    images: [
      img("variants/shower-head-square-white", "Square white overhead shower head with grid of spray nozzles", 1421, 1107),
      img("shower-head-square", "Square overhead shower head alternate photograph", 1681, 1441),
    ],
    colorImages: {
      "White": img("variants/shower-head-square-white", "White Square Shower Head", 1421, 1107),
      "Black": img("variants/shower-head-square-black", "Black Square Shower Head", 1421, 1107),
      "Pink": img("variants/shower-head-square-pink", "Pink Square Shower Head", 1421, 1107),
      "Blue": img("variants/shower-head-square-blue", "Blue Square Shower Head", 1421, 1107),
      "Sage Green": img("variants/shower-head-square-sage-green", "Sage Green Square Shower Head", 1421, 1107),
      "Gray": img("variants/shower-head-square-gray", "Gray Square Shower Head", 1421, 1107),
      "Beige": img("variants/shower-head-square-beige", "Beige Square Shower Head", 1421, 1107),
      "Ivory": img("variants/shower-head-square-ivory", "Ivory Square Shower Head", 1421, 1107),
    },
    specs: [white, { label: 'Shape', value: 'Square' }, { label: 'Neck', value: 'Chrome-finish' }],
  },
  {
    slug: "health-faucet-chrome",
    name: "Toilet Shower (Chrome)",
    category: "health-faucets",
    summary: "Chrome-finish hand-held health faucet with stainless steel connection pipe and wall holder.",
    images: [
      img("health-faucet-chrome", "Chrome-finish health faucet with stainless steel connection pipe and wall holder", 993, 1583),
    ],
    specs: [{ label: 'Finish', value: 'Chrome' }, { label: 'Connection pipe', value: 'Stainless steel' }, { label: 'Includes', value: 'Wall holder' }],
    onlyColours: ["Chrome"],
    featured: true,
  },
  {
    slug: "health-faucet-white",
    name: "Toilet Shower",
    category: "health-faucets",
    summary: "White hand-held health faucet with rubber connection pipe and wall holder.",
    images: [
      img("variants/health-faucet-white-white", "White health faucet with rubber connection pipe and wall holder", 930, 1691),
    ],
    colorImages: {
      "White": img("variants/health-faucet-white-white", "White Toilet Shower", 930, 1691),
      "Black": img("variants/health-faucet-white-black", "Black Toilet Shower", 929, 1693),
      "Pink": img("variants/health-faucet-white-pink", "Pink Toilet Shower", 929, 1693),
      "Blue": img("variants/health-faucet-white-blue", "Blue Toilet Shower", 929, 1693),
      "Sage Green": img("variants/health-faucet-white-sage-green", "Sage Green Toilet Shower", 929, 1693),
      "Gray": img("variants/health-faucet-white-gray", "Gray Toilet Shower", 929, 1693),
      "Beige": img("variants/health-faucet-white-beige", "Beige Toilet Shower", 929, 1693),
      "Ivory": img("variants/health-faucet-white-ivory", "Ivory Toilet Shower", 929, 1693),
    },
    specs: [white, { label: 'Connection pipe', value: 'Rubber' }, { label: 'Includes', value: 'Wall holder' }],
  },
  {
    slug: "shower-hose-chrome",
    name: "Stainless Steel Flexible Chain",
    category: "shower-hoses",
    summary: "Stainless steel flexible chain in a chrome finish, with knurled connector nuts.",
    images: [
      img("shower-hose-chrome", "Coiled chrome stainless steel flexible chain with connector nuts", 1278, 1230),
    ],
    specs: [{ label: 'Finish', value: 'Chrome' }, { label: 'Material', value: 'Stainless steel' }, { label: 'Available size', value: '18", 24" and 1 Meter' }],
    onlyColours: ["Chrome"],
    featured: true,
  },
  {
    slug: "shower-hose-pvc-white",
    name: "Rubber Connection Pipe",
    category: "shower-hoses",
    summary: "Smooth white rubber connection pipe with chrome-finish end connectors.",
    images: [
      img("variants/shower-hose-pvc-white-white", "Coiled white rubber connection pipe with chrome end connectors", 1268, 1241),
    ],
    colorImages: {
      "White": img("variants/shower-hose-pvc-white-white", "White Rubber Connection Pipe", 1268, 1241),
      "Black": img("variants/shower-hose-pvc-white-black", "Black Rubber Connection Pipe", 1254, 1254),
      "Pink": img("variants/shower-hose-pvc-white-pink", "Pink Rubber Connection Pipe", 1254, 1254),
      "Blue": img("variants/shower-hose-pvc-white-blue", "Blue Rubber Connection Pipe", 1254, 1254),
      "Sage Green": img("variants/shower-hose-pvc-white-sage-green", "Sage Green Rubber Connection Pipe", 1254, 1254),
      "Gray": img("variants/shower-hose-pvc-white-gray", "Gray Rubber Connection Pipe", 1254, 1254),
      "Beige": img("variants/shower-hose-pvc-white-beige", "Beige Rubber Connection Pipe", 1254, 1254),
      "Ivory": img("variants/shower-hose-pvc-white-ivory", "Ivory Rubber Connection Pipe", 1254, 1254),
    },
    specs: [white, { label: 'Material', value: 'Rubber' }, chrome, { label: 'Available size', value: '18", 24" and 1 Meter' }],
  },
  {
    slug: "floor-drain-star",
    name: "Floor Waste",
    category: "floor-drains",
    summary: "Square white floor drain with a decorative star-pattern removable grating.",
    images: [
      img("variants/floor-drain-star-white", "Square white floor drain with star-pattern grating", 1782, 883),
    ],
    colorImages: {
      "White": img("variants/floor-drain-star-white", "White Floor Waste", 1782, 883),
      "Black": img("variants/floor-drain-star-black", "Black Floor Waste", 1781, 883),
      "Pink": img("variants/floor-drain-star-pink", "Pink Floor Waste", 1781, 883),
      "Blue": img("variants/floor-drain-star-blue", "Blue Floor Waste", 1781, 883),
      "Sage Green": img("variants/floor-drain-star-sage-green", "Sage Green Floor Waste", 1781, 883),
      "Gray": img("variants/floor-drain-star-gray", "Gray Floor Waste", 1781, 883),
      "Beige": img("variants/floor-drain-star-beige", "Beige Floor Waste", 1781, 883),
      "Ivory": img("variants/floor-drain-star-ivory", "Ivory Floor Waste", 1781, 883),
    },
    specs: [white, { label: 'Shape', value: 'Square' }, { label: 'Size', value: '6x6' }, { label: 'Grating', value: 'Removable, star pattern' }],
  },
  {
    slug: "floor-drain-plain",
    name: "Floor Waste",
    category: "floor-drains",
    summary: "Square white floor drain with a clean, flush round cover.",
    images: [
      img("variants/floor-drain-plain-white", "Square white floor drain with plain round cover", 1997, 788),
      img("floor-drain-plain", "Square white floor drain with plain round cover alternate view", 1600, 631),
    ],
    colorImages: {
      "White": img("variants/floor-drain-plain-white", "White Floor Waste", 1997, 788),
      "Black": img("variants/floor-drain-plain-black", "Black Floor Waste", 1994, 789),
      "Pink": img("variants/floor-drain-plain-pink", "Pink Floor Waste", 1993, 789),
      "Blue": img("variants/floor-drain-plain-blue", "Blue Floor Waste", 1994, 789),
      "Sage Green": img("variants/floor-drain-plain-sage-green", "Sage Green Floor Waste", 1994, 789),
      "Gray": img("variants/floor-drain-plain-gray", "Gray Floor Waste", 1993, 789),
      "Beige": img("variants/floor-drain-plain-beige", "Beige Floor Waste", 1994, 789),
      "Ivory": img("variants/floor-drain-plain-ivory", "Ivory Floor Waste", 1994, 789),
    },
    specs: [white, { label: 'Shape', value: 'Square' }, { label: 'Size', value: '6x6' }, { label: 'Cover', value: 'Plain round' }],
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
