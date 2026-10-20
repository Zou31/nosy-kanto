"use client";

import { useState } from "react";
import Button from "../ui/Button";
import type { OrderFormData } from "../../types/orderForms";

type OrderFormProps = {
  onCreate: (data: OrderFormData) => void;
  initialData?: OrderFormData;
};

export default function OrderForm({
  onCreate,
  initialData,
}: OrderFormProps) {
  const [customer, setCustomer] = useState(initialData?.customer ?? "");
  const [customerEmail, setCustomerEmail] = useState(initialData?.customerEmail ?? "");
  const [items, setItems] = useState(initialData?.items ?? "");
  const [total, setTotal] = useState(initialData?.total ?? 0);
  const [status, setStatus] = useState<OrderFormData["status"]>(
    initialData?.status ?? "À préparer"
  );
  const [paid, setPaid] = useState(initialData?.paid ?? false);

  return (
    <div className="space-y-4">
      <input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Client" className="w-full rounded-xl border p-3" />

      <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Email client" className="w-full rounded-xl border p-3" />

      <textarea value={items} onChange={(e) => setItems(e.target.value)} placeholder="Produits commandés" rows={4} className="w-full rounded-xl border p-3" />

      <input type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} placeholder="Total" className="w-full rounded-xl border p-3" />

      <select value={status} onChange={(e) => setStatus(e.target.value as OrderFormData["status"])} className="w-full rounded-xl border p-3">
        <option>À préparer</option>
        <option>Prête</option>
        <option>Expédiée</option>
        <option>Livrée</option>
        <option>Annulée</option>
      </select>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
        Payée
      </label>

      <Button
        onClick={() => {
          if (!customer.trim()) return;
          onCreate({ customer, customerEmail, items, total, status, paid });
        }}
      >
        {initialData ? "💾 Enregistrer" : "📋 Créer la commande"}
      </Button>
    </div>
  );
}
