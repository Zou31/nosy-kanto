export const COLLECTIONS = [
  "Terra",
  "Lova",
  "Ravo",
  "Wax",
  "Vanille",
] as const;

export type CollectionName = (typeof COLLECTIONS)[number];
