"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function CommandeSuccessPage() {
  const { clearCart } = useCart();

  // Quand on arrivera ici après paiement, on vide le panier proprement
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-[#4A2B1A]">Merci ✨</h1>

      <p className="mt-3 text-neutral-600">
        Ton paiement a été confirmé et ta commande est enregistrée.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/boutique"
          className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition"
        >
          Retour à la boutique
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
        >
          Retour accueil
        </Link>
      </div>

      <p className="mt-6 text-xs text-neutral-400">
        (Plus tard on mettra aussi un numéro de commande + email de confirmation.)
      </p>
    </main>
  );
}

