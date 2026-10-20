"use client";

import { useState } from "react";
import Button from "../ui/Button";

type VariantFormData = {
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

};

type VariantsManagerProps = {
  initialVariants?: VariantFormData[];
  onChange?: (variants: VariantFormData[]) => void;
  onImageDelete?: (url: string) => void;
  onImageUpload?: (url: string) => void;
};

export default function VariantsManager({
  initialVariants = [],
  onChange,
  onImageDelete,
  onImageUpload,
}: VariantsManagerProps) {

  const [variants, setVariants] =
    useState<VariantFormData[]>(initialVariants);

  const [expandedVariantIds, setExpandedVariantIds] =
  useState<string[]>([]);

 function addVariant() {
  const newVariant: VariantFormData = {
    id: Date.now().toString(),
    name: "",
    sku: "",
    color: "",
    price: 0,
    costPrice: 0,
    stock: 0,
    stockMin: 0,
    status: "En vente",
    location: "",
    barcode: "",
    isDefault: false,
    weightGrams: 0,
    image: "",
    images: [],
    dimensions: {
      lengthCm: 0,
      heightCm: 0,
      widthCm: 0,
    },
  };

  const nextVariants = [
    ...variants,
    newVariant,
  ];

  setVariants(nextVariants);
  onChange?.(nextVariants);
}

 function removeVariant(variantId: string) {
  const variantToRemove = variants.find(
    (variant) => variant.id === variantId
  );

  if (variantToRemove) {
    const variantImages = [
      variantToRemove.image,
      ...(variantToRemove.images ?? []),
    ].filter(Boolean);

    variantImages.forEach((url) => {
      if (
        url.includes(
          "/storage/v1/object/public/product-images/"
        )
      ) {
        onImageDelete?.(url);
      }
    });
  }

  const nextVariants = variants.filter(
    (variant) => variant.id !== variantId
  );

  setVariants(nextVariants);
  onChange?.(nextVariants);
}

async function handleVariantMainImageUpload(
  variantId: string,
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  const currentVariant = variants.find(
  (variant) => variant.id === variantId
);

const previousImage = currentVariant?.image ?? "";

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/product-images", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.url) {
      throw new Error(
        result.error || "Erreur lors de l'envoi de l'image."
      );
    }

    if (
  previousImage.includes(
    "/storage/v1/object/public/product-images/"
  )
) {
  onImageDelete?.(previousImage);
}
onImageUpload?.(result.url);

    updateVariant(variantId, "image", result.url);
  } catch (error) {
    console.error(
      "Erreur upload photo principale variante :",
      error
    );
  } finally {
    event.target.value = "";
  }
}

async function handleVariantAdditionalImagesUpload(
  variantId: string,
  event: React.ChangeEvent<HTMLInputElement>
) {
  const files = Array.from(event.target.files ?? []);

  if (files.length === 0) return;

  try {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/product-images", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.url) {
        throw new Error(
          result.error || "Erreur lors de l'envoi d'une image."
        );
      }

      uploadedUrls.push(result.url);
      onImageUpload?.(result.url);
    }

    const currentVariant = variants.find(
      (variant) => variant.id === variantId
    );

    updateVariant(
      variantId,
      "images",
      [
        ...(currentVariant?.images ?? []),
        ...uploadedUrls,
      ]
    );
  } catch (error) {
    console.error(
      "Erreur upload photos supplémentaires variante :",
      error
    );
  } finally {
    event.target.value = "";
  }
}

function updateVariant(
  variantId: string,
  field: keyof VariantFormData,
  value: string | number | string[]
) {
  const nextVariants = variants.map((variant) =>
    variant.id === variantId
      ? {
          ...variant,
          [field]: value,
        }
      : variant
  );

  setVariants(nextVariants);
  onChange?.(nextVariants);
}

function updateVariantDimensions(
  variantId: string,
  field: "lengthCm" | "heightCm" | "widthCm",
  value: number
) {
  const nextVariants = variants.map((variant) =>
    variant.id === variantId
      ? {
          ...variant,
          dimensions: {
            ...variant.dimensions,
            [field]: value,
          },
        }
      : variant
  );

  setVariants(nextVariants);
  onChange?.(nextVariants);
}

function setDefaultVariant(variantId: string) {
  const nextVariants = variants.map((variant) => ({
    ...variant,
    isDefault: variant.id === variantId,
  }));

  setVariants(nextVariants);
  onChange?.(nextVariants);
}

function toggleVariant(variantId: string) {
  setExpandedVariantIds((previous) =>
    previous.includes(variantId)
      ? previous.filter((id) => id !== variantId)
      : [...previous, variantId]
  );
}

