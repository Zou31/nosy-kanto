import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#4A2B1A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">

        {/* MARQUE */}
        <div>
          <h3 className="text-lg font-semibold">Nosy Kanto</h3>
          <p className="mt-2 text-sm text-white/80">
            Artisanat fait main & produits naturels de Madagascar.
          </p>
        </div>

        {/* BOUTIQUE */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Boutique</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/boutique" className="hover:text-[#DAA520]">Tous les produits</Link></li>
            <li><Link href="/artisanat-madagascar" className="hover:text-[#DAA520]">Artisanat Madagascar</Link></li>
            <li><Link href="/vanille-madagascar" className="hover:text-[#DAA520]">Vanille Madagascar</Link></li>
          </ul>
        </div>

        {/* INFOS */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Informations</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/a-propos" className="hover:text-[#DAA520]">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-[#DAA520]">Contact</Link></li>
          </ul>
        </div>

        {/* LÉGAL */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Légal</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/cgv" className="hover:text-[#DAA520]">CGV</Link></li>
            <li><Link href="/confidentialite" className="hover:text-[#DAA520]">Confidentialité</Link></li>
            <li><Link href="/cookies" className="hover:text-[#DAA520]">Cookies</Link></li>
          </ul>
        </div>

      </div>

      {/* BAS DE FOOTER */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} Nosy Kanto — Tous droits réservés
      </div>
    </footer>
  );
}

