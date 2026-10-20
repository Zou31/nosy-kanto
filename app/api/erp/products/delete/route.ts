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

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        {
          ok: false,
          error: "productId manquant",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    /*
     * Suppression atomique PostgreSQL :
     *
     * - stock
     * - variantes
     * - produit
     *
     * Si une opération échoue, PostgreSQL annule tout.
     */
    const { error } = await supabase.rpc(
      "erp_delete_product_atomic",
      {
        p_product_id: productId,
      }
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      productId,
    });
  } catch (error) {
    console.error(
      "Erreur API suppression produit Supabase :",
      error
    );

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
