"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION } from "../../data/navigation";
import { createClient } from "../../../utils/supabase/client";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/connexion");
    router.refresh();
  }

  return (
    <aside className="min-h-screen w-64 border-r bg-white p-5">
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4A2B1A] text-xl text-white">
            📦
          </div>

          <div>
            <h1 className="text-lg font-bold text-[#4A2B1A]">
              Nosy Kanto ERP
            </h1>

            <p className="text-sm text-neutral-500">
              Gestion artisanale
            </p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {NAVIGATION.filter((item) => item.enabled).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
              pathname === item.href
                ? "bg-[#4A2B1A] text-white shadow-sm"
                : "text-neutral-700 hover:bg-[#F3ECE5] hover:text-[#4A2B1A]"
            }`}
          >
            <span>{item.icon}</span>

            <span>{item.label}</span>
          </Link>
        ))}
            </nav>

      <div className="mt-8 border-t border-neutral-200 pt-5">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-neutral-700 transition hover:bg-red-50 hover:text-red-700"
        >
          <span>🚪</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

