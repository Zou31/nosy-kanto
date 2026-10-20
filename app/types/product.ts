import type { ProductCategory } from "../constants/productCategories";
import type { CollectionName } from "../constants/collections";


export type ProductStatus =
  | "draft"
  | "active"
  | "archived";

export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: ProductCategory;
  collection: CollectionName;
  status: ProductStatus;
  creationId?: string;
  createdAt: string;
  updatedAt: string;
};
