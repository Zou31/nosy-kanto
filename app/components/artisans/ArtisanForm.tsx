"use client";

import { useState } from "react";
import Button from "../ui/Button";
import type { ArtisanFormData } from "../../types/artisanForms";

type ArtisanFormProps = {
  onCreate: (data: ArtisanFormData) => void;
  initialData?: ArtisanFormData;
};

export default function ArtisanForm({
  onCreate,
  initialData,
}: ArtisanFormProps) {
  const [name, setName] = useState(
    initialData?.name ?? ""
  );

  const [speciality, setSpeciality] = useState(
    initialData?.speciality ?? ""
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#4A2B1A]">
          Nom de l'artisan
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border p-3"
          placeholder="Ex : Rakoto"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4A2B1A]">
          Spécialité
        </label>

        <input
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="mt-1 w-full rounded-xl border p-3"
          placeholder="Ex : Sacs en raphia"
        />
      </div>

      <hr className="my-4 border-neutral-200" />

      <Button
        onClick={() => {
          if (!name.trim() || !speciality.trim()) return;

          onCreate({
            name,
            speciality,
          });

          setName("");
          setSpeciality("");
        }}
      >
        {initialData ? "💾 Enregistrer" : "👩‍🎨 Créer l'artisan"}
      </Button>
    </div>
  );
}
