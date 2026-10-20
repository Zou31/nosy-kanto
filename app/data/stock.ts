import { PRODUCTS } from "./products"; 
export type StockLocation = string;

export type StockItem = {
  id: string;
  productId: string;
  variantId?: string;
  catalogProductId?: string;
  name: string;
  location: StockLocation;
  quantity: number;
  alertLevel: number;
  updatedAt: string;
};

export const STOCK: StockItem[] = PRODUCTS.flatMap((product) => {
  // Produits avec variantes
  if (product.variants && product.variants.length > 0) {
    return product.variants.map((variant) => ({
      id: `stock-product.id-{variant.id}`,
      productId: product.id,
      variantId: variant.id,
      catalogProductId: product.id,
      name: `${product.name} - ${variant.color ?? variant.id}`,
      location: "Maison",
      quantity: variant.stock ?? 0,
      alertLevel: 2,
      updatedAt: "2026-08-21",
    }));
  }

  // Produits sans variante
  return [
    {
      id: `stock-${product.id}`,
      productId: product.id,
      catalogProductId: product.id,
      name: product.name,
      location: "Maison",
      quantity: product.stock ?? 0,
      alertLevel: 2,
      updatedAt: "2026-08-21",
    },
  ];
});
