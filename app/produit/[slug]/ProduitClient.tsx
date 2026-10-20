"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react"; 
import { useCart } from "../../context/CartContext";
import { DEFAULT_PRODUCT_IMAGE } from "../../data/products";
import type { Product } from "../../data/products";
import { useERP } from "../../context/ERPContext";

function formatEUR(price: number) {
return Number(price).toFixed(2).replace(".", ",") + " €";
}

export default function ProduitClient({
  slug,
}: {
  slug: string;
}) {
  const { products, stock, isLoading, loadError } = useERP();
  const { addItem } = useCart();

  const product = products.find(
    (item) => item.slug === slug
  );

  const relatedProducts = products
  .filter(
    (item) =>
      item.status === "En vente" &&
      item.category === product?.category &&
      item.id !== product?.id &&
      item.collection !== product?.collection
  )
  .slice(0, 3);

  const hasVariants =
    (product?.variants?.length ?? 0) > 0;

  const defaultVariant = useMemo(() => {
    return hasVariants
      ? product?.variants?.[0]
      : undefined;
  }, [hasVariants, product?.variants]);

  const [selectedVariantId, setSelectedVariantId] =
    useState<string>(
      defaultVariant?.id ?? ""
    );

    const [selectedImage, setSelectedImage] =
  useState<string | null>(null);

  const [isAdding, setIsAdding] =
    useState(false);

  const selectedVariant = useMemo(() => {
    if (!hasVariants) return undefined;

    return (
      product?.variants?.find(
        (v) => v.id === selectedVariantId
      ) ?? defaultVariant
    );
  }, [
    hasVariants,
    product?.variants,
    selectedVariantId,
    defaultVariant,
  ]);

  useEffect(() => {
  setSelectedImage(null);
}, [selectedVariantId]);

const selectedVariantStock = selectedVariant
  ? stock
      .filter(
        (item) =>
          item.productId === product?.id &&
          item.variantId === selectedVariant.id
      )
      .reduce((total, item) => total + item.quantity, 0)
  : stock
      .filter(
        (item) =>
          item.productId === product?.id &&
          !item.variantId
      )
      .reduce((total, item) => total + item.quantity, 0);

const isOutOfStock = selectedVariantStock <= 0;
if (isLoading) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-neutral-600">
        Chargement du produit...
      </p>
    </main>
  );
}
if (loadError) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">
        Notre boutique est momentanément indisponible
      </h1>

      <p className="mt-4 text-neutral-600">
        Impossible de charger les produits pour le moment.
        Veuillez réessayer dans quelques instants.
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-6 rounded-xl bg-neutral-900 px-6 py-3 text-white"
      >
        Réessayer
      </button>
    </div>
  );
}

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-[#4A2B1A]">
          Produit introuvable
        </h1>

        <p className="mt-3 text-neutral-600">
          Ce produit n&apos;existe pas ou a été retiré.
        </p>
      </main>
    );
  }

const baseImageSrc =
  selectedVariant?.image ||
  product.image ||
  DEFAULT_PRODUCT_IMAGE;

const imgSrc =
  selectedImage || baseImageSrc;

const hoverSrc =
  selectedVariant?.imageHover || product.imageHover;

const galleryImages = [
  baseImageSrc,
  ...(selectedVariant
    ? selectedVariant.images ?? []
    : product.images ?? []),
].filter(Boolean);

const selectedColorLabel = selectedVariant?.color ?? "";

const displayedPrice =
  selectedVariant?.price ?? product.price;

const handleAdd = () => {
if (isAdding || isOutOfStock) return;

setIsAdding(true);

addItem({
  id: product.id,
  variantId: selectedVariant?.id,
  name: product.name,
  price: displayedPrice,
  image: imgSrc,
  qty: 1,
  color: selectedColorLabel || undefined,
  stock: selectedVariantStock,
});

window.setTimeout(() => setIsAdding(false), 350);
};

