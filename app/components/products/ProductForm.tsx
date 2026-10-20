"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import type { ProductFormData } from "../../types/productForms";
import VariantsManager from "./VariantsManager";


type ProductFormProps = {
  onCreate: (data: ProductFormData) => Promise<void>;
  initialData?: ProductFormData;
  onUploadedImagesChange?: (images: string[]) => void;
};

export default function ProductForm({
  onCreate,
  initialData,
  onUploadedImagesChange,
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const [collection, setCollection] = useState(
    initialData?.collection ?? ""
  );

  const [referenceCode, setReferenceCode] = useState(
  initialData?.referenceCode ?? ""
);

const [status, setStatus] =
  useState<ProductFormData["status"]>(
    initialData?.status ?? "Brouillon"
  );


  const [category, setCategory] = useState<
    ProductFormData["category"]
  >(initialData?.category ?? "Sacs & accessoires");

  const [price, setPrice] = useState(initialData?.price ?? 0);
  const [costPrice, setCostPrice] = useState(
    initialData?.costPrice ?? 0
  );

  const [stock, setStock] = useState(
  initialData?.stock ?? 0
  );

  const [stockMin, setStockMin] = useState(
  initialData?.stockMin ?? 0
  ); 

  const [short, setShort] = useState(initialData?.short ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  // Référencement Google (SEO)
const [seoTitle, setSeoTitle] = useState(
  initialData?.seoTitle ?? ""
);

const [seoDescription, setSeoDescription] = useState(
  initialData?.seoDescription ?? ""
);

const [slug, setSlug] = useState(
  initialData?.slug ?? ""
);

  const [material, setMaterial] = useState(
    initialData?.material ?? ""
  );

  const [dimensions, setDimensions] = useState(
    initialData?.dimensions ?? ""
  );

  const [weightGrams, setWeightGrams] = useState(
    initialData?.weightGrams ?? 0
  );

  const [originCountry, setOriginCountry] = useState(
    initialData?.originCountry ?? "Madagascar"
  );

  const [handmade, setHandmade] = useState(
    initialData?.handmade ?? true
  );

  const [artisanPartner, setArtisanPartner] = useState(
    initialData?.artisanPartner ?? "Artisans partenaires Nosy Kanto"
  );

  const [image, setImage] = useState(initialData?.image ?? "");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [images, setImages] = useState<string[]>(
  initialData?.images ?? []
);

const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [variants, setVariants] = useState(
  initialData?.variants ?? []
);

useEffect(() => {
  onUploadedImagesChange?.(uploadedImages);
}, [uploadedImages, onUploadedImagesChange]);

useEffect(() => {
  if (!initialData) return;

  setName(initialData.name ?? "");
  setCollection(initialData.collection ?? "");
  setReferenceCode(initialData.referenceCode ?? "");
  setStatus(initialData.status ?? "Brouillon");
  setCategory(initialData.category ?? "Sacs & accessoires");

  setPrice(initialData.price ?? 0);
  setCostPrice(initialData.costPrice ?? 0);
  setStock(initialData.stock ?? 0);
  setStockMin(initialData.stockMin ?? 0);

  setShort(initialData.short ?? "");
setDescription(initialData.description ?? "");

// Référencement Google (SEO)
setSeoTitle(initialData.seoTitle ?? "");
setSeoDescription(initialData.seoDescription ?? "");
setSlug(initialData.slug ?? "");

setMaterial(initialData.material ?? "");

  setDimensions(initialData.dimensions ?? "");
  setWeightGrams(initialData.weightGrams ?? 0);
  setOriginCountry(initialData.originCountry ?? "Madagascar");
  setHandmade(initialData.handmade ?? true);
  setArtisanPartner(
    initialData.artisanPartner ?? "Artisans partenaires Nosy Kanto"
  );
  setImage(initialData.image ?? "");
  setImages(initialData.images ?? []);
  setVariants(initialData.variants ?? []);
}, []);

async function handleMainImageUpload(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  const previousImage = image;

  setIsUploadingImage(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/product-images", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erreur lors de l'envoi de l'image.");
    }
    if (
  previousImage.includes(
    "/storage/v1/object/public/product-images/"
  )
) {
  setImagesToDelete((current) => [
    ...current,
    previousImage,
  ]);
}
setUploadedImages((current) => [
  ...current,
  result.url,
]);

    setImage(result.url);
  } catch (error) {
    console.error("Erreur upload photo principale :", error);
  } finally {
    setIsUploadingImage(false);
    event.target.value = "";
  }
}

async function handleAdditionalImagesUpload(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const files = Array.from(event.target.files ?? []);

  if (files.length === 0) return;

  setIsUploadingImage(true);

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

      setUploadedImages((current) => [
         ...current,
         result.url,
       ]);
    }
    setImages((currentImages) => [
      ...currentImages,
      ...uploadedUrls,
    ]);
  } catch (error) {
    console.error(
      "Erreur upload photos supplémentaires :",
      error
    );
  } finally {
    setIsUploadingImage(false);
    event.target.value = "";
  }
}

