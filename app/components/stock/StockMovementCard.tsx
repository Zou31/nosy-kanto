import type { StockMovement } from "../../data/stockMovements";
import Card from "../ui/Card";

type StockMovementCardProps = {
  movement: StockMovement;
};

export default function StockMovementCard({
  movement,
}: StockMovementCardProps) {
  return (
    <Card>
      <div className="space-y-2">
        <h3 className="font-bold text-[#4A2B1A]">
          🔁 {movement.productName}
        </h3>
         
         {movement.variantId && (
          <p className="text-xs text-neutral-500">
             Variante : {movement.variantId}
          </p>
)}

        <p className="text-sm font-medium text-neutral-600">
            Type : {movement.type}
        </p>
        
        <p>
          📍 {movement.from} → {movement.to}
        </p>

        <p>
          <strong>Quantité :</strong> {movement.quantity}
        </p>
        {movement.reason && (
  <p>
    📝 {movement.reason}
  </p>
)}

       <p className="text-sm text-neutral-500">
  📅 {movement.date} à {movement.time}
</p>
      </div>
    </Card>
  );
}
