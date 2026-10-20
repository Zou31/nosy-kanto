import type { Seed } from "../../data/seeds";
import Card from "../ui/Card";
import CardActions from "../ui/CardActions";
import StatusBadge from "../ui/StatusBadge";
import { getArtisanById } from "../../lib/artisans";

type SeedCardProps = {
  seed: Seed;
  onNextStep: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function SeedCard({
  seed,
  onNextStep,
  onEdit,
}: SeedCardProps) {
  const artisan = getArtisanById(seed.artisanId);

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#4A2B1A]">
            🌱 {seed.name}
          </h2>

          <p className="text-sm text-neutral-600">
            📁 Collection : <strong>{seed.collection}</strong>
          </p>

          <p className="text-sm text-neutral-600">
            📅 Créée le : <strong>{seed.createdAt}</strong>
          </p>

          <p className="text-neutral-700">
            ❤️ {seed.story || "Histoire à compléter..."}
          </p>

          <p className="text-neutral-700">
            👩‍🎨 Artisan :{" "}
            <strong>{artisan?.name ?? "Non attribué"}</strong>
          </p>


          <div className="flex gap-4 text-sm mt-3">
            <span>
              ✏️ {seed.drawing ? "Dessin ✔" : "Dessin ✖"}
            </span>

            <span>
              🧵 {seed.prototype ? "Prototype ✔" : "Prototype ✖"}
            </span>

            <span>
              📸 {seed.photos} photo(s)
            </span>
          </div>
        </div>

        <StatusBadge status={seed.status} />
      </div>

      <CardActions
        onEdit={() => onEdit(seed.id)}
        onNext={() => onNextStep(seed.id)}
        onDelete={() => console.log("Supprimer", seed.id)}
      />
    </Card>
  );
}
