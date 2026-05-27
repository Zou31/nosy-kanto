import Link from "next/link";

export default function Hero() {
return (
<section className="flex flex-col items-center justify-center py-16 text-center">
<p className="text-xs font-semibold tracking-wide text-amber-700 uppercase">
Artisanat & commerce équitable
</p>

<h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight text-[#4A2B1A]">
Bienvenue sur Nosy Kanto
</h1>

<p className="mt-3 max-w-xl text-sm text-neutral-600">
Découvrez Madagascar autrement, à travers des pièces artisanales en
petites séries, réalisées avec des ateliers partenaires.
</p>

{/* 👉 AJOUTE ICI */}
<Link
href="/vanille-madagascar"
className="mt-6 inline-flex rounded-full bg-[#DAA520] px-6 py-3 text-sm font-medium text-white hover:bg-[#c7961d] transition"
>
Vanille de Madagascar - dès 3,50€
</Link>
<p className="mt-2 text-xs text-neutral-500">
Gousses 14 cm et 16 cm · Stock limité
</p> 
</section>
);
} 
