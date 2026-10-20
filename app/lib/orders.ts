import type { Order } from "../data/orders";

export function searchOrders(
  orders: Order[],
  search: string
) {
  const query = search.trim().toLowerCase();

  if (!query) return orders;

  return orders.filter((order) => {
    const text = [
      order.customer,
      ...order.items,
      order.status,
      order.date,
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(query);
  });
}
