import type { Artisan } from "../../data/artisans";
import ArtisanCard from "./ArtisanCard";

type ArtisansListProps = {
  artisans: Artisan[];
  onEdit: (id: string) => void;
  onToggleActive: (id: string) => void;
};

export default function ArtisansList({
  artisans,
  onEdit,
  onToggleActive,
}: ArtisansListProps) {
  return (
    <div className="space-y-6">
      {artisans.map((artisan) => (
        <ArtisanCard
          key={artisan.id}
          artisan={artisan}
          onEdit={onEdit}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}
