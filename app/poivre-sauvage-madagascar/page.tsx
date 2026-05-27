import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
title: "Poivre sauvage de Madagascar",
description:
"Poivre sauvage Voatsiperifery de Madagascar 40g. Parfum intense, idéal pour viandes, poissons et sauces.",
};

export default function Page() {
return (
<main className="max-w-5xl mx-auto px-6 py-16">
<h1 className="text-4xl font-bold text-[#4A2B1A]">
Poivre sauvage de Madagascar
</h1>

<p className="mt-4 text-neutral-600">
Poivre rare et parfumé, récolté à la main dans les forêts de Madagascar.
Idéal pour sublimer vos plats.
</p>

<div className="mt-6 rounded-2xl overflow-hidden bg-white">
<Image
src="/images/epices/poivre-sauvage-40g.png"
alt="Poivre sauvage"
width={1000}
height={600}
className="w-full object-cover"
/>
</div>

<div className="mt-8 rounded-2xl border p-6 bg-white">
<p className="text-2xl font-bold text-[#DAA520]">12 € · 40 g</p>

<Link
href="/produit/poivre-sauvage-madagascar-40g"
className="mt-4 inline-flex rounded-full bg-black px-6 py-3 text-white"
>
Acheter
</Link>
</div>
</main>
);
} 
