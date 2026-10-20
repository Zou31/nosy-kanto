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

    const product = await req.json();
    const supabase = createAdminClient();

    /*
     * Toute la synchronisation est maintenant effectuée
     * dans PostgreSQL en une seule transaction :
     *
     * - produit
     * - variantes
     * - variantes supprimées
     * - stock
     *
     * Si une opération échoue, PostgreSQL annule tout.
     */
    const { error } = await supabase.rpc(
      "erp_sync_product_atomic",
      {
        p_product: product,
      }
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      productId: product.id,
    });
  } catch (error) {
    console.error(
      "Erreur API synchro produit Supabase :",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : error,
      },
      { status: 500 }
    );
  }
}
