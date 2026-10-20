"use client";

import { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalButton() {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { items, clearCart } = useCart();

  useEffect(() => {
    if (!window.paypal || !paypalRef.current) return;

    window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
      },

      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
  items: items.map((item) => ({
    id: item.id,
    variantId: item.variantId,
    qty: item.qty,
  })),
}),

        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur PayPal");

        return data.id;
      },

      onApprove: async (data: any) => {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        });

        if (!res.ok) throw new Error("Erreur capture PayPal");

        clearCart();
        window.location.href = "/commande/success";
      },

      onError: (err: any) => {
        console.error("PayPal error", err);
        alert("Une erreur est survenue avec PayPal");
      },
    }).render(paypalRef.current);
  }, [items, clearCart]);

  return <div ref={paypalRef} />;
}

