export type CategorySlug =
  | "taps-cocks"
  | "mixers"
  | "shower-heads"
  | "health-faucets"
  | "shower-hoses"
  | "floor-drains";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short, factual description shown on category cards. */
  description: string;
  /** Slug of the product whose photo represents this category. */
  coverProduct: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "cover" fills the frame; "contain" shows the whole product on a matched background. */
  fit?: "cover" | "contain";
  /** Background colour matched to the photo, used to fill the frame when fit is "contain". */
  bg?: string;
  /** CSS object-position used when fit is "cover". */
  position?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  summary: string;
  /** Primary image first, then any additional views. */
  images: [ProductImage, ...ProductImage[]];
  /** Optional mapping of color name to specific photo variant. */
  colorImages?: Partial<Record<string, ProductImage>>;
  /** Only details that are visible in the supplied photography. */
  specs: ProductSpec[];
  /** Set when the product comes only in these finishes (not the standard colour range). */
  onlyColours?: string[];
  featured?: boolean;
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: CategorySlug[];
  coverProduct: string;
}
