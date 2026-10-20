import type { StockItem } from "../../data/stock";
import Card from "../ui/Card";
import Button from "../ui/Button";

type StockCardProps = {
  items: StockItem[];
  onTransfer: (productId: string) => void;
  onSell: (productId: string) => void;
  onOnlineSell: (productId: string) => void;
  onMarketDeparture: (productId: string) => void;
  onMarketReturn: (productId: string) => void;
  onAdjust: (productId: string) => void;
};

export default function StockCard({
  items,
  onTransfer,
  onSell,
  onOnlineSell,
  onMarketDeparture,
  onMarketReturn,
  onAdjust,
}: StockCardProps) {

  const firstItem = items[0];

  if (!firstItem) return null;

  const stockKey = firstItem.variantId
  ? `${firstItem.productId}::${firstItem.variantId}`
  : firstItem.productId;

  const total = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const alertLevel = firstItem.alertLevel;

  const isOutOfStock = total === 0;
  const isLow = total > 0 && total <= alertLevel;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#4A2B1A]">
            📦 {firstItem.name}
          </h3>

         <div className="space-y-1">
  {items.map((item) => (
    <p key={item.id}>
      📍 {item.location} : {item.quantity}
    </p>
  ))}
</div>

          <p className="font-bold">
            📦 Total : {total}
          </p>

          <p className="text-sm text-neutral-600">
            Seuil d’alerte : {alertLevel}
          </p>
        </div>

      <span
  className={`rounded-full px-3 py-1 text-sm font-medium ${
    isOutOfStock
      ? "bg-red-100 text-red-700"
      : isLow
      ? "bg-orange-100 text-orange-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {isOutOfStock
    ? "🔴 Rupture"
    : isLow
    ? "🟠 Stock faible"
    : "🟢 Stock OK"}
</span>

      </div>

      <div className="mt-6 flex gap-2 border-t pt-4">
  <Button onClick={() => onTransfer(stockKey)}>
    🚚 Transférer
  </Button>

<Button onClick={() => onSell(stockKey)}>
  💇 Vente Salon
</Button>

<Button onClick={() => onOnlineSell(stockKey)}>
  🌐 Vente en ligne
</Button>

<Button
  onClick={() => onMarketDeparture(stockKey)}
>
  🛍️ Départ marché
</Button>

<Button onClick={() => onMarketReturn(stockKey)}>
  ↩️ Retour marché
</Button>

<Button onClick={() => onAdjust(stockKey)}>
  ⚙️ Ajuster le stock
</Button>

</div>
    </Card>
  );
}
