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


export function findSuitablePackaging(
  lengthCm: number,
  widthCm: number,
  heightCm: number
): PackagingFormat | null {
  const dimensions = [lengthCm, widthCm, heightCm];

  if (
    dimensions.some(
      (value) => !Number.isFinite(value) || value <= 0
    )
  ) {
    return null;
  }

  const article = [...dimensions].sort((a, b) => a - b);

  return (
    PACKAGING_FORMATS.find((carton) => {
      const available = [
        carton.lengthCm,
        carton.widthCm,
        carton.heightCm,
      ].sort((a, b) => a - b);

      return article.every(
        (dimension, index) => dimension <= available[index]
      );
    }) ?? null
  );
}


export function parsePackagingDimensions(
  value: unknown
): [number, number, number] | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const data = value as Record<string, unknown>;
  const dimensions = [
    data.lengthCm,
    data.widthCm,
    data.heightCm,
  ];

  if (
    dimensions.some(
      (item) => typeof item !== "number" ||
        !Number.isFinite(item) ||
        item <= 0
    )
  ) {
    return null;
  }

  return dimensions as [number, number, number];
}


export const JEWELRY_BOX = {
  name: "Boîte individuelle à bijoux",
  lengthCm: 9,
  widthCm: 7,
  heightCm: 2.5,
  weightGrams: 24,
} as const;
