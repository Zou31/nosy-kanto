import type { StockItem } from "../../data/stock";

export function getTotalProducts(stock: StockItem[]) {
  return new Set(
    stock.map((item) => item.productId)
  ).size;
}
