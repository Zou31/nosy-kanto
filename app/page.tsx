import Hero from "./components/home/Hero";
import Univers from "./components/home/Univers";
import Products from "./components/home/Products";
import Engagements from "./components/home/Engagements";

export default function Home() {
  return (
    <main>
      <div className="bg-[#4A2B1A] px-4 py-2 text-center text-[11px] font-medium text-white sm:text-xs">
        Artisanat fait main à Madagascar · 🚚 Expédition depuis la France · 🔒 Paiement sécurisé
      </div>

      <Hero />
      <Univers />
      <Products />
      <Engagements />

    </main>
  );
}



