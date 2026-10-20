import type { SeedStatus } from "../lib/seedStatus";
import type { CollectionName as Collection } from "../constants/collections";

export type Seed = {
  id: string;
  name: string;
  inspiration: string;
  story: string;
  artisanId: string | null;
  drawing: boolean;
  prototype: boolean;
  photos: number;
  createdAt: string;
  collection: Collection;
  status: SeedStatus;
  
};
export const SEEDS: Seed[] = [
  {
    id: "terra-ocean",
    name: "Terra Océan",
    inspiration: "Voyage à Nosy Be",
    story: "Créer un sac léger inspiré des couleurs de Nosy Be.",
    artisanId: "rakoto",
    drawing: true,
    prototype: false,
    photos: 0,
    createdAt: "17 juin 2026",
    collection: "Terra",
    status: "Croquis",
  },
];
