import DashboardCard from "./DashboardCard";

type DashboardCardsProps = {
  totalStock: number;
  totalProducts: number;
  lowStockCount: number;
};

export default function DashboardCards({
  totalStock,
  totalProducts,
  lowStockCount,
}: DashboardCardsProps) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <DashboardCard
        title="Quantité totale"
        value={totalStock}
      />

      <DashboardCard
        title="Références produits"
        value={totalProducts}
      />

      <DashboardCard
        title="Stocks en alerte"
        value={lowStockCount}
        valueClassName="text-red-600"
      />
    </div>
  );
}
