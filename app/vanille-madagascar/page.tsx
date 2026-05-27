import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image"; 

export const metadata: Metadata = {
title: "Vanille de Madagascar",
description:
"Vanille Bourbon de Madagascar en gousses parfumées (14 cm et 16 cm).Achat en ligne de vanille naturelle, idéale pour patisserie, desserts et rhum arrangé.",
};

export default function VanilleMadagascarPage() {
return (
<main className="mx-auto max-w-5xl px-6 py-16">
<p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
Vanille Bourbon · Madagascar
</p>

<h1 className="mt-2 max-w-3xl text-4xl font-bold text-[#4A2B1A] md:text-5xl">
Vanille de Madagascar parfumée, idéale pâtisserie & rhum arrangé
</h1>

<p className="mt-4 max-w-2xl text-base text-neutral-600">
Des gousses souples, aromatiques et sélectionnées avec soin. Choisissez le format
14 cm pour le quotidien ou 16 cm pour une vanille plus premium.
</p>

<div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
<span className="rounded-full bg-[#F8F3E9] px-3 py-2 text-[#4A2B1A]">
✓ Origine Madagascar
</span>
<span className="rounded-full bg-[#F8F3E9] px-3 py-2 text-[#4A2B1A]">
✓ Gousses 14 cm & 16 cm
</span>
<span className="rounded-full bg-[#F8F3E9] px-3 py-2 text-[#4A2B1A]">
✓ Stock limité
</span>
</div> 

<div className="mt-6 overflow-hidden rounded-2xl bg-white">
<Image
src="/images/epices/vanille-hero.png"
alt="Vanille de Madagascar"
width={1000}
height={600}
className="w-full object-cover"
priority
/>
</div> 

<div className="mt-8 grid gap-6 md:grid-cols-2">
<div className="relative rounded-2xl border-2 border-[#DAA520] bg-white p-6 shadow-sm">
<span className="absolute right-4 top-4 rounded-full bg-[#DAA520] px-3 py-1 text-xs font-semibold text-white">
Best-seller
</span>

<h2 className="text-xl font-semibold text-neutral-900">Vanille 16 cm</h2>

<p className="mt-2 text-neutral-600">
Gousse longue, charnue et très parfumée. Le meilleur choix pour pâtisserie,
desserts maison, confitures et rhum arrangé.
</p>

<p className="mt-4 text-2xl font-bold text-[#DAA520]">4,00 € / unité</p>

<p className="mt-1 text-sm font-semibold text-green-600">
18,00 € les 5 · économisez 2,00 €
</p>

<Link
href="/produit/vanille-bourbon-madagascar-16cm"
className="mt-5 inline-flex w-full justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
>
Acheter la vanille 16 cm
</Link>
</div>

<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
<h2 className="text-xl font-semibold text-neutral-900">Vanille 14 cm</h2>

<p className="mt-2 text-neutral-600">
Format pratique et économique, parfait pour une utilisation régulière en
cuisine sucrée, infusion ou desserts du quotidien.
</p>

<p className="mt-4 text-2xl font-bold text-[#DAA520]">3,50 € / unité</p>

<p className="mt-1 text-sm font-semibold text-green-600">
15,00 € les 5 · économisez 2,50 €
</p>

<Link
href="/produit/vanille-bourbon-madagascar-14cm"
className="mt-5 inline-flex w-full justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
>
Acheter la vanille 14 cm
</Link>
</div>
</div> 

<section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
Avis client
</p>

<p className="mt-3 text-lg font-medium text-neutral-900">
“Vanille très parfumée, parfaite pour les desserts maison.”
</p>

<p className="mt-2 text-sm text-neutral-500">
⭐⭐⭐⭐⭐ Client Nosy Kanto
</p>
</section>
<section className="mt-6 rounded-2xl bg-[#fff7ed] border border-amber-200 p-5 text-center">
<p className="text-sm font-semibold text-amber-700">
⚠️ Stock limité cette semaine
</p>

<p className="mt-2 text-sm text-neutral-700">
Nos gousses partent vite — prochaine livraison bientôt.
</p>
</section> 


<section className="mt-12 rounded-2xl bg-[#F8F3E9] p-6"> 

<h2 className="text-2xl font-bold text-[#4A2B1A]">
Comment utiliser la vanille de Madagascar ?
</h2>

<p className="mt-3 text-neutral-700">
Fendez la gousse en deux, grattez les grains avec la pointe d’un
couteau, puis ajoutez-les à votre préparation. La gousse peut aussi
être infusée dans du lait, de la crème, du sucre ou du rhum arrangé.
</p>

<h3 className="mt-6 font-semibold text-neutral-900">
Conservation
</h3>
<p className="mt-2 text-neutral-700">
Conservez les gousses dans un tube ou un bocal fermé, à l’abri de la
lumière, de l’air et de l’humidité.
</p>
</section>

<section className="mt-12">
<h2 className="text-2xl font-bold text-[#4A2B1A]">
Pourquoi choisir notre vanille ?
</h2>

<ul className="mt-4 space-y-2 text-neutral-700">
<li>✓ Vanille Bourbon authentique de Madagascar</li>
<li>✓ Gousses sélectionnées à la main</li>
<li>✓ Parfum intense et naturel</li>
<li>✓ Idéal pour pâtisserie et cuisine maison</li>
</ul>
</section>

<section className="mt-12">
<h2 className="text-2xl font-bold text-[#4A2B1A]">
Questions fréquentes
</h2>

<div className="mt-4 space-y-4 text-neutral-700">
<div>
<p className="font-semibold">Comment utiliser une gousse de vanille ?</p>
<p>Fendez la gousse, grattez les grains et ajoutez-les à vos préparations.</p>
</div>

<div>
<p className="font-semibold">Combien de temps se conserve la vanille ?</p>
<p>Plusieurs mois dans un contenant hermétique, à l’abri de la lumière.</p>
</div>

<div>
<p className="font-semibold">Quelle taille choisir ?</p>
<p>16 cm pour une qualité premium, 14 cm pour un usage quotidien.</p>
</div>
</div>
</section>

</main> 
);
} 
