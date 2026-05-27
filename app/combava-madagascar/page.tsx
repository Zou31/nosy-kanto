import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
title: "Combava de Madagascar",
description:
"Combava de Madagascar 40g, parfum citronné intense. Idéal pour poissons, sauces et cuisine exotique.",
};

export default function Page() {
return (
<main className="max-w-5xl mx-auto px-6 py-16">
<h1 className="text-4xl font-bold text-[#4A2B1A]">
Combava de Madagascar
</h1>

<p className="mt-4 text-neutral-600">
Agrume au parfum unique, parfait pour donner une touche exotique et fraîche à vos plats.
</p>

<div className="mt-6 rounded-2xl overflow-hidden bg-white">
<Image
src="/images/epices/combava-40g.png"
alt="Combava"
width={1000}
height={600}
className="w-full object-cover"
/>
</div>

<div className="mt-8 rounded-2xl border p-6 bg-white">
<p className="text-2xl font-bold text-[#DAA520]">9 € · 40 g</p>

<Link
href="/produit/combava-madagascar-40g"
className="mt-4 inline-flex rounded-full bg-black px-6 py-3 text-white"
>
Acheter
</Link>
</div>
</main>
);
} 
