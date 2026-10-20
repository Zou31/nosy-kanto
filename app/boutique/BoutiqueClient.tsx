"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PRODUCT_IMAGE } from "../data/products";
import type { Product } from "../data/products";
import { useERP } from "../context/ERPContext";
import { useCart } from "../context/CartContext";

type SortKey = "featured" | "price_asc" | "price_desc";

function formatEUR(price: number) {
  return Number(price).toFixed(2).replace(".", ",") + " €";
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { stock } = useERP();
  const [added, setAdded] = useState(false);

  // Variante par défaut = 1ère variante si elle existe
  const firstVariant = product.variants?.[0];
  const firstVariantStock = stock
  .filter(
    (item) =>
      item.productId === product.id &&
      item.variantId === firstVariant?.id
  )
  .reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isOutOfStock = firstVariantStock <= 0;

  const totalProductStock = stock
  .filter(
    (item) =>
      item.productId === product.id
  )
  .reduce(
    (total, item) => total + item.quantity,
    0
  );

const isProductOutOfStock =
  totalProductStock <= 0;

const hasOtherAvailableVariant =
  isOutOfStock && !isProductOutOfStock;

  const img1 = firstVariant?.image || product.image || DEFAULT_PRODUCT_IMAGE;
  const img2 = firstVariant?.imageHover || product.imageHover;

  const quickColor = firstVariant?.color; // ex "Naturel" (optionnel)
  // size par défaut (si tu veux) — sinon enlève la ligne
  const quickSize = undefined;

  const quickStock = firstVariant
  ? firstVariantStock
  : totalProductStock;

  const onQuickAdd = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hasOtherAvailableVariant) {
  return;
}

e.preventDefault();
e.stopPropagation();

if (isProductOutOfStock) {
  return;
}

      addItem({
        id: product.id,
        variantId: firstVariant?.id,
        name: product.name,
        price: product.price,
        image: img1,
        qty: 1,
        color: quickColor,
        size: quickSize,
        stock: quickStock,
      });

      setAdded(true);
      window.setTimeout(() => setAdded(false), 900);
    },
    [
  addItem,
  product.id,
  product.name,
  product.price,
  img1,
  quickColor,
  isProductOutOfStock,
  hasOtherAvailableVariant,
  quickStock,
]

  );

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div className="rounded-2xl overflow-hidden bg-white border border-neutral-200 transition hover:shadow-lg">
        {/* Image */}
       <div className="relative aspect-square sm:aspect-[4/5] bg-white overflow-hidden">
          {/* image 1 */}
          <Image
            src={img1}
            alt={product.name}
            fill
            className="object-contain bg-white p-4 transition duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />

          {/* image 2 (hover) */}
          {img2 ? (
            <Image
              src={img2}
              alt={product.name}
              fill
              className="object-contain bg-white p-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          ) : null}

          {/* Badges */}
          {product.badges?.length ? (
            <div className="absolute left-3 top-3 flex gap-2 overflow-x-auto pb-2">
              {product.badges.slice(0, 2).map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-neutral-900 shadow-sm backdrop-blur"
                >
                  {b}
                </span>
              ))}
            </div>
          ) : null}

          {/* Quick add */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
            <button
  type="button"
  onClick={onQuickAdd}
  disabled={isProductOutOfStock}
  className={`pointer-events-auto w-full rounded-xl py-3 text-sm font-medium text-white backdrop-blur transition ${
    isProductOutOfStock
      ? "cursor-not-allowed bg-neutral-400 opacity-100 translate-y-0"
      : hasOtherAvailableVariant
      ? "bg-[#8A5A3B] opacity-100 translate-y-0 hover:bg-[#6F452E]"
      : "bg-black/90 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black"
  }`}
>
  {isProductOutOfStock
    ? "Rupture de stock"
    : hasOtherAvailableVariant
    ? "Voir les variantes"
    : added
    ? "Ajouté ✓"
    : "Ajouter au panier"}
</button>

          </div>
        </div>

        {/* Infos */}
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-widest text-neutral-500">
             {product.category} {product.dimensions ? `· ${product.dimensions}` : ""} 

          </p>

          <h3 className="mt-1 text-[15px] font-medium text-neutral-900 group-hover:text-[#DAA520] transition">
            {product.name}
          </h3>

          {(product.short || product.material || product.dimensions) && (
            <p className="mt-1 text-sm text-neutral-500">
              {product.short
                ? product.short
                : [product.material, product.dimensions].filter(Boolean).join(" · ")}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <p className="text-[#DAA520] text-lg font-semibold">
              {formatEUR(product.price)}
            </p>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-800 transition">
              Voir →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BoutiqueClient() {
  const { products } = useERP();

const productsForSale = useMemo(
  () =>
    products.filter(
      (product) => product.status === "En vente"
    ),
  [products]
);
  const categories = useMemo(() => {
    const set = new Set(
  productsForSale.map((p) => p.category)
);

    return ["Tous", ...Array.from(set)];
  }, [productsForSale]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Tous");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let base =
  category === "Tous"
    ? productsForSale.filter(
        (p) => !p.tags.includes("bijoux nosy kanto")
      )
    : productsForSale.filter(
        (p) =>
          p.category === category &&
          !p.tags.includes("bijoux nosy kanto")
      );

    const q = query.trim().toLowerCase();
    if (q) {
      base = base.filter((p) => {
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inTags = p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        return inName || inDesc || inTags;
      });
    }

    const sorted = [...base];
    if (sort === "price_asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") sorted.sort((a, b) => b.price - a.price);

    return sorted;
 }, [
  category,
  sort,
  query,
  productsForSale,
]);

  const hasFilters = query.trim() || category !== "Tous" || sort !== "featured";

  const resetFilters = () => {
    setQuery("");
    setCategory("Tous");
    setSort("featured");
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-[#4A2B1A]">Boutique</h1>
        <p className="text-neutral-600 max-w-2xl">
          Sélection de pièces artisanales en petites séries, réalisées avec des ateliers
          partenaires à Madagascar.
        </p>
      </div>

      {/* Barre filtres */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <input
            type="search"
            placeholder="Rechercher un produit…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-[320px] rounded-xl border border-neutral-200 px-4 py-2 text-sm outline-none focus:border-black"
          />

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm border transition ${
                  category === c
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {c}
              </button>
            ))}

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400 transition"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-600">Trier</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
          >
            <option value="featured">Sélection</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      <p className="mt-6 mb-6 text-sm text-neutral-500">
        {filtered.length} produit{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <p className="text-neutral-900 font-semibold">Aucun produit ne correspond.</p>
          <p className="mt-1 text-sm text-neutral-500">
            Essaie un autre mot-clé ou enlève un filtre.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-xl bg-black px-5 py-2 text-sm text-white hover:bg-neutral-800 transition"
          >
            Réinitialiser
          </button>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

