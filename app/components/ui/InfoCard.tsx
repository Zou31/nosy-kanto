type InfoCardProps = {
  icon: string;
  title: string;
  message: string;
};

export default function InfoCard({ icon, title, message }: InfoCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-[#4A2B1A]">
        {icon} {title}
      </h2>

      <p className="mt-3 text-neutral-600">
        {message}
      </p>
    </div>
  );
}
