import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data: products, error } = await supabase
      .from("products")
      .select(`
        id,
        sku,
        reference_code,
        slug,
        name,
        collection,
        category,
        status,
        price,
        stock,
        image,
        image_hover,
        images,
        tags,
        description,
        short,
        seo_title,
        seo_description,
        badges,
        material,
        dimensions,
        weight_grams,
        origin_country,
        handmade,
        artisan_partner,
        bundle,
        product_variants (
          id,
          product_id,
          sku,
          name,
          color,
          size,
          price,
          dimensions,
          weight_grams,
          stock,
          status,
          image,
          image_hover,
          images,
          is_default,
          sort_order
        )
      `)
      .eq("status", "En vente")
      .order("name");

    if (error) {
  throw error;
}

const realProductIds = new Set(
  (products ?? []).map((product) => product.id)
);

const productIds = [...realProductIds];

const { data: stock, error: stockError } =
  productIds.length > 0
    ? await supabase
        .from("stock_items")
        .select(`
          product_id,
          variant_id,
          quantity
        `)
        .in("product_id", productIds)
    : { data: [], error: null };

if (stockError) {
  throw stockError;
}

const publicStock = (stock ?? []).filter((item) =>
  realProductIds.has(item.product_id)
);

return NextResponse.json({
  ok: true,
  products: products ?? [],
  stock: publicStock,
});

  } catch (error) {
    console.error(
      "Erreur API catalogue public :",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Impossible de charger le catalogue.",
      },
      { status: 500 }
    );
  }
}

