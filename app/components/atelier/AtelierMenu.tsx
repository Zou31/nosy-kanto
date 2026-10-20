import Link from "next/link";

export default function AtelierMenu() {
  return (
    <nav className="rounded-3xl bg-white p-4 shadow-md">
      <ul className="flex flex-wrap gap-3">
        <li>
          <Link
            href="/atelier"
            className="rounded-xl bg-[#4A2B1A] px-4 py-2 text-white hover:bg-[#60391f]"
          >
            🏠 Accueil
          </Link>
        </li>

        <li>
          <Link
            href="/atelier/commandes"
            className="rounded-xl border border-[#4A2B1A] px-4 py-2 text-[#4A2B1A] hover:bg-[#F8F5F0]"
          >
            📦 Commandes
          </Link>
        </li>

        <li>
          <Link
            href="/atelier/stock"
            className="rounded-xl border border-[#4A2B1A] px-4 py-2 text-[#4A2B1A] hover:bg-[#F8F5F0]"
          >
            📦 Stock
          </Link>
        </li>
        <li>
  <Link
    href="/atelier/artisans"
    className="rounded-xl border border-[#4A2B1A] px-4 py-2 text-[#4A2B1A] hover:bg-[#F8F5F0]"
  >
    👩‍🎨 Artisans
  </Link>
</li>
<li>
  <Link
    href="/atelier/graines"
    className="rounded-xl border border-[#4A2B1A] px-4 py-2 text-[#4A2B1A] hover:bg-[#F8F5F0]"
  >
    🌱 Les Graines
  </Link>
</li>
      </ul>
    </nav>
  );
}
