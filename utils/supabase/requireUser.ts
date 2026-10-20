import { createClient } from "./server";

export async function requireUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const adminUserId = process.env.ERP_ADMIN_USER_ID;

  // Refuser l'accès si l'administrateur n'est pas configuré.
  if (!adminUserId) {
    return null;
  }

  // Autoriser uniquement le compte administrateur Nosy Kanto.
  if (user.id !== adminUserId) {
    return null;
  }

  return user;
}

