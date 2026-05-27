import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./context/CartContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Nosy Kanto",
    template: "%s · Nosy Kanto",
  },
  description:
    "Artisanat fait main, bijoux, sacs en raphia et épices naturelles de Madagascar.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Nosy Kanto",
    description:
      "Artisanat fait main, bijoux, sacs en raphia et épices naturelles de Madagascar.",
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Nosy Kanto",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>

        {paypalClientId && (
          <Script
            src={`https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=EUR`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
