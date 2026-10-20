import type { StockItem } from "../../data/stock";

type SellOnlineResult = {
  stock: StockItem[];
  error: string | null;
};

export function sellOnline(
  stock: StockItem[],
  productId: string,
  quantity: number,
  variantId?: string
): SellOnlineResult {
  const matchesTarget = (item: StockItem) =>
    item.productId === productId &&
    (variantId === undefined || item.variantId === variantId);

  const source = stock.find(
    (item) =>
      matchesTarget(item) &&
      item.location === "Maison"
  );

  if (!source) {
    return {
      stock,
      error: "Aucun stock disponible à la Maison pour cette référence.",
    };
  }

  if (quantity <= 0) {
    return {
      stock,
      error: "La quantité doit être supérieure à zéro.",
    };
  }

  if (quantity > source.quantity) {
    return {
      stock,
      error: `Stock insuffisant : seulement ${source.quantity} article(s) disponible(s) à la Maison.`,
    };
  }

  const updatedStock = stock.map((item) =>
    matchesTarget(item) &&
    item.location === "Maison"
      ? {
          ...item,
          quantity: item.quantity - quantity,
        }
      : item
  );

  return {
    stock: updatedStock,
    error: null,
  };
}
