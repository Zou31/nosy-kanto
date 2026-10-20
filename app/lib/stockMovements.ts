import type {
  StockMovement,
  StockMovementLocation,
} from "../data/stockMovements";

export function createStockMovement(
  productId: string,
  productName: string,
  from: StockMovementLocation,
  to: StockMovementLocation,
  quantity: number,
  type: StockMovement["type"] = "Transfert",
  reason = "",
  variantId?: string
): StockMovement {
  return {
    id: crypto.randomUUID(),
    productId,
    variantId,
    productName,
    type,
    from,
    to,
    quantity,
    reason,
    date: new Date().toLocaleDateString("fr-FR"),
    time: new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
