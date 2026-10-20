import type { Metadata } from "next";
import BijouxKantoClient from "./BijouxKantoClient";

export const metadata: Metadata = {
  title: "Bijoux Kanto",
  description:
    "Bijoux Kanto : créations exclusives Nosy Kanto en acier inoxydable et pierres naturelles, faites main à Madagascar.",
};

export default function BijouxKantoPage() {
  return <BijouxKantoClient />;
}
