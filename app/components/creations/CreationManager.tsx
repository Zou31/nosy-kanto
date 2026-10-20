import { getCreations } from "../../lib/creations";
import CreationCard from "./CreationCard";

export default function CreationManager() {
  const creations = getCreations();
  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#4A2B1A]">
          🌱 Mes créations
        </h2>

        <p className="mt-2 text-neutral-600">
          Ici apparaîtront toutes vos idées et vos prototypes.
        </p>
      </div>

      <div className="space-y-4">
        {creations.map((project) => (
          <CreationCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}
