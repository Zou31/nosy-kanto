import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#F8F4EE]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-16 lg:gap-16">
        
        {/* Texte */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Artisanat & commerce équitable
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#4A2B1A] md:text-5xl">
            L&apos;artisanat de Madagascar, autrement.
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-neutral-600 md:mx-0 md:text-base">
            Découvrez des créations artisanales réalisées à Madagascar
            avec nos artisans partenaires, en petites séries et avec
            des matières soigneusement sélectionnées.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center rounded-full bg-[#4A2B1A] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#351f13]"
            >
              Découvrir la boutique
            </Link>

            <Link
              href="/artisanat-madagascar"
              className="inline-flex items-center justify-center rounded-full border border-[#4A2B1A] px-7 py-3 text-sm font-medium text-[#4A2B1A] transition hover:bg-[#4A2B1A] hover:text-white"
            >
              Notre artisanat
            </Link>
          </div>
        </div>

        {/* Photo artisan */}
        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-sm">
            <Image
              src="/images/nosykanto/hero-nosy-kanto.png"
              alt="Création artisanale de bijoux Nosy Kanto à Madagascar"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
