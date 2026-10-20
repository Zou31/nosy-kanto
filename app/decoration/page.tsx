
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useERP } from "../context/ERPContext";
import { DEFAULT_PRODUCT_IMAGE } from "../data/products";

type FiltreDecoration = "tout" | "interieur" | "exterieur";

function normaliser(value: string | undefined | null) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export default function DecorationPage() {
  const { products } = useERP();
  const [filtre, setFiltre] = useState<FiltreDecoration>("tout");

  const decorations = products.filter(
    (product) =>
      product.status === "En vente" &&
      product.category === "Décoration"
  );

  const produitsAffiches = decorations.filter((product) => {
    if (filtre === "tout") return true;

    const collection = normaliser(product.collection);

    return filtre === "interieur"
      ? collection === "interieur"
      : collection === "exterieur";
  });

  const filtres: { id: FiltreDecoration; label: string }[] = [
    { id: "tout", label: "Tout voir" },
    { id: "interieur", label: "Intérieur" },
    { id: "exterieur", label: "Extérieur" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
        Nosy Kanto
      </p>

      <h1 className="mt-3 text-4xl font-bold text-[#4A2B1A] md:text-5xl">
        Décoration artisanale de Madagascar
      </h1>

      <p className="mt-5 max-w-3xl leading-relaxed text-neutral-600">
        Découvrez notre sélection de décorations artisanales
        pour l'intérieur et l'extérieur : créations en métal,
        bois et matières naturelles, inspirées de Madagascar.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        {filtres.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setFiltre(option.id)}
            aria-pressed={filtre === option.id}
            className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
              filtre === option.id
                ? "bg-[#4A2B1A] text-white"
                : "border border-[#D8CBBE] bg-white text-[#4A2B1A] hover:bg-[#F8F4EE]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {produitsAffiches.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-[#FFFCF7] px-6 py-12 text-center">
          <h2 className="text-xl font-semibold text-[#4A2B1A]">
            Nos créations arrivent bientôt
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            De nouvelles pièces de décoration artisanale
            seront prochainement disponibles.
          </p>
          <Link
            href="/boutique"
            className="mt-6 inline-block text-sm font-semibold text-[#4A2B1A] underline underline-offset-4"
          >
            Découvrir la boutique
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {produitsAffiches.map((product) => {
            const image =
              product.variants?.[0]?.image ||
              product.image ||
              DEFAULT_PRODUCT_IMAGE;

            return (
              <Link
                key={product.id}
                href={`/produit/${product.slug}`}
                className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-72 bg-[#FFFCF7]">
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                    {product.collection || "Décoration"}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-[#4A2B1A]">
                    {product.name}
                  </h2>

                  {product.short && (
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {product.short}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-lg font-bold text-[#B8860B]">
                      {EUR.format(product.price)}
                    </span>
                    <span className="text-sm font-semibold text-[#4A2B1A] group-hover:text-[#DAA520]">
                      Découvrir →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}


