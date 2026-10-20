import { createAdminClient } from "../../../utils/supabase/admin";
import { requireUser } from "../../../utils/supabase/requireUser";

export async function POST(request: Request) {
  try {
    const user = await requireUser();

    if (!user) {
      return Response.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "Aucune image reçue." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "Le fichier doit être une image." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
const fileName = `${crypto.randomUUID()}.${extension}`;
const filePath = `products/${fileName}`;

const { error: uploadError } = await supabase.storage
  .from("product-images")
  .upload(filePath, file, {
    contentType: file.type,
    upsert: false,
  });

if (uploadError) {
  console.error("Erreur Supabase Storage :", uploadError);

  return Response.json(
    { error: "Impossible d'enregistrer l'image." },
    { status: 500 }
  );
}

const { data: publicUrlData } = supabase.storage
  .from("product-images")
  .getPublicUrl(filePath);

return Response.json({
  ok: true,
  path: filePath,
  url: publicUrlData.publicUrl,
});

  } catch (error) {
    console.error("Erreur upload image produit :", error);

    return Response.json(
      { error: "Erreur serveur lors de l'envoi de l'image." },
      { status: 500 }
    );
  }
}
