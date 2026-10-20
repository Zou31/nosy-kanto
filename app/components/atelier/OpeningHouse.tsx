import { DASHBOARD } from "../../data/dashboard";
import InfoCard from "../ui/InfoCard";
import Card from "../ui/Card";

export default function OpeningHouse() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-4xl font-bold text-[#4A2B1A]">
          🏡 La Maison Nosy Kanto
        </h1>

        <p className="mt-3 text-neutral-600">
          Bonjour Fabienne 👋
        </p>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {DASHBOARD.slice(1, 4).map((card) => (
          <InfoCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            message={card.message}
          />
        ))}
      </div>
    </div>
  );
}