async function deleteProductImage(url: string) {
  const response = await fetch("/api/product-images/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Erreur lors de la suppression de l'image."
    );
  }
}

  async function handleSubmit() {
    if (!name.trim()) return;

    if (isSaving) return;

    setIsSaving(true);

    try {
    await onCreate({
      name: name.trim(),
      collection: collection.trim() || undefined,
      category,
      price,
      costPrice: costPrice || undefined,
      stock,
      stockMin,
      short: short.trim(),
      description: description.trim(),

     // Référencement Google (SEO)
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
      slug: slug.trim(),

      material: material.trim(),

      dimensions: dimensions.trim(),
      weightGrams: weightGrams || undefined,
      originCountry: originCountry.trim() || undefined,
      handmade,
      artisanPartner: artisanPartner.trim() || undefined,
      image: image.trim(),
      images,
      imagesToDelete,
      uploadedImages,
      variants,
      referenceCode:
      referenceCode.trim() || undefined,

      status,

    });

    } finally {
        setIsSaving(false);
    }

    if (!initialData) {
      setName("");
      setCollection("");
      setReferenceCode("");
      setStatus("Brouillon");
      setCategory("Sacs & accessoires");
      setPrice(0);
      setCostPrice(0);
      setStock(0);
      setStockMin(0);
      setShort("");
      setDescription("");
      setMaterial("");
      setDimensions("");
      setWeightGrams(0);
      setOriginCountry("Madagascar");
      setHandmade(true);
      setArtisanPartner("Artisans partenaires Nosy Kanto");
      setImage("");
      setImages([]);
      setVariants([]);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-neutral-300 bg-white p-3 outline-none transition focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/20";

  const labelClass =
    "block text-sm font-medium text-[#4A2B1A]";

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
         <h3 className="text-lg font-semibold text-[#4A2B1A]">
             Identité
         </h3>

          <p className="text-sm text-neutral-500">
            Informations principales de la référence.
          </p>
        </div>

        <div>
          <label className={labelClass}>
            Nom du produit *
          </label>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
            placeholder="Ex : Sac Ravo"
          />
        </div>

        <div>
  <label className={labelClass}>
    Référence interne
  </label>

  <input
    value={referenceCode}
    onChange={(event) =>
      setReferenceCode(event.target.value)
    }
    className={inputClass}
    placeholder="Ex : NK-SAC-RAV"
  />
</div>

        <div>
          <label className={labelClass}>
            Collection
          </label>

          <input
            value={collection}
            onChange={(event) => setCollection(event.target.value)}
            className={inputClass}
            placeholder="Ex : Ravo"
          />
        </div>

        <div>
          <label className={labelClass}>
            Catégorie
          </label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value as ProductFormData["category"]
              )
            }
            className={inputClass}
          >
            <option value="Sacs & accessoires">
              Sacs & accessoires
            </option>
            <option value="Bijoux">Bijoux</option>
            <option value="Décoration">Décoration</option>
            <option value="Épices">Épices</option>
          </select>
        </div>
        <div>
  <label className={labelClass}>
    Statut du produit
  </label>

  <select
    value={status}
    onChange={(event) =>
      setStatus(
        event.target.value as ProductFormData["status"]
      )
    }
    className={inputClass}
  >
    <option value="Brouillon">Brouillon</option>
    <option value="En développement">
      En développement
    </option>
    <option value="En vente">En vente</option>
    <option value="En pause">En pause</option>
    <option value="Arrêté">Arrêté</option>
  </select>
