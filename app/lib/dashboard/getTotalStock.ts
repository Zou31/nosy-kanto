import type { StockItem } from "../../data/stock";

export function getTotalStock(stock: StockItem[]) {
  return stock.reduce(
    (total, item) => total + item.quantity,
    0
  );
}
