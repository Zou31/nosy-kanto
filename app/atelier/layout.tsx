import { redirect } from "next/navigation";
import AtelierLayout from "../components/atelier/AtelierLayout";
import { createClient } from "../../utils/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  return <AtelierLayout>{children}</AtelierLayout>;
}

