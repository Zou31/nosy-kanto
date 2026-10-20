import type { StockItem } from "../../data/stock";

type SellSalonResult = {
  stock: StockItem[];
  error: string | null;
};

export function sellSalon(
  stock: StockItem[],
  productId: string,
  quantity: number,
  variantId?: string
): SellSalonResult {
  const matchesTarget = (item: StockItem) =>
    item.productId === productId &&
    (variantId === undefined || item.variantId === variantId);

  const source = stock.find(
    (item) =>
      matchesTarget(item) &&
      item.location === "Salon"
  );

  if (!source) {
    return {
      stock,
      error: "Aucun stock disponible au salon pour cette référence.",
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
      error: `Stock insuffisant : seulement ${source.quantity} article(s) disponible(s) au Salon.`,
    };
  }

  const updatedStock = stock.map((item) =>
    matchesTarget(item) &&
    item.location === "Salon"
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
