import type { Metadata } from "next";
import { PRODUCTS, getProductBySlug } from "../../data/products";
import ProduitClient from "./ProduitClient";
import { createAdminClient } from "@/utils/supabase/admin";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

const supabase = createAdminClient();

const { data: dbProduct, error } = await supabase
  .from("products")
  .select("name, description, image, seo_title, seo_description")
  .eq("slug", slug)
  .eq("status", "En vente")
  .maybeSingle();

if (error) {
  console.error("Erreur SEO Supabase :", error);
}

const localProduct = getProductBySlug(slug);

const product = dbProduct
  ? {
      name: dbProduct.name,
      description: dbProduct.description ?? "",
      image: dbProduct.image ?? "/images/placeholder.png",
      seoTitle: dbProduct.seo_title ?? undefined,
      seoDescription: dbProduct.seo_description ?? undefined,
    }
  : localProduct ?? null;

if (!product) {

    return {
      title: "Produit introuvable",
      description: "Ce produit n'existe pas.",
    };
  }

    const seoTitle = product.seoTitle?.trim() || product.name;
    const seoDescription =
    product.seoDescription?.trim() || product.description;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [{ url: product.image }],
      type: "website",
      locale: "fr_FR",
    },
  };

}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <ProduitClient slug={slug} />;
}





