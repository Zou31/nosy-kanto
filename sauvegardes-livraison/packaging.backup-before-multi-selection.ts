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


export function calculateArticlesVolume(
  articles: [number, number, number][]
): number | null {
  if (articles.length === 0) return null;

  let totalVolume = 0;

  for (const dimensions of articles) {
    if (
      dimensions.length !== 3 ||
      dimensions.some(
        (value) => !Number.isFinite(value) || value <= 0
      )
    ) {
      return null;
    }

    totalVolume +=
      dimensions[0] * dimensions[1] * dimensions[2];
  }

  return Number.isFinite(totalVolume) ? totalVolume : null;
}


export function canFitArticlesInRow(
  articles: [number, number, number][],
  carton: PackagingFormat
): boolean {
  if (articles.length === 0) return false;

  if (
    articles.some(
      (dimensions) =>
        dimensions.length !== 3 ||
        dimensions.some(
          (value) => !Number.isFinite(value) || value <= 0
        )
    )
  ) {
    return false;
  }

  const totalLength = articles.reduce(
    (sum, dimensions) => sum + dimensions[0],
    0
  );

  const maxWidth = Math.max(
    ...articles.map((dimensions) => dimensions[1])
  );

  const maxHeight = Math.max(
    ...articles.map((dimensions) => dimensions[2])
  );

  return (
    totalLength <= carton.lengthCm &&
    maxWidth <= carton.widthCm &&
    maxHeight <= carton.heightCm
  );
}
