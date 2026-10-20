import type { StockItem } from "../../data/stock";
import { getProductById } from "../../data/products";

export function getStockValue(
  stock: StockItem[]
) {
  return stock.reduce((total, item) => {
    const product = getProductById(item.productId);

    if (!product) return total;

    return total + product.price * item.quantity;
  }, 0);
}
