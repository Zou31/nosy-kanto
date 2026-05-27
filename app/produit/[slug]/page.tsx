import type { Metadata } from "next";
import { PRODUCTS, getProductBySlug } from "../../data/products";
import ProduitClient from "./ProduitClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Ce produit n'existe pas.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-[#4A2B1A]">Produit introuvable</h1>
        <p className="mt-3 text-neutral-600">
          Ce produit n&apos;existe pas ou a été retiré.
        </p>
      </main>
    );
  }

  return <ProduitClient product={product} />;
}




