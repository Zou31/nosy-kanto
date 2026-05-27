import type { Metadata } from "next";
import BoutiqueClient from "./BoutiqueClient";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Découvrez nos créations artisanales et équitables.",
};

export default function Page() {
  return <BoutiqueClient />;
}
