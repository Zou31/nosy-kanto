"use client";

import { useState } from "react";
import { PRODUCTS, type Product } from "../../data/products";
import type { ProductFormData } from "../../types/productForms";
import { buildProduct } from "../../lib/products/productService";

import ProductsList from "./ProductsList";
import ProductForm from "./ProductForm";
import SearchBar from "../ui/SearchBar";
import ActionButton from "../ui/ActionButton";
import Modal from "../ui/Modal";
import ConfirmModal from "../ui/ConfirmModal";
import { useERP } from "../../context/ERPContext";
import { createInitialStockForVariant } from "../../lib/createInitialStockForVariant";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductsManager() {
 const {
  products,
  setProducts,
  stock,
  setStock,
  movements,
} = useERP();


  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [pendingUploadedImages, setPendingUploadedImages] =
  useState<string[]>([]);


  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

async function handleCreate(data: ProductFormData) {
  const newProduct = buildProduct(data);

 try {
    const res = await fetch("/api/erp/products/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const contentType = res.headers.get("content-type");

const result = contentType?.includes("application/json")
  ? await res.json()
  : {
      error: `Erreur serveur (${res.status})`,
    };

if (!res.ok) {

      console.error(
        "Erreur création produit Supabase :",
        result
      );

      alert(
  result?.error?.includes("23505") ||
  result?.error?.includes("products_slug_key")
    ? "Cette adresse URL est déjà utilisée par un autre produit. Choisissez un autre slug."
    : "Le produit n'a pas pu être enregistré dans Supabase."
);

      return;
    }

    console.log(
      "Création produit Supabase OK :",
      result
    );
  } catch (error) {
    console.error(
      "Erreur réseau création produit Supabase :",
      error
    );

    alert(
      "Le produit n'a pas pu être enregistré dans Supabase."
    );

    return;
  }
  
  const initialStock =
    createInitialStockForVariant(newProduct);

  setProducts((previous) => [
    newProduct,
    ...previous,
  ]);

  setStock((previous) => [
    ...previous,
    ...initialStock,
  ]);

  setPendingUploadedImages([]);
  setIsOpen(false);
}

  async function handleSave(data: ProductFormData) {
    if (!editingProduct) {
      handleCreate(data);
      return;
    }
    const previousVariantIds = new Set(
  (editingProduct.variants ?? []).map(
    (variant) => variant.id
  )
);

const addedVariants =
  (data.variants ?? []).filter(
    (variant) =>
      !previousVariantIds.has(variant.id)
  );

  const nextVariantIds = new Set(
  (data.variants ?? []).map(
    (variant) => variant.id
  )
);

const removedVariants =
  (editingProduct.variants ?? []).filter(
    (variant) =>
      !nextVariantIds.has(variant.id)
  );

  const blockedVariant = removedVariants.find((variant) => {
  const hasStock = stock.some(
    (item) =>
      item.productId === editingProduct.id &&
      item.variantId === variant.id &&
      item.quantity > 0
  );

  const hasMovements = movements.some(
    (movement) =>
      movement.productId === editingProduct.id &&
      movement.variantId === variant.id
  );

  return hasStock || hasMovements;
});

if (blockedVariant) {
  alert(
    `Impossible de supprimer la variante "${
      blockedVariant.name ?? blockedVariant.color
    }". Elle possède encore du stock ou un historique de mouvements. Passe-la plutôt en statut "Arrêté".`
  );

  return;
}

console.log(
  "VARIANTES AU MOMENT DE SAUVEGARDER :",
  data.variants
);

const productToSync = {
  ...editingProduct,
  slug: data.slug?.trim() || editingProduct.slug,
  name: data.name,
  price: data.price,
  category: data.category,
  status: data.status,
  short: data.short,
  description: data.description,
  seoTitle: data.seoTitle,
  seoDescription: data.seoDescription,
  material: data.material,
  dimensions: data.dimensions,
  image: data.image,
  images: data.images ?? editingProduct.images ?? [],
  collection: data.collection,
  referenceCode: data.referenceCode,
  costPrice: data.costPrice,
  stock: data.stock,
  stockMin: data.stockMin,
  weightGrams: data.weightGrams,
  originCountry: data.originCountry,
  handmade: data.handmade,
  artisanPartner: data.artisanPartner,
  variants: data.variants,
};

try {
 const res = await fetch("/api/erp/products/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productToSync),
  });

  const contentType = res.headers.get("content-type");

const result = contentType?.includes("application/json")
  ? await res.json()
  : {
      error: `Erreur serveur (${res.status})`,
    };

if (!res.ok) {
  console.error("Erreur synchro Supabase :", result);

  alert(
    "La modification n'a pas pu être enregistrée. Aucune modification n'a été appliquée."
  );

  return;
}

console.log("Synchro Supabase OK :", result);

setProducts((previous) =>
  previous.map((product) =>
    product.id === editingProduct.id
      ? {
          ...product,
          name: data.name,
          price: data.price,
          category: data.category,
          status: data.status,
          short: data.short,
          description: data.description,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          material: data.material,
          dimensions: data.dimensions,
          image: data.image,
          images: data.images ?? product.images ?? [],
          collection: data.collection,
          referenceCode: data.referenceCode,
          costPrice: data.costPrice,
          stock: data.stock,
          stockMin: data.stockMin,
          weightGrams: data.weightGrams,
          originCountry: data.originCountry,
          handmade: data.handmade,
          artisanPartner: data.artisanPartner,
          variants: data.variants,
        }
      : product
  )
);

setStock((previous) => {
  const removedVariantIds = new Set(
    removedVariants.map((variant) => variant.id)
  );

  const updatedExistingStock = previous
    .filter(
      (item) =>
        !(
          item.productId === editingProduct.id &&
          item.variantId &&
          removedVariantIds.has(item.variantId)
        )
    )
    .map((item) => {
      if (item.productId !== editingProduct.id) {
        return item;
      }

      const updatedVariant = (data.variants ?? []).find(
        (variant) => variant.id === item.variantId
      );

      if (!item.variantId) {
        return {
          ...item,
          name: data.name,
          quantity:
            item.location === "Maison"
              ? data.stock ?? item.quantity
              : item.quantity,
          alertLevel: data.stockMin ?? item.alertLevel,
          updatedAt: new Date().toISOString(),
        };
      }

      if (!updatedVariant) {
        return item;
      }

      return {
        ...item,
        name: `${data.name} - ${updatedVariant.color}`,
        quantity: updatedVariant.stock ?? item.quantity,
        alertLevel: updatedVariant.stockMin ?? item.alertLevel,
        updatedAt: new Date().toISOString(),
      };
    });

  const generatedStock = createInitialStockForVariant({
    ...editingProduct,
    name: data.name,
    variants: data.variants,
  });

  const missingStock = generatedStock.filter(
    (generated) =>
      !updatedExistingStock.some(
        (item) =>
          item.productId === generated.productId &&
          item.variantId === generated.variantId &&
          item.location === generated.location
      )
  );

  return [
    ...updatedExistingStock,
    ...missingStock,
  ];
});

  for (const imageUrl of data.imagesToDelete ?? []) {
  try {
   const deleteRes = await fetch("/api/product-images/delete", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ url: imageUrl }),
});

const deleteResult = await deleteRes.json();

if (!deleteRes.ok) {
  console.error(
    "Erreur suppression image Storage :",
    deleteResult
  );
}

  } catch (error) {
    console.error(
      "Erreur nettoyage image Storage :",
      error
    );
  }
}

} catch (error) {
  console.error("Erreur synchro Supabase :", error);
  return;
}
    setPendingUploadedImages([]);
    setEditingProduct(null);
    setIsOpen(false);
  }

  function handleEdit(id: string) {
    const product = products.find((product) => product.id === id);

    if (!product) return;

    setEditingProduct(product);
    setIsOpen(true);
  }

  function handleDelete(id: string) {
    const product = products.find((product) => product.id === id);

    if (!product) return;

    setProductToDelete(product);
    setIsDeleteOpen(true);
  }

 async function confirmDelete() {
  if (!productToDelete) return;

  const productImagesToDelete = [
    productToDelete.image,
    ...(productToDelete.images ?? []),
    ...(productToDelete.variants ?? []).flatMap((variant) => [
      variant.image,
      ...(variant.images ?? []),
    ]),
  ].filter(
    (url): url is string =>
      Boolean(url) &&
      url.includes(
        "/storage/v1/object/public/product-images/"
      )
  );

  const hasStock = stock.some(
    (item) =>
      item.productId === productToDelete.id &&
      item.quantity > 0
  );

  const hasMovements = movements.some(
    (movement) =>
      movement.productId === productToDelete.id
  );

  if (hasStock || hasMovements) {
    alert(
      `Impossible de supprimer "${productToDelete.name}". Ce produit possède encore du stock ou un historique de mouvements. Passe-le plutôt en statut "Arrêté".`
    );

    setProductToDelete(null);
    setIsDeleteOpen(false);
    return;
  }

  try {
    const response = await fetch("/api/erp/products/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productToDelete.id,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error(
        "Erreur suppression produit Supabase :",
        result
      );

      alert(
        "La suppression du produit a échoué. Le produit n'a pas été supprimé."
      );

      return;
    }

    console.log(
      "Produit supprimé de Supabase :",
      result
    );

    setProducts((previous) =>
      previous.filter(
        (product) => product.id !== productToDelete.id
      )
    );

    setStock((previous) =>
      previous.filter(
        (item) => item.productId !== productToDelete.id
      )
    );

    for (const imageUrl of productImagesToDelete) {
      try {
        const deleteRes = await fetch(
          "/api/product-images/delete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: imageUrl,
            }),
          }
        );

        const deleteResult = await deleteRes.json();

        if (!deleteRes.ok) {
          console.error(
            "Erreur suppression image du produit :",
            deleteResult
          );
        }
      } catch (error) {
        console.error(
          "Erreur nettoyage image du produit :",
          error
        );
      }
    }

    setProductToDelete(null);
    setIsDeleteOpen(false);
  } catch (error) {
    console.error(
      "Erreur réseau suppression produit Supabase :",
      error
    );

    alert(
      "La suppression du produit a échoué. Le produit n'a pas été supprimé."
    );
  }
}

  async function handleCloseModal() {
  for (const imageUrl of pendingUploadedImages) {
    try {
      const deleteRes = await fetch("/api/product-images/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      const deleteResult = await deleteRes.json();

      if (!deleteRes.ok) {
        console.error(
          "Erreur nettoyage image annulée :",
          deleteResult
        );
      }
    } catch (error) {
      console.error(
        "Erreur nettoyage image annulée :",
        error
      );
    }
  }

  setPendingUploadedImages([]);
  setEditingProduct(null);
  setIsOpen(false);
}

  const filteredProducts = products.filter((product) => {
  const text = [
    product.name ?? "",
    product.category ?? "",
    product.short ?? "",
    product.description ?? "",
    product.tags?.join(" ") ?? "",
    product.collection ?? "",
    product.sku ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return text.includes(search.trim().toLowerCase());
});


    return (
    <div>
      <div className="mb-6">
        <ActionButton
          icon="📦"
          label="Nouveau produit"
          onClick={() => {
            setEditingProduct(null);
            setIsOpen(true);
          }}
        />
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un produit..."
      />

      <p className="mb-6 text-neutral-600">
        {filteredProducts.length} produit(s)
      </p>

      <ProductsList
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isOpen && (
        <Modal
          title={
            editingProduct
              ? "✏️ Modifier le produit"
              : "📦 Nouveau produit"
          }
          onClose={handleCloseModal}
        >
          <ProductForm
          key={editingProduct?.id ?? "new-product"}
            onCreate={handleSave}
            onUploadedImagesChange={setPendingUploadedImages}
            initialData={
              editingProduct
                ? {
                    name: editingProduct.name,
                    price: editingProduct.price,
                    category: editingProduct.category,
                    status: editingProduct.status ?? "Brouillon",
                    short: editingProduct.short ?? "",
                    description: editingProduct.description,

                   // Référencement Google (SEO)
                    seoTitle: editingProduct.seoTitle ?? "",
                    seoDescription: editingProduct.seoDescription ?? "",
                    slug: editingProduct.slug,

                    material: editingProduct.material ?? "",
                    dimensions: editingProduct.dimensions ?? "",
                    image: editingProduct.image,
                    images: editingProduct.images ?? [],
                    collection: editingProduct.collection ?? "",
                    referenceCode: editingProduct.referenceCode ?? "",
                    costPrice: editingProduct.costPrice ?? 0,
                    stock: editingProduct.stock ?? 0,
                    stockMin: editingProduct.stockMin ?? 0,
                    weightGrams: editingProduct.weightGrams ?? 0,
                    originCountry:
                      editingProduct.originCountry ?? "Madagascar",
                    handmade: editingProduct.handmade ?? true,
                    artisanPartner:
                      editingProduct.artisanPartner ??
                      "Artisans partenaires Nosy Kanto",
                    variants: (editingProduct.variants ?? []).map((variant) => ({
                    id: variant.id,
                    name: variant.name ?? "",
                    sku: variant.sku ?? "",
                    color: variant.color,
                    price: variant.price ?? 0,
                    costPrice: variant.costPrice ?? 0,
                    stock: variant.stock ?? 0,
                    stockMin: variant.stockMin ?? 0,
                    status: variant.status ?? "En vente",
                    location: variant.location ?? "",
                    barcode: variant.barcode ?? "",
                    isDefault: variant.isDefault ?? false,
                    weightGrams: variant.weightGrams ?? 0,
                    image: variant.image,
                    images: variant.images ?? [],
                    dimensions: {
                       lengthCm: variant.dimensions?.lengthCm ?? 0,
                       widthCm: variant.dimensions?.widthCm ?? 0,
                       heightCm: variant.dimensions?.heightCm ?? 0,
                    },

                  })),
 
                  }
                : undefined
            }
          />
        </Modal>
      )}

      {isDeleteOpen && productToDelete && (
        <ConfirmModal
          title="Supprimer le produit"
          message={`Voulez-vous vraiment supprimer "${productToDelete.name}" ?`}
          onConfirm={confirmDelete}
          onCancel={() => {
            setProductToDelete(null);
            setIsDeleteOpen(false);
          }}
        />
      )}
    </div>
  );
}
