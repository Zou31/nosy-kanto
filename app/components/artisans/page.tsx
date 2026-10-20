import SectionTitle from "../../components/ui/SectionTitle";
import ArtisansManager from "../../components/artisans/ArtisansManager";

export default function ArtisansPage() {
  return (
    <div>
      <SectionTitle
        icon="👩‍🎨"
        title="Les Artisans"
      />

      <p className="mt-4 text-neutral-600">
        Tous les artisans partenaires de Nosy Kanto.
      </p>

      <div className="mt-8">
        <ArtisansManager />
      </div>
    </div>
  );
}
