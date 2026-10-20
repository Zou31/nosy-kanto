import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Route de test désactivée." },
    { status: 404 }
  );
}
