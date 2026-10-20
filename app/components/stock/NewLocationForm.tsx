"use client";

import { useState } from "react";
import Button from "../ui/Button";

type NewLocationFormProps = {
  onCreate: (name: string) => void;
};

export default function NewLocationForm({
  onCreate,
}: NewLocationFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) return;

    onCreate(cleanName);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block font-medium">
          Nom de l’emplacement
        </label>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex : Boutique Toulouse"
          className="w-full rounded-xl border p-3"
        />
      </div>

      <Button type="submit">
        📦 Créer l’emplacement
      </Button>
    </form>
  );
}
