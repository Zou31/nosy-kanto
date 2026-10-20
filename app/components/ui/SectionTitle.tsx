type SectionTitleProps = {
  icon: string;
  title: string;
};

export default function SectionTitle({
  icon,
  title,
}: SectionTitleProps) {
  return (
    <h1 className="flex items-center gap-3 text-4xl font-bold text-[#4A2B1A]">
      <span>{icon}</span>
      <span>{title}</span>
    </h1>
  );
}
