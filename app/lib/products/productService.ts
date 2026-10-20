import type { Product } from "../../data/products";
import type { ProductFormData } from "../../types/productForms";

export function generateSku(
  product: Pick<Product, "category" | "collection">
) {
  const category = product.category
    .substring(0, 3)
    .toUpperCase();

  const collection = (product.collection ?? "GEN")
    .substring(0, 3)
    .toUpperCase();

  return `${category}-${collection}`;
}

export function buildProduct(
  data: ProductFormData
): Product {
  return {
    id: crypto.randomUUID(),

    slug: (data.slug?.trim() || data.name)
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, ""),

    name: data.name,
    referenceCode: data.referenceCode,
    price: data.price,
    category: data.category,
    status: data.status,
       tags: [],
   description: data.description,
   short: data.short,

   // Référencement Google (SEO)
   seoTitle: data.seoTitle?.trim() || undefined,
   seoDescription: data.seoDescription?.trim() || undefined,

   material: data.material,

    dimensions: data.dimensions,
    image: data.image || "/images/placeholder.png",
    images: data.images ?? [],
    collection: data.collection,
    costPrice: data.costPrice,
    stock: data.stock,
    stockMin: data.stockMin,
    originCountry: data.originCountry,
    handmade: data.handmade,
    artisanPartner: data.artisanPartner,
    weightGrams: data.weightGrams,
    variants: data.variants,
  };
}