</div>

      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#4A2B1A]">
            Vente
          </h3>
          <p className="text-sm text-neutral-500">
            Prix de vente et coût du produit.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Prix de vente (€)
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) =>
                setPrice(Number(event.target.value))
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
              value={costPrice}
              onChange={(event) =>
                setCostPrice(Number(event.target.value))
              }
              className={inputClass}
            />
          </div>
        </div>

            {variants.length === 0 && (
  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <label className={labelClass}>
        Stock
      </label>

      <input
        type="number"
        min="0"
        step="1"
        value={stock}
        onChange={(event) =>
          setStock(Number(event.target.value))
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
        step="1"
        value={stockMin}
        onChange={(event) =>
          setStockMin(Number(event.target.value))
        }
        className={inputClass}
      />
    </div>
  </div>
)}

      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#4A2B1A]">
            Description
          </h3>
          <p className="text-sm text-neutral-500">
            Contenu utilisé pour la fiche produit et le site.
          </p>
        </div>

        <div>
          <label className={labelClass}>
            Description courte
          </label>

          <input
            value={short}
            onChange={(event) => setShort(event.target.value)}
            className={inputClass}
            placeholder="Ex : Sac artisanal en raphia fait main à Madagascar"
          />
        </div>

        <div>
          <label className={labelClass}>
            Description complète
          </label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            className={inputClass}
            rows={5}
          />
        </div>
      </section>

      <section className="space-y-4">
  <div>
    <h3 className="text-lg font-semibold text-[#4A2B1A]">
      Référencement Google (SEO)
    </h3>
    <p className="text-sm text-neutral-500">
      Informations destinées aux moteurs de recherche.
    </p>
  </div>

  <div>
    <label className={labelClass}>Titre SEO</label>
    <input
      value={seoTitle}
      onChange={(event) => setSeoTitle(event.target.value)}
      className={inputClass}
      placeholder="Ex : Artisanat malgache fait main | Nosy Kanto"
      maxLength={70}
    />
  </div>

  <div>
    <label className={labelClass}>Méta-description</label>
    <textarea
      value={seoDescription}
      onChange={(event) => setSeoDescription(event.target.value)}
      className={inputClass}
      rows={3}
      maxLength={160}
      placeholder="Décrivez votre produit pour les résultats Google."
    />
  </div>

  <div>
    <label className={labelClass}>Slug (adresse URL)</label>
    <input
  value={slug}
  onChange={(event) => setSlug(event.target.value)}
  readOnly={false}
  className={inputClass}
  placeholder="Ex : camion-pompiers-miniature-artisanal-madagascar"
/>
    <p className="mt-1 text-xs text-amber-700">
      Ne modifiez pas l'adresse des produits déjà publiés.
    </p>
  </div>
</section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#4A2B1A]">
            Caractéristiques
          </h3>
          <p className="text-sm text-neutral-500">
            Matières, dimensions et poids du produit.
          </p>
        </div>

        <div>
          <label className={labelClass}>
            Matières
          </label>

          <input
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
            className={inputClass}
            placeholder="Ex : Raphia naturel et cuir de vachette"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Dimensions
            </label>

            <input
              value={dimensions}
              onChange={(event) =>
                setDimensions(event.target.value)
              }
              className={inputClass}
              placeholder="Ex : 40 × 36 × 11 cm"
            />
          </div>

          <div>
            <label className={labelClass}>
              Poids en grammes
            </label>

            <input
              type="number"
              min="0"
              value={weightGrams}
              onChange={(event) =>
                setWeightGrams(Number(event.target.value))
              }
              className={inputClass}
              placeholder="Ex : 840"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#4A2B1A]">
            Fabrication
          </h3>
          <p className="text-sm text-neutral-500">
            Origine et informations sur les artisans.
          </p>
        </div>

        <div>
          <label className={labelClass}>
            Pays de fabrication
          </label>

          <input
            value={originCountry}
            onChange={(event) =>
              setOriginCountry(event.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="flex items-center gap-3 rounded-xl border border-neutral-300 bg-white p-3">
            <input
              type="checkbox"
              checked={handmade}
              onChange={(event) =>
                setHandmade(event.target.checked)
              }
              className="h-4 w-4"
            />

            <span className="text-sm font-medium text-[#4A2B1A]">
              Produit fabriqué à la main
            </span>
          </label>
        </div>

        <div>
          <label className={labelClass}>
            Artisan ou atelier partenaire
          </label>

          <input
            value={artisanPartner}
            onChange={(event) =>
              setArtisanPartner(event.target.value)
            }
            className={inputClass}
            placeholder="Ex : Artisans partenaires Nosy Kanto"
          />
        </div>
      </section>

   <VariantsManager
  initialVariants={variants}
  onChange={setVariants}
  onImageDelete={(url) =>
    setImagesToDelete((current) => [
      ...current,
      url,
    ])
  }
  onImageUpload={(url) =>
    setUploadedImages((current) => [
      ...current,
      url,
    ])
  }
/>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#4A2B1A]">
            Image
          </h3>
        </div>

        <div>
  <label className={labelClass}>
    Photo principale
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleMainImageUpload}
    disabled={isUploadingImage}
    className={inputClass}
  />

  {isUploadingImage && (
    <p className="mt-2 text-sm text-neutral-500">
      Envoi de la photo...
    </p>
  )}

  {image && (
  <div className="mt-4">
    <p className="mb-2 text-sm font-medium text-[#4A2B1A]">
      Photo actuelle
    </p>

    <img
      src={image}
      alt="Photo principale du produit"
      className="h-40 w-40 rounded-xl border border-neutral-200 bg-white object-contain p-2"
    />

    <button
      type="button"
      onClick={() => {
        if (
          image.includes(
            "/storage/v1/object/public/product-images/"
          )
        ) {
          setImagesToDelete((current) => [
            ...current,
            image,
          ]);
        }

        setImage("");
      }}
      className="mt-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Supprimer la photo principale
    </button>
  </div>
)}

</div>
        
        <div>
  <label className={labelClass}>
    Photos supplémentaires
  </label>

  <input
  type="file"
  accept="image/*"
  multiple
  onChange={handleAdditionalImagesUpload}
  disabled={isUploadingImage}
  className={inputClass}
/>

{isUploadingImage && (
  <p className="mt-2 text-sm text-neutral-500">
    Envoi des photos...
  </p>
)}

{images.length > 0 && (
  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
    {images.map((photo, index) => (
      <div
        key={`$photo-${index}`}
        className="rounded-xl border border-neutral-200 bg-white p-2"
      >
        <img
          src={photo}
          alt={`Photo supplémentaire ${index + 1}`}
          className="h-32 w-full object-contain"
        />

        <button
            type="button"
           onClick={() => {
  setImagesToDelete((current) => [...current, photo]);

  setImages((currentImages) =>
    currentImages.filter((_, imageIndex) => imageIndex !== index)
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

      </section>

      <hr className="border-neutral-200" />

      <Button
  onClick={handleSubmit}
  disabled={isSaving}
>
  {isSaving
    ? "⏳ Enregistrement..."
    : initialData
      ? "💾 Enregistrer les modifications"
      : "📦 Créer le produit"}
</Button>
    </div>
  );
}
