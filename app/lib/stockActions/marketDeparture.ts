import type { StockItem } from "../../data/stock";
import { transferStock } from "../stock";

type MarketDepartureResult = {
  stock: StockItem[];
  error: string | null;
};

export function marketDeparture(
  stock: StockItem[],
  productId: string,
  quantity: number,
  variantId?: string
): MarketDepartureResult {
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

  return {
    stock: transferStock(
      stock,
      productId,
      "Maison",
      "Marché",
      quantity,
      variantId
    ),
    error: null,
  };
}
