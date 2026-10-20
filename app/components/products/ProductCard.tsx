import Link from "next/link";

import type { Product } from "../../data/products";
import Card from "../ui/Card";
import CardActions from "../ui/CardActions";

type ProductCardProps = {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <Card>
      <div className="flex gap-4">
        {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    className="h-24 w-24 rounded-xl object-cover"
  />
) : (
  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-neutral-100 text-xs text-neutral-400">
    Aucune photo
  </div>
)}

        <div className="flex-1">
          <Link
            href={`/produit/${product.slug}`}
            className="text-lg font-bold text-[#4A2B1A] hover:underline"
          >
            {product.name}
          <p className="mt-1 text-xs text-neutral-500">
             Réf. : {product.referenceCode ?? "—"}
          </p>

        <p className="text-xs text-neutral-500">
            Collection : {product.collection ?? "—"}
        </p>

          </Link>

          <p className="text-sm text-neutral-600">
            {product.short ?? product.description}
          </p>

          <p className="mt-2 font-semibold">
            {product.price.toFixed(2)} €
          </p>

        {product.costPrice !== undefined && (
            <p className="text-xs text-neutral-500">
                Coût : {product.costPrice.toFixed(2)} €
            </p>
        )}

          <p className="text-sm text-neutral-500">
            {product.category}
          </p>

         {product.status && (
             <p className="mt-1 text-xs font-medium text-green-700">
                ● {product.status}
             </p>
        )}

        </div>
      </div>

      <CardActions
        onEdit={() => onEdit(product.id)}
        onDelete={() => onDelete(product.id)}
      />
    </Card>
  );
}
