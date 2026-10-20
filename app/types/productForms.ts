export type ProductFormData = {
  // Identification
  name: string;
  collection?: string;

  referenceCode?: string;

status?:
  | "Brouillon"
  | "En développement"
  | "En vente"
  | "En pause"
  | "Arrêté";

  category:
    | "Bijoux"
    | "Sacs & accessoires"
    | "Décoration"
    | "Épices";

  // Vente
  price: number;
  costPrice?: number;
  stock?: number;
  stockMin?: number;

  // Descriptions
short: string;
description: string;

// Référencement Google (SEO)
seoTitle?: string;
seoDescription?: string;
slug?: string;

  // Fabrication
  material: string;
  dimensions: string;
  weightGrams?: number;

  originCountry?: string;
  handmade?: boolean;
  artisanPartner?: string;

  // Image
  image: string;
  images?: string[];
  imagesToDelete?: string[];
  uploadedImages?: string[];
  variants?: {
  id: string;
  name: string;
  sku: string;
  color: string;
  price: number;
  costPrice: number;
  stock: number;
  stockMin: number;
  status: "Brouillon" | "En développement" | "En vente" | "En pause" | "Arrêté";
  location: string;
  barcode: string;
  isDefault: boolean;
  weightGrams: number;
  image: string;
  images?: string[];

  dimensions: {
  lengthCm: number;
  heightCm: number;
  widthCm: number;
};
}[];

};
