import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PRODUCTS } from "../data/products";

export const metadata: Metadata = {
  title: "Bijoux Kanto",
  description:
    "Bijoux Kanto : créations exclusives Nosy Kanto en acier inoxydable et pierres naturelles, faites main à Madagascar.",
};

export default function BijouxKantoPage() {
  const bijouxKanto = PRODUCTS.filter((product) =>
    product.tags.includes("bijoux nosy kanto")
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 overflow-hidden rounded-3xl bg-[#F8F3E9]">
  <div className="grid items-center gap-8 md:grid-cols-2">
    
    <div className="p-8 md:p-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
        Bijoux Kanto
      </p>

      <h1 className="mt-4 text-4xl font-bold leading-tight text-[#4A2B1A] md:text-5xl">
        Des bijoux exclusifs inspirés par Madagascar
      </h1>

      <p className="mt-6 max-w-lg text-neutral-600 leading-relaxed">
        Une collection artisanale pour Nosy Kanto :
        acier inoxydable, pierres naturelles et créations faites main
        par une créatrice malgache.
      </p>

     <Link
  href="#collection"
  className="mt-8 inline-flex rounded-full bg-[#DAA520] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-[#c79212]"
>
  Découvrir la collection
</Link>

    </div>

    <div className="relative h-full min-h-[420px]">
      <img
        src="/images/nosykanto/boucles-maya.png"
        alt="Bijoux Kanto"
        className="h-full w-full object-cover"
      />
    </div>

  </div>
</div>

      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
        Créations exclusives Nosy Kanto
      </p>

      <h1 className="mt-2 text-4xl font-bold text-[#4A2B1A]">
        Bijoux Kanto
      </h1>

      <p className="mt-4 max-w-2xl text-neutral-600">
        Bijoux Kanto est une collection exclusive pour Nosy Kanto .Chaque pièce est réalisée à la main
        à Madagascar avec de l'acier inoxydable et des pierres naturelles sélectionnées avec soin.
      </p>
      <div className="mt-6 inline-flex rounded-full bg-[#fff3c4] px-4 py-2 text-xs font-semibold text-[#4A2B1A]">
         Créations exclusives Nosy Kanto
      </div>

      <div
         id="collection"
         className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >

        {bijouxKanto.map((product) => (
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
                Bijoux Kanto
              </p>

              <h2 className="mt-1 text-base font-semibold text-neutral-900 group-hover:text-[#DAA520]">
                {product.name}
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                {product.short}
              </p>

              <p className="mt-3 text-lg font-semibold text-[#DAA520]">
                {product.price.toFixed(2).replace(".", ",")} €
              </p>
            </div>
          </Link>
        ))}
      </div>
      <section className="mt-20 rounded-3xl bg-[#4A2B1A] px-8 py-12 text-white">
  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#DAA520]">
    Notre histoire
  </p>

  <h2 className="mt-4 text-3xl font-bold">
    Une collection imaginée entre Madagascar et Nosy Kanto
  </h2>

  <p className="mt-6 max-w-3xl text-white/80 leading-relaxed">
    Les bijoux Kanto sont des créations exclusives imaginées pour Nosy Kanto.
    Chaque pièce est réalisée à la main à Madagascar par une créatrice
    malgache, en associant acier inoxydable et pierres naturelles.
  </p>

  <p className="mt-4 max-w-3xl text-white/80 leading-relaxed">
    Notre volonté : proposer des bijoux artisanaux modernes, élégants et
    uniques, inspirés par la richesse des couleurs et du savoir-faire
    malgache.
  </p>
</section>
    </main>
  );
}
