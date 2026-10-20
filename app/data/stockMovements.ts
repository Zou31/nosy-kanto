import type { StockLocation } from "./stock";

export type StockMovementLocation =
  | StockLocation
  | "Client"
  | "Marché"
  | "Extérieur";


export type StockMovement = {
  id: string;
  productId: string;
  variantId?: string;
  productName: string;
  type:
    | "Transfert"
    | "Vente salon"
    | "Vente en ligne"
    | "Départ marché"
    | "Retour marché"
    | "Ajustement";
  from: StockMovementLocation;
  to: StockMovementLocation;
  quantity: number;
  reason: string;
  date: string;
  time: string;
};

export const STOCK_MOVEMENTS: StockMovement[] = [];
