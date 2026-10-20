"use client";

import { useState } from "react";
import { getNextStatus } from "../../lib/seedStatus";
import { SEEDS, type Seed } from "../../data/seeds";
import type { SeedFormData } from "../../types/forms";

import SeedsList from "./SeedsList";
import ActionButton from "../ui/ActionButton";
import NewSeedForm from "./NewSeedForm";
import Modal from "../ui/Modal";

export default function SeedsManager() {
  const [seeds, setSeeds] = useState<Seed[]>(SEEDS);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSeed, setEditingSeed] = useState<Seed | null>(null);

  function handleCreate(data: SeedFormData) {
    const newSeed: Seed = {
  id: crypto.randomUUID(),
  name: data.name,
  collection: data.collection,
  inspiration: "",
  story: "",
  artisanId: null,
  drawing: false,
  prototype: false,
  photos: 0,
  createdAt: new Date().toLocaleDateString("fr-FR"),
  status: "Idée",
};

    setSeeds((previousSeeds) => [newSeed, ...previousSeeds]);
    setIsOpen(false);
  }

  function handleSave(data: SeedFormData) {
    if (!editingSeed) {
      handleCreate(data);
      return;
    }

    setSeeds((previousSeeds) =>
      previousSeeds.map((seed) =>
        seed.id === editingSeed.id
          ? {
              ...seed,
              name: data.name,
              collection: data.collection,
            }
          : seed
      )
    );

    setEditingSeed(null);
    setIsOpen(false);
  }

  function handleNextStep(id: string) {
    setSeeds((previousSeeds) =>
      previousSeeds.map((seed) =>
        seed.id === id
          ? { ...seed, status: getNextStatus(seed.status) }
          : seed
      )
    );
  }

  function handleEdit(id: string) {
    const seed = seeds.find((seed) => seed.id === id);

    if (!seed) return;

    setEditingSeed(seed);
    setIsOpen(true);
  }

  function handleCloseModal() {
    setEditingSeed(null);
    setIsOpen(false);
  }

  return (
    <>
      <div className="mb-6">
        <ActionButton
  icon="🌱"
  label="Nouvelle Graine"
  onClick={() => setIsOpen(true)}
/>

      </div>

      <SeedsList
        seeds={seeds}
        onNextStep={handleNextStep}
        onEdit={handleEdit}
      />

      {isOpen && (
        <Modal
          title={editingSeed ? "✏️ Modifier la Graine" : "🌱 Nouvelle Graine"}
          onClose={handleCloseModal}
        >
          <NewSeedForm
            onCreate={handleSave}
            initialData={
              editingSeed
                ? {
                    name: editingSeed.name,
                    collection: editingSeed.collection,
                  }
                : undefined
            }
          />
        </Modal>
      )}
    </>
  );
}
