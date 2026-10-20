export default function Engagements() {
  return (
    <section className="bg-[#F8F4EE] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            L&apos;esprit Nosy Kanto
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#4A2B1A] md:text-4xl">
            Des créations qui ont une histoire
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
            De Madagascar jusqu&apos;à chez vous, nous privilégions
            l&apos;artisanat, les petites séries et une relation directe
            avec nos artisans partenaires.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[22px] border border-[#E8DED2] bg-white p-6 text-center">
            <div className="text-2xl">🇲🇬</div>
            <h3 className="mt-4 text-lg font-bold text-[#4A2B1A]">
              Artisanat de Madagascar
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Des créations réalisées à Madagascar avec nos artisans
              partenaires.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#E8DED2] bg-white p-6 text-center">
            <div className="text-2xl">🤲</div>
            <h3 className="mt-4 text-lg font-bold text-[#4A2B1A]">
              Fait main & petites séries
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Des pièces artisanales produites en petites quantités, avec
              les variations qui font le charme du fait main.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#E8DED2] bg-white p-6 text-center">
            <div className="text-2xl">📦</div>
            <h3 className="mt-4 text-lg font-bold text-[#4A2B1A]">
              Expédition depuis la France
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Vos commandes sont préparées avec soin puis expédiées depuis
              la France.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
