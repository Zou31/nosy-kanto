import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "rounded-xl px-5 py-2 text-sm font-medium transition";

  const styles = {
    primary:
      "bg-[#4A2B1A] text-white hover:bg-[#60391f]",
    secondary:
      "border border-[#4A2B1A] text-[#4A2B1A] hover:bg-[#F8F5F0]",
  };

  return (
    <button
      {...props}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
