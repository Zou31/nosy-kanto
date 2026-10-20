"use client";

import { useState } from "react";
import type { StockLocation } from "../../data/stock";
import Button from "../ui/Button";

type AdjustStockFormProps = {
  productName: string;
  error?: string;
  onAdjust: (
    location: StockLocation,
    quantity: number,
    reason: string,
    mode: "Ajouter" | "Retirer"
  ) => void;
};

export default function AdjustStockForm({
  productName,
  error,
  onAdjust,
}: AdjustStockFormProps) {
  const [location, setLocation] = useState<StockLocation>("Maison");
  const [mode, setMode] = useState<"Ajouter" | "Retirer">("Ajouter");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (quantity <= 0) return;

    onAdjust(location, quantity, reason, mode);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="font-bold text-[#4A2B1A]">📦 {productName}</p>

      {error && (
        <p className="rounded-xl bg-red-100 p-3 text-sm font-medium text-red-700">
          ⚠️ {error}
        </p>
      )}

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value as StockLocation)}
        className="w-full rounded-xl border p-3"
      >
        <option value="Maison">🏠 Maison</option>
        <option value="Salon">💇 Salon</option>
        <option value="Marché">🏪 Marché</option>
      </select>

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as "Ajouter" | "Retirer")}
        className="w-full rounded-xl border p-3"
      >
        <option value="Ajouter">➕ Ajouter</option>
        <option value="Retirer">➖ Retirer</option>
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full rounded-xl border p-3"
      />

      <input
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Ex : inventaire, casse, erreur de comptage"
        className="w-full rounded-xl border p-3"
      />

      <Button type="submit">⚙️ Valider l’ajustement</Button>
    </form>
  );
}