function getStatusClass(status: VariantFormData["status"]) {
  switch (status) {
    case "En vente":
      return "bg-green-50 text-green-700 border-green-200";

    case "En pause":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "Brouillon":
      return "bg-neutral-100 text-neutral-600 border-neutral-200";

    case "En développement":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "Arrêté":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-neutral-50 text-neutral-600 border-neutral-200";
  }
}

  const inputClass =
    "mt-1 w-full rounded-xl border border-neutral-300 bg-white p-3 outline-none transition focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/20";

  const labelClass =
    "block text-sm font-medium text-[#4A2B1A]";

    function getStockStatus(stock: number, stockMin: number) {
  if (stock === 0) {
    return "🔴 Rupture";
  }

  if (stock <= stockMin) {
    return "🟠 Stock faible";
  }

  return "🟢 En stock";
}

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-[#4A2B1A]">
          Variantes
        </h3>

        <p className="text-sm text-neutral-500">
          Gérez les différentes versions de ce produit.
        </p>
      </div>

      <Button onClick={addVariant}>
        ➕ Ajouter une variante
      </Button>

      {variants.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-5 text-sm text-neutral-500">
          Aucune variante enregistrée.
        </div>
      ) : (
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div
              key={variant.id}
              className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5"
            >
             <div className="flex items-start justify-between gap-4">
  <div>
    <h4 className="font-semibold text-[#4A2B1A]">
      Variante {index + 1}
    </h4>

    <button
      type="button"
      onClick={() => setDefaultVariant(variant.id)}
      className="mt-1 text-sm font-medium text-[#8A5A3B] hover:underline"
    >
      {variant.isDefault
        ? "⭐ Variante par défaut"
        : "☆ Définir comme variante par défaut"}
    </button>
    
    <div className="mt-2 space-y-1 text-sm">
  <p className="font-medium text-[#4A2B1A]">
    {variant.name || "Sans nom"}
    {variant.sku ? ` — ${variant.sku}` : ""}
  </p>

  <p className="text-neutral-600">
    {variant.color || "Couleur non définie"}
    {" • "}
    {variant.price.toFixed(2)} €
  </p>

  <p className="text-neutral-600">
    Stock : {variant.stock}
    {" • "}
    Mini : {variant.stockMin}
  </p>

 <div className="flex items-center gap-2">
  <span className="text-neutral-600">
    Statut :
  </span>

  <span
    className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
      variant.status
    )}`}
  >
    {variant.status}
  </span>
</div>

</div>

    <span className="mt-2 inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold">
  {getStockStatus(
    variant.stock,
    variant.stockMin
  )}
</span>

  </div>

  <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={() => toggleVariant(variant.id)}
      className="text-sm font-medium text-[#8A5A3B] hover:underline"
    >
      {expandedVariantIds.includes(variant.id)
        ? "▲ Replier"
        : "▼ Déplier"}
    </button>

    <button
      type="button"
      onClick={() => removeVariant(variant.id)}
      className="text-sm font-medium text-red-600 hover:underline"
    >
      🗑 Supprimer
    </button>
  </div>
</div>

             {expandedVariantIds.includes(variant.id) && (
              <div className="grid gap-4 md:grid-cols-2">

                <div>
                  <label className={labelClass}>
                    Nom
                  </label>

                  <input
                        value={variant.name}
                        onChange={(event) =>
                        updateVariant(
                        variant.id,
                           "name",
                        event.target.value
                )
                }
                   className={inputClass}
                   placeholder="Ex : Compact"
                  />

                </div>

                <div>
                  <label className={labelClass}>
                    SKU
                  </label>

                 <input
  value={variant.sku}
  onChange={(event) =>
    updateVariant(
      variant.id,
      "sku",
      event.target.value
    )
  }
  className={inputClass}
  placeholder="Ex : NK-RAV-COM"
/>

                </div>

                <div>
                  <label className={labelClass}>
                    Couleur
                  </label>

                 <input
  value={variant.color}
  onChange={(event) =>
    updateVariant(
      variant.id,
      "color",
      event.target.value
    )
  }
  className={inputClass}
  placeholder="Ex : Camel"
/>

                </div>

                <div>
                  <label className={labelClass}>
                    Prix (€)
                  </label>

                 <input
  type="number"
  min="0"
  step="0.01"
  value={variant.price}
  onChange={(event) =>
    updateVariant(
      variant.id,
      "price",
      Number(event.target.value)
    )
  }
  className={inputClass}
/>             
              </div>

 <div>
  <label className={labelClass}>
    Coût de revient (€)
  </label>

  <input
    type="number"
    min="0"
    step="0.01"
    value={variant.costPrice}
    onChange={(event) =>
      updateVariant(
        variant.id,
        "costPrice",
        Number(event.target.value)
      )
    }
    className={inputClass}
  />
</div>

<div>
 <label className={labelClass}>
  Stock initial
</label>

<p className="mt-1 text-xs text-neutral-500">
  Après création, les quantités se gèrent dans le module Stock.
</p>

<input
  type="number"
  min="0"
  value={variant.stock}
  onChange={(event) =>
    updateVariant(
      variant.id,
      "stock",
      Number(event.target.value)
    )
  }
  className={inputClass}
/>

</div>

<div>
  <label className={labelClass}>
    Stock minimum
  </label>

  <input
    type="number"
    min="0"
    value={variant.stockMin}
    onChange={(event) =>
      updateVariant(
        variant.id,
        "stockMin",
        Number(event.target.value)
      )
    }
    className={inputClass}
  />
</div>

<div>
  <label className={labelClass}>
    Statut de la variante
  </label>

  <select
    value={variant.status}
    onChange={(event) =>
      updateVariant(
        variant.id,
        "status",
        event.target.value
      )
    }
    className={inputClass}
  >
    <option value="Brouillon">Brouillon</option>
    <option value="En développement">En développement</option>
    <option value="En vente">En vente</option>
    <option value="En pause">En pause</option>
    <option value="Arrêté">Arrêté</option>
  </select>
</div>

<div>
  <label className={labelClass}>
    Emplacement du stock
  </label>

  <input
    value={variant.location}
    onChange={(event) =>
      updateVariant(
        variant.id,
        "location",
        event.target.value
      )
    }
    className={inputClass}
    placeholder="Ex : Réserve - Étagère A2"
  />
</div>

<div>
  <label className={labelClass}>
    Photos supplémentaires
  </label>

  <input
    type="file"
    accept="image/*"
    multiple
    onChange={(event) =>
      handleVariantAdditionalImagesUpload(
        variant.id,
        event
      )
    }
    className={inputClass}
  />

  {(variant.images ?? []).length > 0 && (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {(variant.images ?? []).map((photo, imageIndex) => (
        <div
          key={`${photo}-${imageIndex}`}
          className="rounded-xl border border-neutral-200 bg-white p-2"
        >
          <img
            src={photo}
            alt={`Photo supplémentaire ${imageIndex + 1}`}
            className="h-32 w-full object-contain"
          />

          <button
            type="button"
            onClick={() => {
              if (
                photo.includes(
                  "/storage/v1/object/public/product-images/"
               )
             ) {
               onImageDelete?.(photo);
             }

             updateVariant(
               variant.id,
                "images",
                (variant.images ?? []).filter(
                  (_, index) => index !== imageIndex
                )
             );
           }}

            className="mt-2 w-full rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  )}
</div>

<div>
  <label className={labelClass}>
    Code-barres
  </label>

  <input
    value={variant.barcode}
    onChange={(event) =>
      updateVariant(
        variant.id,
        "barcode",
        event.target.value
      )
    }
    className={inputClass}
    placeholder="Ex : 3760123456789"
  />
</div>

<div>
  <label className={labelClass}>
    Poids (g)
  </label>

  <input
    type="number"
    min="0"
    value={variant.weightGrams}
    onChange={(event) =>
      updateVariant(
        variant.id,
        "weightGrams",
        Number(event.target.value)
      )
    }
    className={inputClass}
  />
</div>

<div>
  <label className={labelClass}>
    Longueur (cm)
  </label>

  <input
    type="number"
    min="0"
    value={variant.dimensions.lengthCm}
    onChange={(event) =>
      updateVariantDimensions(
        variant.id,
        "lengthCm",
        Number(event.target.value)
      )
    }
    className={inputClass}
  />
</div>

<div>
  <label className={labelClass}>
    Hauteur (cm)
  </label>

  <input
    type="number"
    min="0"
    value={variant.dimensions.heightCm}
    onChange={(event) =>
      updateVariantDimensions(
        variant.id,
        "heightCm",
        Number(event.target.value)
      )
    }
    className={inputClass}
  />
</div>

<div>
  <label className={labelClass}>
    Largeur (cm)
  </label>

  <input
    type="number"
    min="0"
    value={variant.dimensions.widthCm}
    onChange={(event) =>
      updateVariantDimensions(
        variant.id,
        "widthCm",
        Number(event.target.value)
      )
    }
    className={inputClass}
  />
</div>

<div>
  <label className={labelClass}>
    Photo principale de la variante
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(event) =>
      handleVariantMainImageUpload(
        variant.id,
        event
      )
    }
    className={inputClass}
  />

  {variant.image && (
  <div className="mt-4">
    <img
      src={variant.image}
      alt="Photo principale de la variante"
      className="h-40 w-40 rounded-xl border border-neutral-200 bg-white object-contain p-2"
    />

    <button
      type="button"
      onClick={() => {
        if (
          variant.image.includes(
            "/storage/v1/object/public/product-images/"
          )
        ) {
          onImageDelete?.(variant.image);
        }

        updateVariant(
          variant.id,
          "image",
          ""
        );
      }}
      className="mt-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Supprimer la photo principale
    </button>
  </div>
)}

</div>

              </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
