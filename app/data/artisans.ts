export type Artisan = {
  id: string;
  name: string;

  speciality: string;

  materials: string[];

  currentWork: string;

  averageDelay: number;

  active: boolean;

  status: "En cours" | "Terminé";

  delivery: string;
};

export const ARTISANS: Artisan[] = [
  {
    id: "rakoto",
    name: "Rakoto",
    speciality: "Sacs en raphia",
    materials: ["Raphia", "Sisal"],
    currentWork: "3 sacs Terra Camel",
    averageDelay: 21,
    active: true,
    status: "En cours",
    delivery: "18 juin",
  },
  {
    id: "soa",
    name: "Soa",
    speciality: "Bijoux",
    materials: [
      "Pierres naturelles",
      "Acier inoxydable",
      "Argile",
      "Bois",
    ],
    currentWork: "18 bracelets",
    averageDelay: 14,
    active: true,
    status: "Terminé",
    delivery: "Prêt à expédier",
  },
];

export function getArtisanById(id: string) {
  return ARTISANS.find((artisan) => artisan.id === id);
}
