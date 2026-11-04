export const MONDIAL_RELAY_FRANCE_RATES = [
  { maxWeightGrams: 500, priceHT: 3.42 },
  { maxWeightGrams: 1000, priceHT: 3.76 },
  { maxWeightGrams: 2000, priceHT: 5.27 },
  { maxWeightGrams: 4000, priceHT: 5.59 },
  { maxWeightGrams: 10000, priceHT: 11.13 },
  { maxWeightGrams: 25000, priceHT: 17.47 },
  { maxWeightGrams: 30000, priceHT: 19.99 },
] as const;

export function getMondialRelayFrancePriceHT(
  weightGrams: number
): number | null {
  if (!Number.isFinite(weightGrams) || weightGrams <= 0) {
    return null;
  }

  const rate = MONDIAL_RELAY_FRANCE_RATES.find(
    (item) => weightGrams <= item.maxWeightGrams
  );

  return rate?.priceHT ?? null;
}
