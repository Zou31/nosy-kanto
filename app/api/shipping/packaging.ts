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
    widthCm: 20,
    heightCm: 11,
    weightGrams: 95,
  },
  {
    id: "intermediaire",
    name: "Carton intermediaire RETIF 55312",
    lengthCm: 25,
    widthCm: 20,
    heightCm: 10,
    weightGrams: 150,
  },
  {
    id: "moyen",
    name: "Carton moyen",
    lengthCm: 35,
    widthCm: 25,
    heightCm: 15,
    weightGrams: 180,
  },
  {
    id: "grand",
    name: "Grand carton",
    lengthCm: 50,
    widthCm: 40,
    heightCm: 20,
    weightGrams: 350,
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
  if (typeof value === "string") {
    try { value = JSON.parse(value); } catch { return null; }
  }
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

  const marginCm = 1;

  return (
    totalLength + marginCm <= carton.lengthCm &&
    maxWidth + marginCm <= carton.widthCm &&
    maxHeight + marginCm <= carton.heightCm
  );
}


export function canFitJewelryBoxesInCarton(count: number, carton: PackagingFormat): boolean {
  if (!Number.isSafeInteger(count) || count < 1) return false;
  const margin = 1;
  const usableLength = carton.lengthCm - margin;
  const usableWidth = carton.widthCm - margin;
  const usableHeight = carton.heightCm - margin;
  const orientationA = Math.floor(usableLength / JEWELRY_BOX.lengthCm) * Math.floor(usableWidth / JEWELRY_BOX.widthCm);
  const orientationB = Math.floor(usableLength / JEWELRY_BOX.widthCm) * Math.floor(usableWidth / JEWELRY_BOX.lengthCm);
  const perLayer = Math.max(orientationA, orientationB);
  const layers = Math.floor(usableHeight / JEWELRY_BOX.heightCm);
  return count <= perLayer * layers;
}

export function findPackagingForArticles(
  articles: [number, number, number][]
): PackagingFormat | null {
  if (
    articles.length === 0 ||
    articles.length > 20 ||
    articles.some(
      (dims) =>
        dims.length !== 3 ||
        dims.some((v) => !Number.isFinite(v) || v <= 0)
    )
  ) {
    return null;
  }

  const orientations = (dims: number[]) => {
    const [a, b, c] = dims;
    const variants = [
      [a, b, c], [a, c, b],
      [b, a, c], [b, c, a],
      [c, a, b], [c, b, a],
    ];
    return variants.filter(
      (v, i) =>
        variants.findIndex(
          (w) => w.every((n, j) => n === v[j])
        ) === i
    );
  };

  const fits = (carton: PackagingFormat): boolean => {
    const margin = 1;
    const limits = [
      carton.lengthCm - margin,
      carton.widthCm - margin,
      carton.heightCm - margin,
    ];

    const volume = articles.reduce(
      (sum, d) => sum + d[0] * d[1] * d[2],
      0
    );

    if (volume > limits[0] * limits[1] * limits[2]) {
      return false;
    }

    const ordered = [...articles].sort(
      (a, b) =>
        b[0] * b[1] * b[2] -
        a[0] * a[1] * a[2]
    );

    type Position = [number, number, number];
    type Box = { pos: Position; size: number[] };

    const placed: Box[] = [];
    const positions: Position[] = [[0, 0, 0]];

    const search = (index: number): boolean => {
      if (index === ordered.length) return true;

      for (const size of orientations(ordered[index])) {
        for (const pos of [...positions]) {
          if (
            size.some((v, axis) => pos[axis] + v > limits[axis])
          ) continue;

          const overlaps = placed.some((box) =>
            [0, 1, 2].every(
              (axis) =>
                pos[axis] < box.pos[axis] + box.size[axis] &&
                pos[axis] + size[axis] > box.pos[axis]
            )
          );

          if (overlaps) continue;

          placed.push({ pos, size });

          const nextPositions: Position[] = [
            [pos[0] + size[0], pos[1], pos[2]],
            [pos[0], pos[1] + size[1], pos[2]],
            [pos[0], pos[1], pos[2] + size[2]],
          ];

          const added = nextPositions.filter(
            (p) =>
              !positions.some((q) =>
                q.every((v, i) => v === p[i])
              )
          );

          positions.push(...added);

          if (search(index + 1)) return true;

          placed.pop();
          positions.splice(positions.length - added.length);
        }
      }

      return false;
    };

    return search(0);
  };

  return PACKAGING_FORMATS.find(fits) ?? null;
}

export const SOFT_POUCH_40G = {
  lengthCm: 12,
  widthCm: 9,
  heightCm: 4,
  maxPerLayer: 2,
} as const;

// Regle de rangement tete-beche a valider physiquement.

export function canFitSoftPouchesInCarton(count: number, carton: PackagingFormat): boolean {
  if (!Number.isSafeInteger(count) || count < 1) return false;
  const margin = 1;
  const length = carton.lengthCm - margin;
  const width = carton.widthCm - margin;
  const height = carton.heightCm - margin;
  const a = Math.floor(length / SOFT_POUCH_40G.lengthCm) * Math.floor(width / SOFT_POUCH_40G.widthCm);
  const b = Math.floor(length / SOFT_POUCH_40G.widthCm) * Math.floor(width / SOFT_POUCH_40G.lengthCm);
  const layers = Math.floor(height / SOFT_POUCH_40G.heightCm);
  return count <= Math.max(a, b) * layers;
}

export function canFitArticlesStacked(
  articles: [number, number, number][],
  carton: PackagingFormat
): boolean {
  if (articles.length === 0) return false;

  if (
    articles.some((dimensions) =>
      dimensions.length !== 3 ||
      dimensions.some((value) =>
        !Number.isFinite(value) || value <= 0
      )
    )
  ) return false;

  const oriented = articles.map((dimensions) => {
    const sorted = [...dimensions].sort((a, b) => a - b);
    return {
      height: sorted[0],
      width: sorted[1],
      length: sorted[2],
    };
  });

  const marginCm = 1;

  return (
    Math.max(...oriented.map((item) => item.length)) + marginCm <= carton.lengthCm &&
    Math.max(...oriented.map((item) => item.width)) + marginCm <= carton.widthCm &&
    oriented.reduce((sum, item) => sum + item.height, 0) + marginCm <= carton.heightCm
  );
}

export function canFitBlackPepperPouches(
  count: number,
  carton: PackagingFormat
): boolean {
  if (!Number.isSafeInteger(count) || count < 1) return false;

  const dimensions = [18, 12, 4];
  const available = [
    carton.lengthCm - 1,
    carton.widthCm - 1,
    carton.heightCm - 1,
  ];

  const orientations = [
    [18, 12, 4],
    [18, 4, 12],
    [12, 4, 18],
    [12, 18, 4],
    [4, 18, 12],
    [4, 12, 18],
  ];

  return orientations.some(([length, width, height]) => {
    const perLayer =
      Math.floor(available[0] / length) *
      Math.floor(available[1] / width);
    const layers = Math.floor(available[2] / height);

    return count <= perLayer * layers;
  });
}