return (
<main className="mx-auto max-w-6xl px-6 py-16">
  <div className="grid gap-10 md:grid-cols-2">

  <div>
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

    {galleryImages.length > 1 && (
      <div className="mt-4 flex flex-wrap gap-3">
        {galleryImages.map((imageSrc) => (
          <button
            key={imageSrc}
            type="button"
           className={[
              "relative h-20 w-20 overflow-hidden rounded-xl border-2 bg-white transition",
                  (selectedImage || baseImageSrc) === imageSrc
                  ? "border-[#DAA520] shadow-sm"
                  : "border-neutral-200 hover:border-[#DAA520]/60",
            ].join(" ")}

            onClick={() => setSelectedImage(imageSrc)}
          >
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    )}
  </div>

<div>
<h1 className="text-3xl font-bold leading-tight tracking-tight text-[#4A2B1A]">
  {product.name}
</h1>

<p className="text-xs text-neutral-500 mt-1">
  {product.collection === "Azary"
    ? "Création artisanale malgache · Collection Azary"
    : product.category === "Sacs & accessoires"
    ? "Sac en raphia fait main à Madagascar"
    : product.category === "Bijoux"
    ? "Bijou artisanal fait main à Madagascar"
    : product.category === "Épices"
    ? "Produit naturel de Madagascar"
    : "Artisanat de Madagascar"}
</p> 

{product.badges?.includes("Best-seller") && (
<span className="mt-3 inline-flex rounded-full bg-[#DAA520] px-3 py-1 text-xs font-semibold text-white">
Best-seller
</span>
)}

<p className="mt-2 text-sm uppercase tracking-wide text-amber-700">
  {product.category === "Épices"
    ? "Sélection Nosy Kanto · Qualité artisanale"
    : "Commerce équitable · Fait main à Madagascar"}
</p>

{product.originCountry && (
  <div className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
    <span className="font-medium text-[#4A2B1A]">Origine :</span>
    <span>{product.originCountry}</span>
  </div>
)}

{product.weightGrams && (
  <div className="mt-2 flex items-center gap-2 text-sm text-neutral-700">
    <span className="font-medium text-[#4A2B1A]">Poids net :</span>
    <span>{product.weightGrams} g</span>
  </div>
)}

{product.short && (
  <div className="mt-4 rounded-xl bg-[#F8F3E9] px-4 py-3">
    <p className="text-sm font-medium text-[#4A2B1A]">
      {product.short}
    </p>
  </div>
)}

{product.material && (
  <div className="mt-3 flex items-center gap-2 text-sm text-neutral-700">
    <span className="font-medium text-[#4A2B1A]">Matière :</span>
    <span>{product.material}</span>
  </div>
)}

{product.dimensions && (
  <div className="mt-2 flex items-center gap-2 text-sm text-neutral-700">
    <span className="font-medium text-[#4A2B1A]">Dimensions :</span>
    <span>{product.dimensions}</span>
  </div>
)}

<div className="mt-6">
<p className="text-2xl font-semibold text-[#DAA520]">
{formatEUR(displayedPrice)}
<span className="text-sm font-normal text-neutral-500">
  {[
  "5-gousse-vanilles-madagascar-18-20",
  "5-gousses-vanille-madagascar-18-20-cm",
].includes(product.slug)
  ? " / lot de 5 gousses"
  : " / unité"}

</span>

</p>

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

<div className="mt-6 space-y-3"> 

{!isOutOfStock && (
  <p className="text-xs font-semibold text-green-700">
    ✓ En stock
  </p>
)}

<p className="text-xs text-neutral-500">
🚚 Expédition rapide depuis la France
</p> 
   
<button
  type="button"
  onClick={handleAdd}
  disabled={isAdding || isOutOfStock}
  className="w-full rounded-xl bg-[#4A2B1A] py-4 font-semibold text-white shadow-sm transition hover:bg-[#5C3824] hover:shadow-md disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:opacity-60"
>
  {isOutOfStock
    ? "Rupture de stock"
    : isAdding
    ? "Ajout en cours..."
    : "Ajouter au panier"}
</button>

<p className="text-center text-xs text-neutral-500">
  ✓ Achat sécurisé&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;🔒 Paiement sécurisé
</p> 

</div>  
   </div>
    </div>

    <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
  <h2 className="mb-5 text-xl font-semibold text-[#4A2B1A]">
    Description détaillée
  </h2>

  <div className="max-w-3xl space-y-3 text-sm leading-7 text-neutral-600">
    {(product.description ?? "")
      .split("\n")
      .map((line, index) => {
        const texte = line.trim();

        if (!texte) {
          return <div key={index} className="h-2" />;
        }

        if (texte.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="mt-4 text-lg font-semibold text-[#4A2B1A]"
            >
              {texte.slice(4)}
            </h3>
          );
        }

        if (texte.startsWith("- ")) {
          return (
            <p key={index} className="pl-3">
              <span className="mr-2 text-amber-700">•</span>
              {texte.slice(2)}
            </p>
          );
        }

        if (texte.endsWith(":")) {
          return (
            <p key={index} className="font-semibold text-[#4A2B1A]">
              {texte}
            </p>
          );
        }

        return <p key={index}>{texte}</p>;
      })}
  </div>
</section>

{product.category === "Épices" && relatedProducts.length > 0 && (
  <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
      Complétez votre commande
    </p>

    <h2 className="mt-2 text-xl font-bold text-[#4A2B1A]">
      À associer avec votre achat
    </h2>

    <p className="mt-2 text-sm text-neutral-600">
      Découvrez aussi d&apos;autres saveurs de Madagascar.
    </p>

    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {relatedProducts.map((related) => (
        <Link
          key={related.id}
          href={`/produit/${related.slug}`}
          className="flex items-center gap-4 rounded-xl border border-neutral-200 p-4 transition hover:border-[#DAA520] hover:shadow-md"
        >
          <div className="relative h-16 w-16 shrink-0">
            <Image
              src={related.image || DEFAULT_PRODUCT_IMAGE}
              alt={related.name}
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>

          <div>
            <p className="font-semibold text-[#4A2B1A]">
              {related.name.replace(/(\d+)\s+(g|kg|ml|cl|cm)\b/gi, "$1\u00A0$2")}
            </p>

            <p className="mt-1 text-sm font-semibold text-[#DAA520]">
              {formatEUR(related.price)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
</main>
);
} 
