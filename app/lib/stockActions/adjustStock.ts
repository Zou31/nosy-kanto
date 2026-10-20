import type {
  StockItem,
  StockLocation,
} from "../../data/stock";

type AdjustMode = "Ajouter" | "Retirer";

type AdjustStockResult = {
  stock: StockItem[];
  error: string | null;
};

export function adjustStock(
  stock: StockItem[],
  productId: string,
  location: StockLocation,
  quantity: number,
  mode: AdjustMode,
  variantId?: string
): AdjustStockResult {
  const matchesTarget = (item: StockItem) =>
    item.productId === productId &&
    (variantId === undefined || item.variantId === variantId);

  const source = stock.find(
    (item) =>
      matchesTarget(item) &&
      item.location === location
  );

  if (!source) {
    return {
      stock,
      error: `Aucun stock disponible à ${location} pour cette référence.`,
    };
  }

  if (quantity <= 0) {
    return {
      stock,
      error: "La quantité doit être supérieure à zéro.",
    };
  }

  if (mode === "Retirer" && quantity > source.quantity) {
    return {
      stock,
      error: `Stock insuffisant : seulement ${source.quantity} article(s) disponible(s) à ${location}.`,
    };
  }

  const updatedStock = stock.map((item) =>
    matchesTarget(item) &&
    item.location === location
      ? {
          ...item,
          quantity:
            mode === "Ajouter"
              ? item.quantity + quantity
              : item.quantity - quantity,
        }
      : item
  );

  return {
    stock: updatedStock,
    error: null,
  };
}
