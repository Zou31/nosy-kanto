import { PRODUCTS } from "../data/products";

export function getProductsBySeedId(seedId: string) {
  return PRODUCTS.filter(
    (product) => product.seedId === seedId
  );
}
