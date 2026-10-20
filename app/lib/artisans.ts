import { ARTISANS } from "../data/artisans";

export function getArtisanById(id: string | null) {
  if (!id) return null;

  return ARTISANS.find((artisan) => artisan.id === id) ?? null;
}
