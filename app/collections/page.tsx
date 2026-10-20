"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useERP } from "../context/ERPContext";

export default function CollectionsPage() {
      const { products } = useERP();

    const [categorieActive, setCategorieActive] = useState<
  "sacs" | "accessoires" | "bijoux"
>("sacs");

  const collectionProducts = products.filter(
    (product) =>
      product.status === "En vente" &&
      product.category === "Sacs & accessoires"
  );

  const sacsKanto = collectionProducts.filter((product) =>
  product.referenceCode?.startsWith("NK-SAC-")
);

const accessoiresKanto = collectionProducts.filter((product) =>
  product.referenceCode?.startsWith("NK-ACC-")
);

const bijouxKanto = products.filter(
  (product) =>
    product.status === "En vente" &&
    product.category === "Bijoux" &&
    product.collection === "Azary"
);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
        Nosy Kanto
      </p>

      <h1 className="mt-3 text-4xl font-bold text-[#4A2B1A] md:text-5xl">
        Collections Kanto
      </h1>

      <p className="mt-5 max-w-2xl text-neutral-600 leading-relaxed">
        Découvrez les sacs et accessoires Nosy Kanto : des créations imaginées pour la marque, inspirées de Madagascar et réalisées avec un savoir-faire artisanal. 
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
  <button
    type="button"
    onClick={() => setCategorieActive("sacs")}
    className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
      categorieActive === "sacs"
        ? "bg-[#4A2B1A] text-white"
        : "border border-[#D8CBBE] bg-white text-[#4A2B1A] hover:bg-[#F8F4EE]"
    }`}
  >
    Sacs Kanto ({sacsKanto.length})
  </button>

  <button
    type="button"
    onClick={() => setCategorieActive("accessoires")}
    className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
      categorieActive === "accessoires"
        ? "bg-[#4A2B1A] text-white"
        : "border border-[#D8CBBE] bg-white text-[#4A2B1A] hover:bg-[#F8F4EE]"
    }`}
  >
    Accessoires Kanto ({accessoiresKanto.length})
  </button>

  <button
  type="button"
  onClick={() => setCategorieActive("bijoux")}
  className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
    categorieActive === "bijoux"
      ? "bg-[#4A2B1A] text-white"
      : "border border-[#D8CBBE] bg-white text-[#4A2B1A] hover:bg-[#F8F4EE]"
  }`}
>
  Bijoux Kanto ({bijouxKanto.length})
</button>

</div>

     {categorieActive === "sacs" && (
  <div className="mt-12 grid gap-8 md:grid-cols-2">
    {sacsKanto.map((collection) => (

          <Link
  key={collection.id}
  href={`/produit/${collection.slug}`}
  className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
>
  <div className="relative h-72 bg-[#FFFCF7]">
    <Image
      src={collection.variants?.[0]?.image || collection.image}
      alt={collection.name}
      fill
      className="object-contain p-8 transition duration-500 group-hover:scale-[1.04]"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>

  <div className="p-6">
    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
      Collection Kanto
    </p>

    <h2 className="mt-2 text-2xl font-bold text-[#4A2B1A]">
      {collection.name}
    </h2>

    {collection.short && (
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        {collection.short}
      </p>
    )}

    <div className="mt-6 flex items-center justify-between gap-4">
      <p className="text-lg font-bold text-[#B8860B]">
        {collection.price.toFixed(2).replace(".", ",")} €
      </p>

      <span className="text-sm font-semibold text-[#4A2B1A] transition group-hover:text-[#DAA520]">
        Découvrir →
      </span>
    </div>
  </div>
</Link>

        ))}
      </div>
      )} 

              {categorieActive === "accessoires" && accessoiresKanto.length > 0 && (
       <section className="mt-12">
          <div className="grid gap-8 md:grid-cols-2">

            {accessoiresKanto.map((collection) => (
              <Link
                key={collection.id}
                href={`/produit/${collection.slug}`}
                className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-72 bg-[#FFFCF7]">
                  <Image
                    src={collection.variants?.[0]?.image || collection.image}
                    alt={collection.name}
                    fill
                    className="object-contain p-8 transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                    Accessoire Kanto
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-[#4A2B1A]">
                    {collection.name}
                  </h3>

                  {collection.short && (
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {collection.short}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-lg font-bold text-[#B8860B]">
                      {collection.price.toFixed(2).replace(".", ",")} €
                    </p>

                    <span className="text-sm font-semibold text-[#4A2B1A] transition group-hover:text-[#DAA520]">
                      Découvrir →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {categorieActive === "bijoux" && bijouxKanto.length > 0 && (
  <section className="mt-12">
    <div className="grid gap-8 md:grid-cols-2">
      {bijouxKanto.map((collection) => (
        <Link
          key={collection.id}
          href={`/produit/${collection.slug}`}
          className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative h-72 bg-[#FFFCF7]">
  {collection.variants?.[0]?.image || collection.image ? (
    <Image
      src={collection.variants?.[0]?.image || collection.image}
      alt={collection.name}
      fill
      className="object-contain p-8 transition duration-500 group-hover:scale-[1.04]"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  ) : (
    <div className="flex h-full items-center justify-center p-6 text-center text-sm text-neutral-400">
      Photo à venir
    </div>
  )}
</div>

          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Collection Azary
            </p>

            <h3 className="mt-2 text-2xl font-bold text-[#4A2B1A]">
              {collection.name}
            </h3>

            {collection.short && (
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {collection.short}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-lg font-bold text-[#B8860B]">
                {collection.price.toFixed(2).replace(".", ",")} €
              </p>

              <span className="text-sm font-semibold text-[#4A2B1A] transition group-hover:text-[#DAA520]">
                Découvrir →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}
    </main>
  );
}
