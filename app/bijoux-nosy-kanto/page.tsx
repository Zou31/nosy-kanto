import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
        Nouveautés Nosy Kanto
      </p>

      <h1 className="mt-2 text-4xl font-bold text-[#4A2B1A]">
        Bijoux Nosy Kanto
      </h1>

      <p className="mt-4 max-w-2xl text-neutral-700">
        Découvrez nos bijoux en acier inoxydable avec pierres naturelles,
        faits main par une créatrice malgache à Madagascar. Des créations
        exclusives, imaginées uniquement pour la marque Nosy Kanto.
      </p>

      <Link
        href="/boutique"
        className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm text-white hover:bg-neutral-800"
      >
        Voir les bijoux
      </Link>
    </main>
  );
}
