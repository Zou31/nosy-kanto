import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { requireUser } from "@/utils/supabase/requireUser";

export async function POST(req: Request) {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Non autorisé.",
        },
        { status: 401 }
      );
    }

    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        {
          ok: false,
          error: "Nom d’emplacement invalide",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from("locations")
      .upsert(
        {
          name: name.trim(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "name",
        }
      );

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      name: name.trim(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
