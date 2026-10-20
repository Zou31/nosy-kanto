import type { StockItem } from "../data/stock";

export function getTotalStock(
  stock: StockItem[],
  productId: string
) {
  return stock
    .filter((item) => item.productId === productId)
    .reduce((total, item) => total + item.quantity, 0);
}

export function getStockByLocation(
  stock: StockItem[],
  productId: string,
  location: StockItem["location"]
) {
  return (
    stock.find(
      (item) =>
        item.productId === productId &&
        item.location === location
    ) ?? null
  );
}

export function getLowStock(
  stock: StockItem[]
) {
  return stock.filter(
    (item) => item.quantity <= item.alertLevel
  );
}
export function getLocationsForProduct(
  stock: StockItem[],
  productId: string
) {
  return stock.filter(
    (item) => item.productId === productId
  );
}
export function transferStock(
  stock: StockItem[],
  productId: string,
  from: StockItem["location"],
  to: StockItem["location"],
  quantity: number,
  variantId?: string
) {
  const matchesTarget = (item: StockItem) =>
    item.productId === productId &&
    (variantId === undefined || item.variantId === variantId);

  const source = stock.find(
    (item) =>
      matchesTarget(item) &&
      item.location === from
  );

  if (!source) return stock;
  if (quantity <= 0) return stock;
  if (source.quantity < quantity) return stock;

  const destination = stock.find(
    (item) =>
      matchesTarget(item) &&
      item.location === to
  );

  const updatedStock = stock.map((item) => {
    if (!matchesTarget(item)) return item;

    if (item.location === from) {
      return {
        ...item,
        quantity: item.quantity - quantity,
      };
    }

    if (item.location === to) {
      return {
        ...item,
        quantity: item.quantity + quantity,
      };
    }

    return item;
  });

  if (destination) {
    return updatedStock;
  }

  const newDestination: StockItem = {
    ...source,
    id: `${source.productId}${
      source.variantId ? `-${source.variantId}` : ""
    }-${to.toLowerCase().replace(/\s+/g, "-")}`,
    location: to,
    quantity,
    updatedAt: new Date()
      .toISOString()
      .slice(0, 10),
  };

  return [...updatedStock, newDestination];
}
