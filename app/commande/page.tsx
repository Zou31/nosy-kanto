"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { DEFAULT_PRODUCT_IMAGE } from "../data/products";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export default function CommandePage() {
  const { items, totalItems, totalPrice } = useCart();

  // (Simple) infos client — tu brancheras ça plus tard sur une vraie commande
  const [customer, setCustomer] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "France",
  });

  const [deliveryMode, setDeliveryMode] = useState<"relay">("relay");
  const [selectedRelay, setSelectedRelay] = useState<string | null>(null);

  const [shippingWeight, setShippingWeight] = useState<number | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);

  const shippingItems = JSON.stringify(
  items.map(({ id, variantId, qty }) => ({
    id,
    variantId,
    qty,
  }))
);
useEffect(() => {
  if (shippingItems === "[]") {
    setShippingWeight(null);
    setShippingError(null);
    return;
  }

  const controller = new AbortController();

  async function calculateShipping() {
    setShippingWeight(null);
    setShippingError(null);

    try {
      const response = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: JSON.parse(shippingItems), country: customer.country }),
        signal: controller.signal,
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Calcul de livraison impossible.");
      }

      setShippingWeight(result.itemsWeightGrams);
    } catch (error) {
      if (controller.signal.aborted) return;

      setShippingError(
        error instanceof Error ? error.message : "Calcul indisponible."
      );
    }
  }

  void calculateShipping();

  return () => controller.abort();
}, [shippingItems, customer.country]);

  const hasItems = items.length > 0;

  if (!hasItems) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-[#4A2B1A]">Commande</h1>
        <p className="mt-4 text-neutral-600">Ton panier est vide.</p>

        <Link
          href="/boutique"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition"
        >
          Aller à la boutique
        </Link>
      </main>
    );
  }

  const paymentEnabled = false; // PayPal pas encore branché

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4A2B1A]">Finaliser la commande</h1>
          <p className="mt-2 text-sm text-neutral-600">
            {totalItems} article{totalItems > 1 ? "s" : ""} · Total{" "}
            <span className="font-semibold text-[#DAA520]">{EUR.format(totalPrice)}</span>
          </p>
        </div>

        <Link
          href="/panier"
          className="text-sm text-neutral-600 hover:text-black underline underline-offset-4"
        >
          Retour au panier
        </Link>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Colonne gauche */}
        <section className="space-y-10">
          {/* Récap produits */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">Récapitulatif</h2>

            <div className="mt-5 space-y-4">
              {items.map((item) => {
                const key = `${item.id}-${item.color ?? ""}-${item.size ?? ""}`;
                const img = item.image || DEFAULT_PRODUCT_IMAGE;
                const lineTotal = Math.round(Number(item.price) * Number(item.qty) * 100) / 100;

                return (
                  <div key={key} className="flex gap-4 border-b border-neutral-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="h-20 w-20 overflow-hidden rounded-xl bg-neutral-100 flex-shrink-0">
                      <Image
                        src={img}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-neutral-900">{item.name}</p>

                          {(item.color || item.size) && (
                            <p className="mt-1 text-xs text-neutral-500">
                              {item.color ? `Couleur: ${item.color}` : ""}
                              {item.color && item.size ? " · " : ""}
                              {item.size ? `Taille: ${item.size}` : ""}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-neutral-500">
                            {item.qty} × {EUR.format(Number(item.price))}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-[#DAA520]">{EUR.format(lineTotal)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Livraison */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">Infos livraison</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Prénom"
                value={customer.firstName}
                onChange={(v) => setCustomer((c) => ({ ...c, firstName: v }))}
              />
              <Field
                label="Nom"
                value={customer.lastName}
                onChange={(v) => setCustomer((c) => ({ ...c, lastName: v }))}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Email"
                  type="email"
                  value={customer.email}
                  onChange={(v) => setCustomer((c) => ({ ...c, email: v }))}
                />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Adresse"
                  value={customer.address}
                  onChange={(v) => setCustomer((c) => ({ ...c, address: v }))}
                />
              </div>
              <Field
                label="Ville"
                value={customer.city}
                onChange={(v) => setCustomer((c) => ({ ...c, city: v }))}
              />
              <Field
                label="Code postal"
                value={customer.zip}
                onChange={(v) => setCustomer((c) => ({ ...c, zip: v }))}
              />
              <div className="sm:col-span-2">
  <label className="block">
    <span className="text-xs font-medium text-neutral-700">
      Pays de livraison
    </span>

    <select
      value={customer.country}
      onChange={(e) =>
        setCustomer((c) => ({
          ...c,
          country: e.target.value,
        }))
      }
      className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:border-black"
    >
      <option value="France">France métropolitaine</option>
    </select>
  </label>
</div>

            </div>
            <div className="sm:col-span-2">
  <p className="text-xs font-medium text-neutral-700">
    Mode de livraison
  </p>

  <div className="mt-2 grid gap-3 sm:grid-cols-2">

    <label className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 cursor-pointer">
      <input
        type="radio"
        name="deliveryMode"
        checked={deliveryMode === "relay"}
        onChange={() => setDeliveryMode("relay")}
      />
      <span className="text-sm">📦 Mondial Relay — Point Relais ou Locker</span>
    </label>
  </div>

  <p className="mt-2 text-xs text-neutral-500">
    Les transporteurs, points relais et tarifs disponibles
    seront proposés avant le paiement.
  </p>
  {selectedRelay && (
  <p className="mt-3 text-sm text-green-700">
    Point Relais sélectionné : {selectedRelay}
  </p>
)}
</div>

            <p className="mt-4 text-xs text-neutral-500">
              (Pour l’instant ces infos ne sont pas enregistrées — on le branchera quand on mettra le paiement.)
            </p>
          </div>
        </section>

        {/* Colonne droite */}
        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Paiement</h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Sous-total</span>
              <span className="font-medium">{EUR.format(totalPrice)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Livraison</span>
              <span className="font-medium">À calculer</span>
            </div>
            {shippingError && (
  <p className="text-xs text-red-600">
    {shippingError}
  </p>
)}
{shippingWeight !== null && (
  <p className="text-xs text-neutral-500">
    Poids des articles : {shippingWeight} g
  </p>
)}

            <div className="border-t border-neutral-200 pt-3 mt-3 flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-semibold text-[#DAA520]">
                {EUR.format(totalPrice)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={!paymentEnabled}
            className="mt-6 w-full rounded-xl bg-black py-3 text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={() => {
              // TODO: brancher PayPal ici
              alert("Paiement pas encore branché 🙂");
            }}
          >
            Passer au paiement
          </button>

          {!paymentEnabled && (
            <p className="mt-3 text-xs text-neutral-500">
              Paiement en préparation (PayPal). On active ça une fois le site bien propre.
            </p>
          )}

          <Link
            href="/boutique"
            className="mt-4 block text-center text-sm text-neutral-700 hover:text-[#DAA520] underline underline-offset-4"
          >
            Continuer vos achats
          </Link>
        </aside>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-neutral-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:border-black"
      />
    </label>
  );
}

