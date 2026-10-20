export type OrderFormData = {
  customer: string;
  customerEmail: string;

  items: string;

  total: number;

  status:
    | "À préparer"
    | "Prête"
    | "Expédiée"
    | "Livrée"
    | "Annulée";

  paid: boolean;
};
