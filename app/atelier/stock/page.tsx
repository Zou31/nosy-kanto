import StockManager from "../../components/stock/StockManager";
import SectionTitle from "../../components/ui/SectionTitle";

export default function StockPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0] p-8">
      <SectionTitle icon="📦" title="Stock" />

      <p className="mt-2 text-neutral-600">
        Suivez les stocks Maison et Salon.
      </p>

      <div className="mt-8">
        <StockManager />
      </div>
    </main>
  );
}
