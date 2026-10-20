import Link from "next/link";

export default function AmeNosyKantoPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="overflow-hidden rounded-3xl bg-[#F8F3E9] px-8 py-14 md:px-14 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          L&apos;âme de Nosy Kanto
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#4A2B1A] md:text-5xl">
          Madagascar, l&apos;artisanat et les rencontres
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          Nosy Kanto est né d&apos;une envie simple : faire découvrir
          des créations et des saveurs de Madagascar tout en valorisant
          celles et ceux qui les font vivre.
        </p>
      </section>

      <section className="grid gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Notre démarche
          </p>

          <h2 className="mt-4 text-3xl font-bold text-[#4A2B1A]">
            Des pièces choisies pour leur histoire
          </h2>
        </div>

        <div className="space-y-5 leading-relaxed text-neutral-600">
          <p>
            Sacs, accessoires, bijoux et objets artisanaux sont
            sélectionnés avec une attention particulière portée au
            savoir-faire, aux matières et au travail réalisé à la main.
          </p>

          <p>
            Nosy Kanto souhaite construire des relations durables et
            équitables avec les artisans et créateurs malgaches, en
            respectant leur travail et leur savoir-faire.
          </p>

          <p>
            La boutique fait également découvrir des produits qui
            racontent Madagascar autrement : vanille, poivres et épices
            sélectionnés pour leur origine et leur qualité.
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-[#4A2B1A] px-8 py-12 text-white md:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#DAA520]">
          Nosy Kanto
        </p>

        <h2 className="mt-4 max-w-2xl text-3xl font-bold">
          Faire voyager un savoir-faire, pas seulement un produit.
        </h2>

        <p className="mt-5 max-w-2xl leading-relaxed text-white/80">
          Derrière chaque création, il y a une matière, des gestes,
          une personne et une histoire. C&apos;est cette richesse que
          nous souhaitons partager à travers Nosy Kanto.
        </p>

        <Link
          href="/collections"
          className="mt-8 inline-flex rounded-full bg-[#DAA520] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03]"
        >
          Découvrir nos collections
        </Link>
      </section>
    </main>
  );
}

