export type Order = {
  id: string;
  customer: string;
  items: string[];
  status:
  | "À préparer"
  | "Prête"
  | "Expédiée"
  | "Livrée"
  | "Annulée";

  paid: boolean;
  labelPrinted: boolean;
  date: string;
};

export const ORDERS: Order[] = [
  {
    id: "1001",
    customer: "Marie Dupont",
    items: [
      "Sac Terra Camel ×1",
      "Vanille 16 cm ×5"
    ],
    status: "À préparer",
    paid: true,
    labelPrinted: false,
    date: "17/06/2026"
  }
];
