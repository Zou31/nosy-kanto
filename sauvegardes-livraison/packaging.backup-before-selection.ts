export type PackagingFormat = {
  id: string;
  name: string;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightGrams: number | null;
};

export const PACKAGING_FORMATS: PackagingFormat[] = [
  {
    id: "petit",
    name: "Petit carton",
    lengthCm: 20,
    widthCm: 15,
    heightCm: 10,
    weightGrams: null,
  },
  {
    id: "moyen",
    name: "Carton moyen",
    lengthCm: 35,
    widthCm: 25,
    heightCm: 15,
    weightGrams: null,
  },
  {
    id: "grand",
    name: "Grand carton",
    lengthCm: 50,
    widthCm: 40,
    heightCm: 20,
    weightGrams: null,
  },
];
