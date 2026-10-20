import type { StockItem } from "../../data/stock";

export function getLowStockCount(
  stock: StockItem[]
) {
  return stock.filter(
    (item) => item.quantity <= item.alertLevel
  ).length;
}
