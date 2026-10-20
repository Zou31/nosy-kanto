type StatusBadgeProps = {
  status: string;
};

const styles: Record<string, string> = {
  "Idée": "bg-sky-100 text-sky-700",
  "Croquis": "bg-amber-100 text-amber-700",
  "Prototype": "bg-violet-100 text-violet-700",
  "Validation": "bg-emerald-100 text-emerald-700",
  "Production": "bg-stone-200 text-stone-700",

  "À préparer": "bg-orange-100 text-orange-700",
  "Prête": "bg-blue-100 text-blue-700",
  "Expédiée": "bg-green-100 text-green-700",
};

const icons: Record<string, string> = {
  "Idée": "💡",
  "Croquis": "✏️",
  "Prototype": "🧵",
  "Validation": "✅",
  "Production": "🏭",

  "À préparer": "🟠",
  "Prête": "🔵",
  "Expédiée": "🟢",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {icons[status] ?? "⚪"} {status}
    </span>
  );
}
