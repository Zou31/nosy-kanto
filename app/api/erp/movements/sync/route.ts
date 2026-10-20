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

    const movement = await req.json();

    if (!movement.id || !movement.productId) {
      return NextResponse.json(
        {
          ok: false,
          error: "Mouvement invalide",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from("stock_movements")
      .upsert({
        id: movement.id,
        product_id: movement.productId,
        variant_id: movement.variantId ?? null,

        location: movement.from ?? null,
        movement_type: movement.type,
        quantity: movement.quantity,
        reason: movement.reason ?? "",

        product_name: movement.productName ?? null,
        from_location: movement.from ?? null,
        to_location: movement.to ?? null,

        movement_date: movement.date ?? null,
        movement_time: movement.time ?? null,

        created_at: new Date().toISOString(),
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      movementId: movement.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}
