type DashboardCardProps = {
  title: string;
  value: number | string;
  valueClassName?: string;
};

export default function DashboardCard({
  title,
  value,
  valueClassName = "text-[#4A2B1A]",
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm text-neutral-500">
        {title}
      </p>

      <p
        className={`mt-2 text-3xl font-bold ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}
