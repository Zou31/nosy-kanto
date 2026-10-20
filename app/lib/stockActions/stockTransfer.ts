import type {
  StockItem,
  StockLocation,
} from "../../data/stock";

import { transferStock } from "../stock";

type StockTransferResult = {
  stock: StockItem[];
  error: string | null;
};

export function executeStockTransfer(
  stock: StockItem[],
  productId: string,
  from: StockLocation,
  to: StockLocation,
  quantity: number,
  variantId?: string
): StockTransferResult {
  const source = stock.find(
  (item) =>
    item.productId === productId &&
    (variantId === undefined || item.variantId === variantId) &&
    item.location === from
);


  if (!source) {
    return {
      stock,
      error: "Stock source introuvable.",
    };
  }

  if (from === to) {
    return {
      stock,
      error:
        "Le lieu de départ et le lieu d’arrivée doivent être différents.",
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
      error: `Stock insuffisant : seulement ${source.quantity} article(s) disponible(s) à ${from}.`,
    };
  }

  return {
  stock: transferStock(
    stock,
    productId,
    from,
    to,
    quantity,
    variantId
  ),
  error: null,
  };
}