import type { Product } from "../data/products";
import type { StockItem } from "../data/stock";

export function createInitialStockForVariant(
  product: Product
): StockItem[] {
  const stock: StockItem[] = [];

  const variants = product.variants ?? [];

  if (variants.length === 0) {
    stock.push({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      location: "Maison",
      quantity: product.stock ?? 0,
      alertLevel: product.stockMin ?? 0,
      updatedAt: new Date()
        .toISOString()
        .slice(0, 10),
    });

    return stock;
  }

  for (const variant of variants) {
    const initialLocation =
      variant.location?.trim() || "Maison";

    stock.push({
      id: crypto.randomUUID(),
      productId: product.id,
      variantId: variant.id,
      name: `${product.name} - ${variant.color}`,
      location: initialLocation,
      quantity: variant.stock ?? 0,
      alertLevel: variant.stockMin ?? 0,
      updatedAt: new Date()
        .toISOString()
        .slice(0, 10),
    });
  }

  return stock;
}
