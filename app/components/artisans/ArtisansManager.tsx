"use client";

import { useState } from "react";

import { ARTISANS, type Artisan } from "../../data/artisans";
import type { ArtisanFormData } from "../../types/artisanForms";

import ArtisansList from "./ArtisansList";
import ActionButton from "../ui/ActionButton";
import ArtisanForm from "./ArtisanForm";
import Modal from "../ui/Modal";

export default function ArtisansManager() {
  const [artisans, setArtisans] = useState<Artisan[]>(ARTISANS);
  const [isOpen, setIsOpen] = useState(false);
  const [editingArtisan, setEditingArtisan] = useState<Artisan | null>(null);

  function handleCreate(data: ArtisanFormData) {
    const newArtisan: Artisan = {
      id: crypto.randomUUID(),
      name: data.name,
      speciality: data.speciality,
      materials: [],
      currentWork: "Aucun travail en cours",
      averageDelay: 0,
      active: true,
      status: "Terminé",
      delivery: "Non définie",
    };

    setArtisans((previous) => [newArtisan, ...previous]);
    setIsOpen(false);
  }

  function handleSave(data: ArtisanFormData) {
    if (!editingArtisan) {
      handleCreate(data);
      return;
    }

    setArtisans((previous) =>
      previous.map((artisan) =>
        artisan.id === editingArtisan.id
          ? {
              ...artisan,
              name: data.name,
              speciality: data.speciality,
            }
          : artisan
      )
    );

    setEditingArtisan(null);
    setIsOpen(false);
  }

  function handleEdit(id: string) {
    const artisan = artisans.find((artisan) => artisan.id === id);

    if (!artisan) return;

    setEditingArtisan(artisan);
    setIsOpen(true);
  }

  function handleToggleActive(id: string) {
    setArtisans((previous) =>
      previous.map((artisan) =>
        artisan.id === id
          ? {
              ...artisan,
              active: !artisan.active,
            }
          : artisan
      )
    );
  }

  function handleCloseModal() {
    setEditingArtisan(null);
    setIsOpen(false);
  }

  return (
    <>
      <div className="mb-6">
       <ActionButton
  icon="👩‍🎨"
  label="Nouvel Artisan"
  onClick={() => setIsOpen(true)}
/>

      </div>

      <ArtisansList
        artisans={artisans}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
      />

      {isOpen && (
        <Modal
          title={editingArtisan ? "✏️ Modifier l'artisan" : "👩‍🎨 Nouvel artisan"}
          onClose={handleCloseModal}
        >
          <ArtisanForm
            onCreate={handleSave}
            initialData={
              editingArtisan
                ? {
                    name: editingArtisan.name,
                    speciality: editingArtisan.speciality,
                  }
                : undefined
            }
          />
        </Modal>
      )}
    </>
  );
}
