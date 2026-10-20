import type { StockItem } from "../../data/stock";
import { transferStock } from "../stock";

type MarketReturnResult = {
  stock: StockItem[];
  error: string | null;
};

export function marketReturn(
  stock: StockItem[],
  productId: string,
  quantity: number,
  variantId?: string
): MarketReturnResult {
  const matchesTarget = (item: StockItem) =>
    item.productId === productId &&
    (variantId === undefined || item.variantId === variantId);

  const source = stock.find(
    (item) =>
      matchesTarget(item) &&
      item.location === "Marché"
  );

  if (!source) {
    return {
      stock,
      error: "Aucun stock disponible au Marché pour cette référence.",
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
      error: `Stock insuffisant : seulement ${source.quantity} article(s) disponible(s) au Marché.`,
    };
  }

  return {
    stock: transferStock(
      stock,
      productId,
      "Marché",
      "Maison",
      quantity,
      variantId
    ),
    error: null,
  };
}
