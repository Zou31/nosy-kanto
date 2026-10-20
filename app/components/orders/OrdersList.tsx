import type { Order } from "../../data/orders";
import OrderCard from "./OrderCard";

type OrdersListProps = {
  orders: Order[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function OrdersList({
  orders,
  onEdit,
  onDelete,
}: OrdersListProps) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
