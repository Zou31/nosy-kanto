"use client";

import Link from "next/link";
import Image from "next/image";
import { useERP } from "../../context/ERPContext";

export default function Products() {

const { products } = useERP();

  return (
    <section className="py-12">
      {/* Titre section */}
      <div className="relative mb-9 text-center">
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
    Nos coups de cœur
  </p>

  <h2 className="mt-3 text-3xl font-bold text-[#4A2B1A] md:text-4xl">
    Sélection du moment
  </h2>

  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-600">
    Quelques pièces choisies pour découvrir l&apos;univers Nosy Kanto.
  </p>

 <Link
  href="/boutique"
  className="mt-4 inline-flex text-sm font-semibold text-[#4A2B1A] transition hover:text-[#DAA520]"
>
  Voir toute la boutique →
</Link>

</div>

      {/* Grille produits */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
       {products
  .filter(
    (product) =>
      product.status === "En vente" &&
      [
  "NK-SAC-TERRA",
  "NK-ACC-KELY-SISAL",
  "NK-EPI-VAN-16",
].includes(product.referenceCode ?? "")

  )
  .map((product) => (

         <Link
  key={product.slug}
  href={`/produit/${product.slug}`}
  className="group block overflow-hidden rounded-[24px] border border-[#E8DED2] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  {/* Photo */}
  <div className="relative aspect-[3/2] overflow-hidden bg-[#F8F4EE]">
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-contain p-5 transition duration-500 group-hover:scale-[1.03]"
      sizes="(max-width: 640px) 100vw, 33vw"
    />

    {product.imageHover && (
      <Image
        src={product.imageHover}
        alt={product.name}
        fill
        className="object-contain p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
    )}

    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4A2B1A] shadow-sm">
      {product.category}
    </div>
  </div>

  {/* Informations */}
  <div className="p-5">
    <h3 className="text-lg font-semibold leading-snug text-[#4A2B1A] transition group-hover:text-[#DAA520]">
      {product.name}
    </h3>

    {product.short && (
      <p className="mt-2 line-clamp-2 text-sm leading-5 text-neutral-500">
        {product.short}
      </p>
    )}

    <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#EEE6DD] pt-4">
      <p className="text-xl font-bold text-[#B8860B]">
        {product.price.toFixed(2).replace(".", ",")} €
      </p>

      <span className="text-sm font-semibold text-[#4A2B1A] transition group-hover:text-[#DAA520]">
        Découvrir →
      </span>
    </div>
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


