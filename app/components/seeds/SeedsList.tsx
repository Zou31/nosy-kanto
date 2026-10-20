
import type { Seed } from "../../data/seeds";
import SeedCard from "./SeedCard";

type SeedsListProps = {
  seeds: Seed[];
  onNextStep: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function SeedsList({
  seeds,
  onNextStep,
  onEdit,
}: SeedsListProps) {
  return (
    <div className="space-y-6">
      {seeds.map((seed) => (
        <SeedCard
          key={seed.id}
          seed={seed}
          onNextStep={onNextStep}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
