import type { StockItem } from "../../data/stock";
import StockCard from "./StockCard";

type StockListProps = {
  stock: StockItem[];
  onTransfer: (productId: string) => void;
  onSell: (productId: string) => void;
  onOnlineSell: (productId: string) => void;
  onMarketDeparture: (productId: string) => void;
  onMarketReturn: (productId: string) => void;
  onAdjust: (productId: string) => void;
};

export default function StockList({
  stock,
  onTransfer,
  onSell,
  onOnlineSell,
  onMarketDeparture,
  onMarketReturn,
  onAdjust,
}: StockListProps) {
  const stockKeys = Array.from(
  new Set(
    stock.map((item) =>
      item.variantId
        ? `${item.productId}::${item.variantId}`
        : item.productId
    )
  )
);

  return (
    <div className="space-y-6">
     {stockKeys.map((stockKey) => {
        const items = stock.filter((item) => {
  const itemKey = item.variantId
    ? `${item.productId}::${item.variantId}`
    : item.productId;

  return itemKey === stockKey;
});

        return (
       <StockCard
  key={stockKey}
  items={items}
  onTransfer={onTransfer}
  onSell={onSell}
  onOnlineSell={onOnlineSell}
  onMarketDeparture={onMarketDeparture}
  onMarketReturn={onMarketReturn}
  onAdjust={onAdjust}
/>
        );
      })}
    </div>
  );
}
