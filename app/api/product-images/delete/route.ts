import { createAdminClient } from "../../../../utils/supabase/admin";
import { requireUser } from "../../../../utils/supabase/requireUser";

export async function POST(request: Request) {
  try {
    const user = await requireUser();

    if (!user) {
      return Response.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const url = body.url;

    if (typeof url !== "string" || !url) {
      return Response.json(
        { error: "URL de l'image manquante." },
        { status: 400 }
      );
    }

    const marker = "/storage/v1/object/public/product-images/";

    if (!url.includes(marker)) {
      return Response.json(
        { error: "Cette image n'appartient pas au Storage produit." },
        { status: 400 }
      );
    }

    const filePath = decodeURIComponent(
      url.split(marker)[1]
    );

    if (!filePath?.startsWith("products/")) {
      return Response.json(
        { error: "Chemin de l'image invalide." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase.storage
      .from("product-images")
      .remove([filePath]);

    if (error) {
      console.error("Erreur suppression Supabase Storage :", error);

      return Response.json(
        { error: "Impossible de supprimer l'image." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Erreur suppression image produit :", error);

    return Response.json(
      { error: "Erreur serveur lors de la suppression de l'image." },
      { status: 500 }
    );
  }
}
