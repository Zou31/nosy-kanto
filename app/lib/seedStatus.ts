export const SEED_STATUS = [
  "Idée",
  "Croquis",
  "Prototype",
  "Validation",
  "Production",
] as const;

export type SeedStatus = typeof SEED_STATUS[number];

export function getNextStatus(status: SeedStatus): SeedStatus {
  const index = SEED_STATUS.indexOf(status);

  if (index === SEED_STATUS.length - 1) {
    return status;
  }

  return SEED_STATUS[index + 1];
}
