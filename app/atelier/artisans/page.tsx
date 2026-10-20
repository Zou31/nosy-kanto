import ArtisansManager from "../../components/artisans/ArtisansManager";
import SectionTitle from "../../components/ui/SectionTitle";

export default function ArtisansPage() {
  return (
    <div>
      <SectionTitle
        icon="👩‍🎨"
        title="Les Artisans"
      />

      <p className="mt-4 text-neutral-600">
        Suivez le travail de vos artisans.
      </p>

      <div className="mt-8">
        <ArtisansManager />
      </div>
    </div>
  );
}
