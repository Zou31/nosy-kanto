import Link from "next/link";
import Image from "next/image";

const univers = [
  {
    title: "Collections Kanto",
    description:
      "Sacs et accessoires façonnés à la main en raphia, sisal et matières naturelles.",
    href: "/collections",
    number: "01",
    image: "/images/nosykanto/univers-collections.png",
  },
  {
    title: "Bijoux Kanto",
    description:
      "Des bijoux artisanaux en acier inoxydable et pierres naturelles, réalisés à Madagascar.",
    href: "/bijoux-kanto",
    number: "02",
    image: "/images/nosykanto/univers-bijoux.png",
  },
  {
    title: "Saveurs de Madagascar",
    description:
      "Vanille et épices sélectionnées pour découvrir les parfums authentiques de Madagascar.",
    href: "/saveurs-madagascar",
    number: "03",
    image: "/images/nosykanto/univers-saveurs.png",
  },
];

export default function Univers() {
  return (
    <section className="bg-white px-6 pt-14 pb-8 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Découvrez Nosy Kanto
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#4A2B1A] md:text-4xl">
            Nos univers
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            Artisanat, créations et saveurs de Madagascar réunis dans trois
            univers à découvrir.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {univers.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-[24px] border border-[#E8DED2] bg-[#F8F4EE] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2 transition duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-amber-700 shadow-sm">
                  {item.number}
                </span>
              </div>

              {/* Texte */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#4A2B1A] transition group-hover:text-[#DAA520]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {item.description}
                </p>

                <span className="mt-5 inline-flex text-sm font-semibold text-[#4A2B1A] transition group-hover:text-[#DAA520]">
                  Découvrir →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
