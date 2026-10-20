import OrdersManager from "../../components/orders/OrdersManager";
import SectionTitle from "../../components/ui/SectionTitle";

export default function AtelierCommandesPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0] p-8">
      <SectionTitle
        icon="📦"
        title="Commandes de l'Atelier"
      />

      <p className="mt-2 text-neutral-600">
        Les commandes à préparer pour la Maison Nosy Kanto.
      </p>

      <div className="mt-8">
        <OrdersManager />
      </div>
    </main>
  );
}
