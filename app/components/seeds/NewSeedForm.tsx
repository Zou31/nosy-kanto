"use client";

import { useState } from "react";
import Button from "../ui/Button";

import { COLLECTIONS } from "../../constants/collections";
import type { SeedFormData } from "../../types/forms";

type NewSeedFormProps = {
  onCreate: (data: SeedFormData) => void;
  initialData?: SeedFormData;
};

export default function NewSeedForm({
  onCreate,
  initialData,
}: NewSeedFormProps) {

  const [name, setName] = useState(
  initialData?.name ?? ""
);

  const [collection, setCollection] = useState<
  typeof COLLECTIONS[number] | ""
>(
  initialData?.collection ?? ""
);


  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#4A2B1A]">
          Nom de la création
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Terra XL"
          className="mt-1 w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4A2B1A]">
          Collection
        </label>

        <select
  value={collection}
  onChange={(e) => setCollection(e.target.value as typeof COLLECTIONS[number])}
  className="mt-1 w-full rounded-xl border p-3"
>
  <option value="">Choisir une collection</option>

  {COLLECTIONS.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>
      </div>

      <hr className="my-4 border-neutral-200" />

      <Button
        onClick={() => {
          if (!name.trim() || !collection) return;

          onCreate({
             name,
             collection,
        });

          setName("");
          setCollection("");
        }}
      >
        💾 Enregistrer
      </Button>
    </div>
  );
}
