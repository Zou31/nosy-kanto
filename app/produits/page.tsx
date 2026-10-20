import ProductsManager from "../components/products/ProductsManager";
import SectionTitle from "../components/ui/SectionTitle";

export default function ProduitsPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0] px-4 py-6 md:p-8">
      <SectionTitle icon="📦" title="Produits" />

      <p className="mt-3 text-sm text-neutral-600 md:text-base">
        Gérez les références, variantes, prix et informations de stock de Nosy Kanto.
      </p>

      <section className="mt-8" aria-label="Gestion des produits">
        <ProductsManager />
      </section>
    </main>
  );
}
