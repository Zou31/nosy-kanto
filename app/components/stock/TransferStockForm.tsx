"use client";

import { useState } from "react";
import type { StockLocation } from "../../data/stock";
import Button from "../ui/Button";

type TransferStockFormProps = {
  productName: string;
  error?: string;
  locations: StockLocation[];
  onTransfer: (
    from: StockLocation,
    to: StockLocation,
    quantity: number,
    reason: string
  ) => void;
};

export default function TransferStockForm({
  productName,
  error,
  locations,
  onTransfer,
}: TransferStockFormProps) {
  const [from, setFrom] = useState<StockLocation>(
  locations[0] ?? ""
);

const [to, setTo] = useState<StockLocation>(
  locations[1] ?? locations[0] ?? ""
);

  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (from === to) return;
    if (quantity <= 0) return;

    onTransfer(from, to, quantity, reason);
  }

  const canTransfer =
  locations.length >= 2 &&
  from !== "" &&
  to !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="font-bold text-[#4A2B1A]">📦 {productName}</p>

      {error && (
        <p className="rounded-xl bg-red-100 p-3 text-sm font-medium text-red-700">
          ⚠️ {error}
        </p>
      )}

      <div>
        <label className="mb-1 block font-medium">De</label>
        <select value={from} onChange={(e) => setFrom(e.target.value as StockLocation)} className="w-full rounded-xl border p-3">
          {locations.map((location) => (
             <option key={location} value={location}>
            📍 {location}
             </option>
       ))}

        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">Vers</label>
        <select value={to} onChange={(e) => setTo(e.target.value as StockLocation)} className="w-full rounded-xl border p-3">
          {locations.map((location) => (
            <option key={location} value={location}>
            📍 {location}
            </option>
        ))}

        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">Quantité</label>
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full rounded-xl border p-3" />
      </div>

      <div>
        <label className="mb-1 block font-medium">Motif</label>
        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ex : Réassort salon" className="w-full rounded-xl border p-3" />
      </div>

      <Button
  type="submit"
  disabled={!canTransfer}
>
  🚚 Valider le transfert
</Button>
    </form>
  );
}
