import SeedsManager from "../../components/seeds/SeedsManager";
import SectionTitle from "../../components/ui/SectionTitle";

export default function SeedsPage() {
  return (
    <div>
      <SectionTitle
        icon="🌱"
        title="Les Graines"
      />

      <p className="mt-4 text-neutral-600">
        Toutes les idées et futures créations Nosy Kanto.
      </p>

      <div className="mt-8">
        <SeedsManager />
      </div>
    </div>
  );
}
