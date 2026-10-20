import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { requireUser } from "@/utils/supabase/requireUser";

export async function GET(req: Request) {
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

    const supabase = createAdminClient();

    const { data: products, error: productsError } =
      await supabase
        .from("products")
        .select(`
          *,
          product_variants (*)
        `)
        .order("name");

    if (productsError) {
      throw productsError;
    }

    const realProductIds = new Set(
      (products ?? []).map((product) => product.id)
    );

    const { data: stock, error: stockError } =
      await supabase
        .from("stock_items")
        .select("*");

    if (stockError) {
      throw stockError;
    }

    const realStock = (stock ?? []).filter((item) =>
      realProductIds.has(item.product_id)
    );

    const { data: movements, error: movementsError } =
      await supabase
        .from("stock_movements")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (movementsError) {
      throw movementsError;
    }

    const realMovements = (movements ?? []).filter(
      (movement) =>
        realProductIds.has(movement.product_id)
    );

    const { data: locations, error: locationsError } =
  await supabase
    .from("locations")
    .select("*")
    .order("name");

if (locationsError) {
  throw locationsError;
}

    const url = new URL(req.url);

if (url.searchParams.get("test") === "1") {
  return NextResponse.json({
    ok: true,
    products: (products ?? []).length,
    stock: realStock.length,
    movements: realMovements.length,
    locations: (locations ?? []).length,
  });
}

    return NextResponse.json({
      ok: true,
      products: products ?? [],
      stock: realStock,
      movements: realMovements,
      locations: locations ?? [],
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
