"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string; // product.id
  name: string;
  price: number;
  qty: number;
  image?: string;
  color?: string;
  size?: string;
};

type AddItemInput = Omit<CartItem, "qty"> & { qty?: number };

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addItem: (item: AddItemInput) => void;
  updateQty: (id: string, qty: number, color?: string, size?: string) => void;
  removeItem: (id: string, color?: string, size?: string) => void;
  clearCart: () => void;

  // Drawer control
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "nk_cart_v1";

function sameLine(a: CartItem, b: { id: string; color?: string; size?: string }) {
  return (
    a.id === b.id &&
    (a.color ?? "") === (b.color ?? "") &&
    (a.size ?? "") === (b.size ?? "")
  );
}

function clampQty(qty: unknown, fallback = 1) {
  const n = typeof qty === "number" ? qty : Number(qty);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.floor(n));
}

function isValidCartItem(x: any): x is CartItem {
  return (
    x &&
    typeof x === "object" &&
    typeof x.id === "string" &&
    typeof x.name === "string" &&
    typeof x.price === "number" &&
    Number.isFinite(x.price) &&
    typeof x.qty === "number" &&
    Number.isFinite(x.qty)
  );
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;

      const cleaned: CartItem[] = parsed
        .filter(isValidCartItem)
        .map((it) => ({
          ...it,
          qty: clampQty(it.qty, 1),
          price: Number.isFinite(it.price) ? it.price : 0,
        }))
        .filter((it) => it.qty > 0);

      setItems(cleaned);
    } catch {
      // ignore
    }
  }, []);

  // Save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const qtyToAdd = clampQty(item.qty, 1);
      if (qtyToAdd <= 0) return prev;

      const idx = prev.findIndex((it) => sameLine(it, { id: item.id, color: item.color, size: item.size }));
      if (idx >= 0) {
        return prev.map((it, i) => (i === idx ? { ...it, qty: it.qty + qtyToAdd } : it));
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          color: item.color,
          size: item.size,
          qty: qtyToAdd,
        },
      ];
    });

    // UX: quand on ajoute, on ouvre le drawer
    setIsCartOpen(true);
  };

  const updateQty: CartContextValue["updateQty"] = (id, qty, color, size) => {
    const safeQty = clampQty(qty, 0);
    setItems((prev) => {
      if (safeQty <= 0) return prev.filter((it) => !sameLine(it, { id, color, size }));
      return prev.map((it) => (sameLine(it, { id, color, size }) ? { ...it, qty: safeQty } : it));
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id, color, size) => {
    setItems((prev) => prev.filter((it) => !sameLine(it, { id, color, size })));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);
  const totalPrice = useMemo(() => Math.round(items.reduce((sum, it) => sum + it.price * it.qty, 0) * 100) / 100, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

