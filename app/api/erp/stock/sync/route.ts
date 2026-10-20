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

    const { stock } = await req.json();

    if (!Array.isArray(stock)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Stock invalide",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    for (const item of stock) {
      const { error } = await supabase
        .from("stock_items")
        .upsert(
          {
            product_id: item.productId,
            variant_id: item.variantId ?? null,
            location: item.location ?? "Maison",
            quantity: item.quantity ?? 0,
            alert_level: item.alertLevel ?? 0,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict:
              "product_id,variant_id,location",
          }
        );

      if (error) throw error;
    }

    return NextResponse.json({
      ok: true,
      stockLines: stock.length,
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
