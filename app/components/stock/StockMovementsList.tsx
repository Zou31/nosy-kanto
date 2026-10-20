import type { StockMovement } from "../../data/stockMovements";
import StockMovementCard from "./StockMovementCard";

type StockMovementsListProps = {
  movements: StockMovement[];
};

export default function StockMovementsList({
  movements,
}: StockMovementsListProps) {
  if (movements.length === 0) {
    return (
      <p className="rounded-xl border border-dashed p-6 text-center text-neutral-500">
        Aucun mouvement de stock pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {movements.map((movement) => (
        <StockMovementCard
          key={movement.id}
          movement={movement}
        />
      ))}
    </div>
  );
}
