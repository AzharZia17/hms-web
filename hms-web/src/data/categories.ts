import type { Category, Collection } from "@/types/product";

export const categories: Category[] = [
  {
    slug: "taps-cocks",
    name: "Taps & Cocks",
    description: "T cocks, BIB cocks, sink cocks and side piller cocks — with brass mohra.",
    coverProduct: "bib-cock-two-way",
  },
  {
    slug: "mixers",
    name: "Mixers",
    description: "Sink, basin and wall mixers, including a 3-in-1 wall mixer for bath and shower.",
    coverProduct: "wall-mixer-3in1",
  },
  {
    slug: "shower-heads",
    name: "Shower Heads",
    description: "Round and square overhead shower heads in clean white.",
    coverProduct: "shower-head-round",
  },
  {
    slug: "health-faucets",
    name: "Health Faucets",
    description: "Toilet shower sets in white and chrome, with hose and wall holder.",
    coverProduct: "health-faucet-chrome",
  },
  {
    slug: "shower-hoses",
    name: "Shower Hoses",
    description: "Flexible shower hoses with chrome-finish connectors.",
    coverProduct: "shower-hose-chrome",
  },
  {
    slug: "floor-drains",
    name: "Floor Drains",
    description: "Square floor drains with removable grating.",
    coverProduct: "floor-drain-star",
  },
];

export const collections: Collection[] = [
  {
    slug: "shower",
    name: "The Shower Collection",
    tagline: "Everything for the shower area",
    description:
      "Overhead shower heads, health faucets and flexible hoses — designed to work together in one clean, white finish.",
    categories: ["shower-heads", "health-faucets", "shower-hoses"],
    coverProduct: "wall-mixer-3in1",
  },
  {
    slug: "taps-and-mixers",
    name: "Taps & Mixers Collection",
    tagline: "Control water with confidence",
    description:
      "Swan-neck sink cocks, bib cocks, angle valves and mixers with the signature HMS handle.",
    categories: ["taps-cocks", "mixers"],
    coverProduct: "sink-mixer-pillar",
  },
  {
    slug: "drainage",
    name: "Drainage Collection",
    tagline: "Quietly essential",
    description: "Square floor drains with a flush profile and removable grating.",
    categories: ["floor-drains"],
    coverProduct: "floor-drain-plain",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
