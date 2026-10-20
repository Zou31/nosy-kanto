type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-3xl bg-white p-6 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
