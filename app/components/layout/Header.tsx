"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "../../context/CartContext";

export default function Header() {
const { totalItems, isCartOpen, openCart, closeCart } = useCart();
const pathname = usePathname();

useEffect(() => {
closeCart();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [pathname]);

return (
  <header className="sticky top-0 z-50 bg-[#F8F3E9] shadow-sm">
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 overflow-x-auto">
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A2B1A] text-xs font-bold text-white">
          N
        </div>
        <span className="text-[13px] font-semibold text-[#4A2B1A]">
          Nosy Kanto
        </span>
      </Link>

      <nav className="flex shrink-0 gap-4 whitespace-nowrap text-[11px] font-medium text-[#4A2B1A]">
        <Link href="/" className="hover:text-[#DAA520]">
          Accueil
        </Link>

        <Link href="/boutique" className="hover:text-[#DAA520]">
          Boutique
        </Link>

        <Link href="/bijoux-kanto" className="hover:text-[#DAA520]">
          Kanto
        </Link>

        <Link href="/vanille-madagascar" className="hover:text-[#DAA520]">
          Vanille
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
          <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#DAA520] px-1 text-xs font-semibold text-white">
            {totalItems}
          </span>
        )}
      </button>
    </div>

    <CartDrawer open={isCartOpen} onClose={closeCart} />
  </header>
);
}
