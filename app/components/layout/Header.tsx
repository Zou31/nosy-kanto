"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const { totalItems, isCartOpen, openCart, closeCart } = useCart();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
  closeCart();
  setIsMenuOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pathname]);

  return (
    <header className="bg-[#F8F3E9] shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">

        <Link href="/" className="flex shrink-0 items-center">
  <Image
    src="/images/nosykanto/logo-nosy-kanto.jpg"
    alt="Nosy Kanto"
    width={120}
    height={60}
    className="h-16 w-auto object-contain"
    priority
  />
</Link>

        <nav className="hidden md:flex md:shrink-0 md:gap-4 md:whitespace-nowrap text-[13px] font-medium text-[#4A2B1A]">

          <Link href="/" className="hover:text-[#DAA520]">
            Accueil
          </Link>

          <Link href="/collections" className="hover:text-[#DAA520]">
            Collections Kanto
          </Link>

          <Link href="/bijoux-kanto" className="hover:text-[#DAA520]">
            Bijoux Kanto
          </Link>

          <Link href="/decoration" className="hover:text-[#DAA520]">
            Décoration
          </Link>

          <Link href="/saveurs-madagascar" className="hover:text-[#DAA520]">
            Saveurs
          </Link>

          <Link href="/ame-nosy-kanto" className="hover:text-[#DAA520]">
            L&apos;âme
          </Link>

          <Link href="/panier" className="hover:text-[#DAA520]">
            Panier
          </Link>
        </nav>

        <button
          type="button"
          onClick={openCart}
          className="relative shrink-0 text-[#4A2B1A] hover:text-[#DAA520]"
          aria-label="Ouvrir le panier"
          aria-haspopup="dialog"
          aria-expanded={isCartOpen}
        >
          <ShoppingCart size={22} />

          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#DAA520] px-1 text-xs font-semibold text-white">
              {totalItems}
            </span>
          )}
        </button>
        <button
  type="button"
  onClick={() => setIsMenuOpen((open) => !open)}
  className="shrink-0 text-[#4A2B1A] hover:text-[#DAA520] md:hidden"
  aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
  aria-expanded={isMenuOpen}
  aria-controls="mobile-menu"
>
  {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
</button>

      </div>
      {isMenuOpen && (
  <nav
    id="mobile-menu"
    className="border-t border-[#E5D8C8] bg-[#F8F3E9] px-4 py-4 md:hidden"
  >
    <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm font-medium text-[#4A2B1A]">
      <Link href="/" className="rounded-lg px-3 py-3 hover:bg-white/60">
        Accueil
      </Link>

      <Link
        href="/collections"
        className="rounded-lg px-3 py-3 hover:bg-white/60"
      >
        Collections Kanto
      </Link>

      <Link
        href="/bijoux-kanto"
        className="rounded-lg px-3 py-3 hover:bg-white/60"
      >
        Bijoux Kanto
      </Link>

      <Link
        href="/decoration"
        className="rounded-lg px-3 py-3 hover:bg-white/60"
      >
        Décoration
      </Link>

      <Link
        href="/saveurs-madagascar"
        className="rounded-lg px-3 py-3 hover:bg-white/60"
      >
        Saveurs
      </Link>

      <Link
        href="/ame-nosy-kanto"
        className="rounded-lg px-3 py-3 hover:bg-white/60"
      >
        L&apos;âme
      </Link>

      <Link
        href="/panier"
        className="rounded-lg px-3 py-3 hover:bg-white/60"
      >
        Panier
      </Link>
    </div>
  </nav>
)}

      <CartDrawer open={isCartOpen} onClose={closeCart} />
    </header>
  );
}
