import type { Order } from "../../data/orders";
import Card from "../ui/Card";
import CardActions from "../ui/CardActions";

type OrderCardProps = {
  order: Order;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function OrderCard({
  order,
  onEdit,
  onDelete,
}: OrderCardProps) {
  return (
    <Card>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#4A2B1A]">
            📋 Commande #{order.id}
          </h3>

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
            {order.status}
          </span>
        </div>

        <p>
          <strong>Client :</strong> {order.customer}
        </p>

        <p>
          <strong>Date :</strong> {order.date}
        </p>

        <p>
          <strong>Paiement :</strong>{" "}
          {order.paid ? "✅ Payé" : "❌ Non payé"}
        </p>

        <div>
          <strong>Articles :</strong>

          <ul className="mt-2 list-disc pl-5">
            {order.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <CardActions
        onEdit={() => onEdit(order.id)}
        onDelete={() => onDelete(order.id)}
      />
    </Card>
  );
}
