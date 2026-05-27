"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react"; 
import { useCart } from "../../context/CartContext";
import { DEFAULT_PRODUCT_IMAGE } from "../../data/products";
import type { Product } from "../../data/products";

function formatEUR(price: number) {
return Number(price).toFixed(2).replace(".", ",") + " €";
}

export default function ProduitClient({ product }: { product: Product }) {
const { addItem } = useCart();

const hasVariants = (product.variants?.length ?? 0) > 0;

const defaultVariant = useMemo(() => {
return hasVariants ? product.variants![0] : undefined;
}, [hasVariants, product.variants]);

const [selectedVariantId, setSelectedVariantId] = useState<string>(
defaultVariant?.id ?? ""
);

const [isAdding, setIsAdding] = useState(false);

const [viewerCount, setViewerCount] = useState(8);

useEffect(() => {
setViewerCount(Math.floor(Math.random() * 6) + 7); // entre 7 et 12

const interval = window.setInterval(() => {
setViewerCount(Math.floor(Math.random() * 6) + 7);
}, 12000);

return () => window.clearInterval(interval);
}, []); 

const selectedVariant = useMemo(() => {
if (!hasVariants) return undefined;
return product.variants!.find((v) => v.id === selectedVariantId) ?? defaultVariant;
}, [hasVariants, product.variants, selectedVariantId, defaultVariant]);

const imgSrc = selectedVariant?.image || product.image || DEFAULT_PRODUCT_IMAGE;
const hoverSrc = selectedVariant?.imageHover || product.imageHover;
const selectedColorLabel = selectedVariant?.color ?? "";

const handleAdd = () => {
if (isAdding) return;

setIsAdding(true);

addItem({
id: product.id,
name: product.name,
price: product.price,
image: imgSrc,
qty: 1,
color: selectedColorLabel || undefined,
});

window.setTimeout(() => setIsAdding(false), 350);
};

return (
<main className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
<div className="relative aspect-[4/5] w-full">
<Image
src={imgSrc}
alt={product.name}
fill
className="object-contain bg-white p-4"
sizes="(max-width: 768px) 100vw, 50vw"
priority
/>

{hoverSrc && (
<Image
src={hoverSrc}
alt={product.name}
fill
className="object-contain bg-white p-4 opacity-0 transition-opacity duration-300 hover:opacity-100"
sizes="(max-width: 768px) 100vw, 50vw"
/>
)}
</div>
</div>

<div>
<h1 className="text-3xl font-bold text-neutral-900">{product.name}</h1>

<p className="text-xs text-neutral-500 mt-1">
{product.category === "Sacs & accessoires"
? "Sac en raphia fait main à Madagascar"
: product.category === "Épices"
? "Produit naturel de Madagascar"
: "Artisanat de Madagascar"}
</p> 

{product.badges?.includes("Best-seller") && (
<span className="mt-3 inline-flex rounded-full bg-[#DAA520] px-3 py-1 text-xs font-semibold text-white">
Best-seller
</span>
)}

{product.category === "Épices" && (
<p className="mt-2 text-sm font-medium text-amber-700">
Épices de Madagascar · Qualité premium
</p>
)}

<p className="mt-2 text-sm uppercase tracking-wide text-amber-700">
  {product.category === "Épices"
    ? "Commerce équitable · Produit de Madagascar"
    : "Commerce équitable · Fait main à Madagascar"}
</p>

<p className="mt-4 text-neutral-600">{product.description}</p>

{product.category === "Épices" && (
<ul className="mt-4 space-y-1 text-sm text-neutral-700">
<li>- Produit naturel sélectionné avec soin</li>
<li>- Idéal cuisine maison, desserts ou plats parfumés</li>
<li>- Origine Madagascar</li>
<li>- Petite sélection artisanale</li>
</ul>
)}

<div className="mt-6">
<p className="text-2xl font-semibold text-[#DAA520]">
{formatEUR(product.price)}
<span className="text-sm font-normal text-neutral-500"> / unité</span>
</p>

{product.bundle && (
<>
<p className="mt-2 text-sm text-neutral-600">
Lot de {product.bundle.qty} :
<span className="font-semibold"> {formatEUR(product.bundle.price)}</span>
</p>

<p className="mt-1 text-xs text-green-600">
Économisez{" "}
{formatEUR(product.price * product.bundle.qty - product.bundle.price)} en lot
</p>
</>
)}
</div>

{hasVariants && (
<div className="mt-8">
<p className="mb-2 text-sm font-medium">
Couleur{" "}
{selectedColorLabel && (
<span className="text-xs text-neutral-500">({selectedColorLabel})</span>
)}
</p>

<div className="flex flex-wrap gap-2">
{product.variants!.map((v) => {
const active = v.id === selectedVariant?.id;

return (
<button
key={v.id}
type="button"
onClick={() => setSelectedVariantId(v.id)}
className={[
"rounded-full border px-3 py-2 text-sm transition",
active
? "border-black bg-black text-white"
: "border-neutral-200 bg-white hover:border-neutral-400",
].join(" ")}
>
{v.color}
</button>
);
})}
</div>
</div>
)}

<div className="mt-10 space-y-3">

 <p className="text-xs text-red-600 font-semibold">
Stock limité — prochaines livraisons en cours
</p> 

<p className="text-xs text-neutral-500">
{viewerCount} personnes consultent ce produit actuellement
</p> 


{product.id === "pack_madagascar" ? (
<p className="text-xs text-red-600 font-semibold">
 Plus que 6 coffrets disponibles aujourd’hui
</p>
) : product.category === "Sacs & accessoires" ? (
<p className="text-xs text-red-600 font-semibold">
 Plus que 3 sacs disponibles aujourd’hui
</p>
) : product.category === "Épices" ? (
<p className="text-xs text-red-600 font-semibold">
Petite quantité disponible aujourd’hui
</p>
) : null} 


<p className="text-xs text-neutral-500">
🚚 Expédition rapide depuis la France
</p> 
   
<button
type="button"
onClick={handleAdd}
disabled={isAdding}
className="w-full rounded-xl bg-black py-4 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
>
{isAdding ? "Ajout en cours..." : "Ajouter au panier"}
</button>
<p className="text-xs text-center text-neutral-500">
- Achat sans risque       -  Paiement sécurisé
</p> 



{product.bundle && (
<>
<p className="text-xs font-medium text-[#DAA520]">
⭐ Le choix le plus populaire
</p>

<button
type="button"
onClick={() => {
addItem({
id: product.id,
name: `${product.name} - lot de ${product.bundle!.qty}`,
price: product.bundle!.price,
image: imgSrc,
qty: 1,
color: selectedColorLabel || undefined,
size: `Lot de ${product.bundle!.qty}`,
});
}}
className="relative w-full rounded-xl border-2 border-[#DAA520] bg-gradient-to-r from-[#fff3c4] to-[#ffe08a] py-4 font-semibold text-[#4A2B1A] transition hover:scale-[1.02] hover:shadow-md"
>
<span className="absolute -top-2 right-3 rounded-full bg-[#DAA520] px-2 py-1 text-[10px] text-white">
BEST DEAL
</span>

  Acheter le lot de {product.bundle.qty} — {formatEUR(product.bundle.price)}

<span className="mt-1 block text-xs text-green-700">
Économisez{" "}
{formatEUR(product.price * product.bundle.qty - product.bundle.price)}
</span>
</button>
</>
)}
</div>

<p className="mt-3 text-xs text-neutral-500">
{product.category === "Bijoux"
  ? "- Livraison rapide · - Acier inoxydable · - Fait main"
  : product.category === "Épices"
  ? "- Livraison rapide depuis la France · - Paiement sécurisé · - Produit naturel"
  : "- Livraison rapide depuis la France · - Paiement sécurisé · - Fait main"}
</p> 

{product.id === "sac_kanto_terra" && (
<div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-[#DAA520]">
Avis client
</p>

<p className="mt-2 text-sm text-neutral-700">
“Très beau sac, encore plus joli en vrai. Léger et super agréable à porter.”
</p>

<p className="mt-2 text-xs text-neutral-500">
⭐⭐⭐⭐⭐ Florence — Toulouse
</p>
</div>
)}

{product.id === "sac_kanto_lova" && (
<div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-[#DAA520]">
Avis client
</p>

<p className="mt-2 text-sm text-neutral-700">
“Design unique, qualité au top. On me demande tout le temps d’où vient ce sac.”
</p>

<p className="mt-2 text-xs text-neutral-500">
⭐⭐⭐⭐⭐ Sarah — Bordeaux
</p>
</div>
)} 

{product.id === "vanille_16cm" || product.id === "vanille_14cm" ? (
<div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
Avis client vérifié
</p>
<p className="mt-2 text-sm text-neutral-700">
“Vanille très parfumée, parfaite pour les desserts maison.”
</p>
<p className="mt-2 text-xs text-neutral-500">
⭐⭐⭐⭐⭐ Client Nosy Kanto
</p>
</div>
) : product.id === "poivre_sauvage_40g" ? (
<div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
Avis client vérifié
</p>
<p className="mt-2 text-sm text-neutral-700">
“Poivre très parfumé, il relève vraiment les plats sans être trop fort.”
</p>
<p className="mt-2 text-xs text-neutral-500">
⭐⭐⭐⭐⭐ Client Nosy Kanto
</p>
</div>
) : product.id === "combava_40g" ? (
<div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
Avis client vérifié
</p>
<p className="mt-2 text-sm text-neutral-700">
“Parfum citronné incroyable, parfait dans les sauces et les desserts.”
</p>
<p className="mt-2 text-xs text-neutral-500">
⭐⭐⭐⭐⭐ Client Nosy Kanto
</p>
</div>
) : product.id === "pack_madagascar" ? (
<div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
Avis client vérifié
</p>
<p className="mt-2 text-sm text-neutral-700">
“Très beau coffret, idéal pour découvrir les saveurs de Madagascar.”
</p>
<p className="mt-2 text-xs text-neutral-500">
⭐⭐⭐⭐⭐ Client Nosy Kanto
</p>
</div>
) : null} 

</div>

{product.category === "Épices" && product.id !== "pack_madagascar" && (
<div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:col-span-2">
<p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
Complétez votre commande
</p>

<h2 className="mt-2 text-xl font-bold text-[#4A2B1A]">
À associer avec votre achat
</h2>

<p className="mt-2 text-sm text-neutral-600">
Ces produits vont parfaitement avec votre sélection 👇
</p>

<div className="mt-6 grid gap-4 sm:grid-cols-3">
<Link
href="/produit/pack-decouverte-madagascar"
className="flex items-center gap-4 rounded-xl border-2 border-[#DAA520] bg-[#fff8e1] p-4 transition hover:shadow-md"
>
<img
src="/images/epices/pack-madagascar.png"
alt="Pack découverte Madagascar"
className="h-16 w-16 object-contain"
/>
<div>
<p className="font-semibold">  Pack découverte</p>
<p className="text-sm text-[#DAA520]">22,90 €</p>
<p className="text-xs text-green-600">Offre la plus avantageuse</p>
</div>
</Link>

<Link
href="/produit/poivre-sauvage-madagascar-voatsiperifery-40g"
className="flex items-center gap-4 rounded-xl border p-4 transition hover:shadow-md"
>
<img
src="/images/epices/poivre-sauvage-40g.png"
alt="Poivre sauvage de Madagascar"
className="h-16 w-16 object-contain"
/>
<div>
<p className="font-semibold">Poivre sauvage</p>
<p className="text-sm text-[#DAA520]">12 € · 40 g</p>
</div>
</Link>

<Link
href="/produit/combava-madagascar-40g"
className="flex items-center gap-4 rounded-xl border p-4 transition hover:shadow-md"
>
<img
src="/images/epices/combava-40g.png"
alt="Combava de Madagascar"
className="h-16 w-16 object-contain"
/>
<div>
<p className="font-semibold">Combava</p>
<p className="text-sm text-[#DAA520]">9 € · 40 g</p>
</div>
</Link>
</div>
</div>
)}
</main>
);
} 
