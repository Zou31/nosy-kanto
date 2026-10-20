"use client";

import { useState } from "react";
import Button from "../ui/Button";

type SellStockFormProps = {
  productName: string;
  error?: string;
  onSell: (
    quantity: number,
    reason: string
  ) => void;
};

export default function SellStockForm({
  productName,
  error,
  onSell,
}: SellStockFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (quantity <= 0) return;

    onSell(quantity, reason);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <p className="font-bold text-[#4A2B1A]">
        📦 {productName}
      </p>
      {error && (
  <p className="rounded-xl bg-red-100 p-3 text-sm font-medium text-red-700">
    ⚠️ {error}
  </p>
)}

      <div>
        <label className="mb-1 block font-medium">
          Quantité
        </label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(event) =>
            setQuantity(Number(event.target.value))
          }
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Motif
        </label>

        <input
          value={reason}
          onChange={(event) =>
            setReason(event.target.value)
          }
          placeholder="Ex : Cliente Morgane"
          className="w-full rounded-xl border p-3"
        />
      </div>

      <Button type="submit">
        💇 Valider la vente
      </Button>
    </form>
  );
}
