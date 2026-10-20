import { SEEDS } from "../data/seeds";

export function getSeedsByArtisanId(artisanId: string) {
  return SEEDS.filter(
    (seed) => seed.artisanId === artisanId
  );
}
