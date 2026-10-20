import ProductsManager from "../../components/products/ProductsManager";

export default function ProduitsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-[#4A2B1A]">
        📦 Produits
      </h1>

      <p className="text-neutral-600">
        Catalogue des produits Nosy Kanto.
      </p>

      <div className="mt-8">
  <ProductsManager />
</div>

    </section>
  );
}
