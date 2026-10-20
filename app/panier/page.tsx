"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { DEFAULT_PRODUCT_IMAGE } from "../data/products";

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export default function PanierPage() {
  const { items, totalItems, totalPrice, removeItem, clearCart, updateQty } =
    useCart();

  const hasItems = items.length > 0;

  const handleClear = () => {
    if (!hasItems) return;
    const ok = window.confirm("Tu veux vraiment vider le panier ?");
    if (ok) clearCart();
  };

  if (!hasItems) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-[#4A2B1A]">Panier</h1>
        <p className="mt-4 text-neutral-600">Votre panier est vide pour le moment.</p>

        <Link
          href="/boutique"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition"
        >
          Retourner à la boutique
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4A2B1A]">Panier</h1>
          <p className="mt-2 text-sm text-neutral-600">
            {totalItems} article{totalItems > 1 ? "s" : ""} dans votre panier
          </p>
        </div>

        <button
          onClick={handleClear}
          className="text-sm text-neutral-600 hover:text-black underline underline-offset-4"
          type="button"
        >
          Vider le panier
        </button>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Liste items */}
        <div className="space-y-4">
          {items.map((item) => {
            const lineKey = `${item.id}-${item.color ?? ""}-${item.size ?? ""}`;
            const unitPrice = Number(item.price) || 0;
            const qty = Number(item.qty) || 1;
            const lineTotal = Math.round(unitPrice * qty * 100) / 100;

            return (
              <div
                key={lineKey}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {/* Image */}
                  <div className="h-20 w-20 rounded-xl bg-neutral-100 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || DEFAULT_PRODUCT_IMAGE}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                      
                    />
                  </div>

                  {/* Infos */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-neutral-900">
                          {item.name}
                        </p>

                        {(item.color || item.size) && (
                          <p className="mt-1 text-xs text-neutral-500">
                            {item.color ? `Couleur: ${item.color}` : ""}
                            {item.color && item.size ? " · " : ""}
                            {item.size ? `Taille: ${item.size}` : ""}
                          </p>
                        )}

                        <p className="mt-2 text-sm text-neutral-700">
                          {EUR.format(unitPrice)}{" "}
                          <span className="text-neutral-400">/ unité</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#DAA520]">
                          {EUR.format(lineTotal)}
                        </p>

                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="mt-2 text-sm text-neutral-600 hover:text-black underline underline-offset-4"
                          type="button"
                          aria-label={`Retirer ${item.name}`}
                        >
                          Retirer
                        </button>
                      </div>
                    </div>

                    {/* Quantité */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-sm text-neutral-600">Qté</span>

                      <div className="flex items-center rounded-xl border border-neutral-200 overflow-hidden">
                        <button
                          type="button"
                          disabled={qty <= 1}
                          onClick={() =>
                            updateQty(
                              item.id,
                              Math.max(1, qty - 1),
                              item.color,
                              item.size,
                              item.variantId
                            )
                          }
                          className="px-3 py-2 text-sm hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Diminuer la quantité"
                        >
                          −
                        </button>

                        <span className="px-4 py-2 text-sm">{qty}</span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQty(
                              item.id,
                              qty + 1,
                              item.color,
                              item.size,
                              item.variantId
                            )
                          }
                          className="px-3 py-2 text-sm hover:bg-neutral-50"
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Résumé */}
        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Résumé</h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Sous-total</span>
              <span className="font-medium">{EUR.format(totalPrice)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Livraison</span>
              <span className="font-medium">Calculée au paiement</span>
            </div>

            <div className="border-t border-neutral-200 pt-3 mt-3 flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-semibold text-[#DAA520]">
                {EUR.format(totalPrice)}
              </span>
            </div>
          </div>

          <Link
            href="/commande"
            className="mt-6 block w-full rounded-xl bg-black py-3 text-center text-white hover:bg-neutral-800 transition"
          >
            Passer au paiement
          </Link>

          <Link
            href="/boutique"
            className="mt-3 block text-center text-sm text-neutral-700 hover:text-[#DAA520] underline underline-offset-4"
          >
            Continuer vos achats
          </Link>
        </aside>
      </div>
    </main>
  );
}



