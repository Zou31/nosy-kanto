import { CREATIONS } from "../../data/creations";

export function getCreations() {
  return CREATIONS;
}
export function getCreationStats() {
  const creations = getCreations();

  return {
    total: creations.length,
    ideas: creations.filter((c) => c.status === "idea").length,
    sketches: creations.filter((c) => c.status === "sketch").length,
    prototypes: creations.filter((c) => c.status === "prototype").length,
    validated: creations.filter((c) => c.status === "validated").length,
    products: creations.filter((c) => c.status === "product").length,
  };
}

