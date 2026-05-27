"use client";

import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../data/products";

export default function Products() {
  return (
    <section className="py-12">
      {/* Titre section */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link
  href="/bijoux-kanto"
  className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700 hover:bg-amber-200 transition"
>
  Nouveautés
</Link>

          <h2 className="mt-2 text-2xl font-bold text-[#4A2B1A]">
            Sélection du moment
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Quelques pièces choisies pour découvrir l&apos;univers Nosy Kanto.
          </p>
        </div>

        <Link
          href="/boutique"
          className="hidden text-sm font-medium text-[#4A2B1A] underline-offset-4 hover:text-[#DAA520] hover:underline sm:inline-block"
        >
          Voir toute la boutique →
        </Link>
      </div>

      {/* Grille produits */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.filter((product) =>
          ["vanille_16cm", "vanille_14cm", "sac_kanto_terra"].includes(product.id)
        ).map((product) => (
          <Link
            key={product.slug}
            href={`/produit/${product.slug}`}
            className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative overflow-hidden">
              <Image
                 src={product.image}
                 alt={product.name}
                 width={400}
                 height={500}
                 className="h-44 w-full object-contain bg-white p-4 sm:h-64"
               /> 

              {product.imageHover && (
                <Image
              src={product.imageHover}
            alt={product.name}
          width={400}
          height={500}
          className="absolute inset-0 h-44 w-full object-contain bg-white p-4 sm:h-64 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        )}
            </div>

            <div className="p-4">
              <h3 className="text-base font-semibold text-neutral-900 group-hover:text-[#DAA520]">
                {product.name}
              </h3>
              <p className="mt-2 text-lg font-semibold text-[#DAA520]">
                {product.price.toFixed(2).replace(".",",")} €
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Série limitée · Artisanat fait main
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Bouton mobile */}
      <div className="mt-6 sm:hidden">
        <Link
          href="/boutique"
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
        >
          Voir toute la boutique
        </Link>
      </div>
    </section>
  );
}


