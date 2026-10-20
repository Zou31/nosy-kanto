import type { Artisan } from "../../data/artisans";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";
import CardActions from "../ui/CardActions";
import { getSeedsByArtisanId } from "../../lib/seeds";

type ArtisanCardProps = {
  artisan: Artisan;
  onEdit: (id: string) => void;
  onToggleActive: (id: string) => void;
};

export default function ArtisanCard({
  artisan,
  onEdit,
  onToggleActive,
}: ArtisanCardProps) {
  const artisanSeeds = getSeedsByArtisanId(artisan.id);
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#4A2B1A]">
            👩‍🎨 {artisan.name}
          </h2>

          <p>
            <strong>Spécialité :</strong> {artisan.speciality}
          </p>

          <p>
            <strong>Matières :</strong>{" "}
            {artisan.materials.join(", ")}
          </p>

          <p>
            <strong>Travail :</strong>{" "}
            {artisan.currentWork}
          </p>

          <p className="text-sm text-neutral-600">
            ⏱️ Délai moyen :
            {" "}
            {artisan.averageDelay} jours
          </p>

          <p
            className={`font-medium ${
              artisan.active
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {artisan.active
              ? "🟢 Artisan actif"
              : "🔴 Artisan inactif"}
          </p>
          <div className="pt-3">
  <p className="font-medium text-[#4A2B1A]">
    🌱 Créations :
  </p>

  {artisanSeeds.length > 0 ? (
    <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
      {artisanSeeds.map((seed) => (
        <li key={seed.id}>{seed.name}</li>
      ))}
    </ul>
  ) : (
    <p className="mt-2 text-sm text-neutral-500">
      Aucune graine attribuée.
    </p>
  )}
</div>

        </div>

        <StatusBadge status={artisan.status} />
      </div>

      <CardActions
        onEdit={() => onEdit(artisan.id)}
        onNext={() => onToggleActive(artisan.id)}
        onDelete={() => {}}
      />
    </Card>
  );
}
