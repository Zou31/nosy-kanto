"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useERP } from "../context/ERPContext";

type Famille = "Vanille" | "Poivres" | "Épices" | "Miels";

export default function SaveursClient() {
  const { products } = useERP();

  const [familleActive, setFamilleActive] = useState<Famille>("Vanille");

  const saveurs = products.filter(
    (product) =>
      product.status === "En vente" &&
      product.category === "Épices"
  );

  const produitsAffiches = saveurs.filter(
  (product) =>
    product.collection
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase() ===
    familleActive
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase()
);

  const familles: Famille[] = [
    "Vanille",
    "Poivres",
    "Épices",
    "Miels",
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 overflow-hidden rounded-3xl bg-[#F8F3E9]">
  <div className="grid items-center md:grid-cols-2">
    <div className="p-8 md:p-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
        Saveurs de Madagascar
      </p>

      <h1 className="mt-4 text-4xl font-bold leading-tight text-[#4A2B1A] md:text-5xl">
        Les parfums authentiques de Madagascar
      </h1>

      <p className="mt-6 max-w-lg leading-relaxed text-neutral-600">
        Vanille Bourbon, poivres, épices et miels : découvrez une sélection
        de saveurs malgaches choisies pour leur caractère et leurs arômes.
      </p>

      <a
        href="#saveurs"
        className="mt-8 inline-flex rounded-full bg-[#DAA520] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-[#c79212]"
      >
        Découvrir les saveurs
      </a>
    </div>

    <div className="relative min-h-[420px]">
      <img
        src="/images/nosykanto/univers-saveurs.png"
        alt="Saveurs de Madagascar"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </div>
</div>

<div className="mb-6">
  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
    Notre sélection
  </p>

  <h2 className="mt-2 text-3xl font-bold text-[#4A2B1A]">
    Découvrez nos saveurs
  </h2>

  <p className="mt-3 max-w-2xl text-neutral-600">
    Explorez les différentes saveurs de Madagascar et choisissez la collection
    que vous souhaitez découvrir.
  </p>
</div>

     <div
  id="saveurs"
  className="mb-10 scroll-mt-8 flex flex-wrap gap-3"
>

        {familles.map((famille) => (
          <button
            key={famille}
            type="button"
            onClick={() => setFamilleActive(famille)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              familleActive === famille
                ? "bg-[#4A2B1A] text-white"
                : "bg-[#F8F3E9] text-[#4A2B1A] hover:bg-[#efe4d1]"
            }`}
          >
            {famille}
          </button>
        ))}
      </div>

      {produitsAffiches.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produitsAffiches.map((product) => (
            <Link
              key={product.id}
              href={`/produit/${product.slug}`}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-4">
                <p className="text-[11px] uppercase tracking-widest text-neutral-500">
                  {product.collection}
                </p>

                <h2 className="mt-1 text-base font-semibold text-neutral-900 group-hover:text-[#DAA520]">
                  {product.name}
                </h2>

                {product.short && (
                  <p className="mt-2 text-sm text-neutral-500">
                    {product.short}
                  </p>
                )}

                <p className="mt-3 text-lg font-semibold text-[#DAA520]">
                  {product.price.toFixed(2).replace(".", ",")} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#F8F3E9] px-6 py-12 text-center">
          <p className="font-semibold text-[#4A2B1A]">
            Cette sélection arrive bientôt.
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            Nos nouvelles saveurs de Madagascar sont en préparation.
          </p>
        </div>
      )}
    </main>
  );
}
