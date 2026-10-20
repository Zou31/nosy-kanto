import type { Product } from "../../data/products";
import ProductCard from "./ProductCard";

type ProductsListProps = {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProductsList({
  products,
  onEdit,
  onDelete,
}: ProductsListProps) {
  return (
    <div className="space-y-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
