export const PRODUCT_CATEGORIES = [
  "Bijoux",
  "Sacs & accessoires",
  "Décoration",
  "Vanille",
] as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[number];
