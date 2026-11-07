import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "Recherche des Points Relais en préparation.",
      relayPoints: [],
    },
    { status: 503 }
  );
}
