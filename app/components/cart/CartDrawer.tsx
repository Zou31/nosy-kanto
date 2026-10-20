"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_PRODUCT_IMAGE } from "../../data/products";
import { useERP } from "../../context/ERPContext";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, totalItems, totalPrice, removeItem, clearCart, updateQty } = useCart();
  const { stock } = useERP();
  const [imgFallback, setImgFallback] = useState<Record<string, boolean>>({});

  const canCheckout = items.length > 0;

  // Escape + lock scroll
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // reset fallback map quand on ferme (optionnel mais clean)
  useEffect(() => {
    if (!open) setImgFallback({});
  }, [open]);

  const handleClear = () => {
    if (!items.length) return;
    const ok = window.confirm("Tu veux vraiment vider le panier ?");
    if (ok) clearCart();
  };

  const lines = useMemo(() => {
  return items.map((item) => {
    const key = `${item.id}-${item.color ?? ""}-${item.size ?? ""}`;
    const img = imgFallback[key]
      ? DEFAULT_PRODUCT_IMAGE
      : item.image || DEFAULT_PRODUCT_IMAGE;

    const unit = Number(item.price) || 0;
    const qty = Math.max(1, Number(item.qty) || 1);

    const availableStock = stock
      .filter(
        (stockItem) =>
          stockItem.productId === item.id &&
          (
            item.variantId
              ? stockItem.variantId === item.variantId
              : true
          )
      )
      .reduce(
        (total, stockItem) =>
          total + stockItem.quantity,
        0
      );

    const lineTotal = unit * qty;

    return {
      item,
      key,
      img,
      unit,
      qty,
      availableStock,
      lineTotal,
    };
  });
}, [items, imgFallback, stock]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Fermer le panier"
        type="button"
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500">Panier</p>
            <h2 className="text-lg font-semibold text-neutral-900">
              {totalItems} article{totalItems > 1 ? "s" : ""}
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="rounded-full p-2 hover:bg-neutral-100"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 border-t border-neutral-200" />

        {/* Items */}
        <div className="mt-4 flex-1 overflow-auto space-y-3">
          {lines.length === 0 ? (
            <p className="text-sm text-neutral-600">Votre panier est vide.</p>
          ) : (
            lines.map(({ item, key, img, unit, qty, availableStock, lineTotal }) => (
              <div key={key} className="rounded-2xl border border-neutral-200 p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-neutral-100 flex-shrink-0">
                    <Image
                      src={img}
                      alt={item.name}
                      fill
                      className="object-contain bg-white p-1"
                      sizes="64px"
                      onError={() => setImgFallback((m) => ({ ...m, [key]: true }))}
                    />
                  </div>

                  {/* Infos */}
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

                        <p className="mt-1 text-xs text-neutral-500">
                          {EUR.format(unit)} / unité
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="text-sm text-neutral-500 hover:text-black underline underline-offset-4"
                        aria-label={`Retirer ${item.name}`}
                      >
                        Retirer
                      </button>
                    </div>

                    {/* Qty */}
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-sm text-neutral-600">Qté</span>

                      <div className="flex items-center rounded-xl border border-neutral-200 overflow-hidden">
                        <button
                          type="button"
                          disabled={item.qty <= 1}
                          onClick={() =>
                           updateQty(
                             item.id,
                             Math.max(1, item.qty - 1),
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
                           disabled={qty >= availableStock}
                           onClick={() =>
                          updateQty(
                             item.id,
                             Math.min(availableStock, qty + 1),
                             item.color,
                             item.size,
                             item.variantId
                            )

                        }
                         className="px-3 py-2 text-sm hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
                         aria-label="Augmenter la quantité"
                        >
                           +
                        </button>

                      </div>

                      <div className="ml-auto text-sm font-semibold text-[#DAA520]">
                        {EUR.format(lineTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 border-t border-neutral-200 pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Total</span>
            <span className="font-semibold text-[#DAA520]">{EUR.format(totalPrice)}</span>
          </div>

          <div className="grid gap-2">
            <Link
              href={canCheckout ? "/commande" : "#"}
              onClick={(e) => {
                if (!canCheckout) {
                  e.preventDefault();
                  return;
                }
                onClose();
              }}
              className={`w-full rounded-xl py-3 text-center text-white transition ${
                canCheckout ? "bg-black hover:bg-neutral-800" : "bg-neutral-300 cursor-not-allowed"
              }`}
              aria-disabled={!canCheckout}
              tabIndex={!canCheckout ? -1 : 0}
            >
              Passer au paiement
            </Link>

            <Link
              href="/panier"
              onClick={onClose}
              className="w-full rounded-xl border border-neutral-200 py-3 text-center text-sm hover:bg-neutral-50 transition"
            >
              Voir le panier
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-neutral-200 py-3 text-center text-sm hover:bg-neutral-50 transition"
            >
              Continuer mes achats
            </button>

            {canCheckout && (
              <button
                type="button"
                onClick={handleClear}
                className="w-full rounded-xl py-2 text-center text-sm text-neutral-500 hover:text-black underline underline-offset-4"
              >
                Vider le panier
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

