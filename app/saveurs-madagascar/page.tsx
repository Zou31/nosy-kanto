import type { Metadata } from "next";
import SaveursClient from "./SaveursClient";

export const metadata: Metadata = {
  title: "Saveurs de Madagascar",
  description:
    "Découvrez les saveurs de Madagascar sélectionnées par Nosy Kanto : vanille Bourbon, poivres et épices de Madagascar.",
};

export default function SaveursMadagascarPage() {
  return <SaveursClient />;
}
