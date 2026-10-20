import type { ReactNode } from "react";
import Sidebar from "../layout/Sidebar";

type AtelierLayoutProps = {
  children: ReactNode;
};

export default function AtelierLayout({
  children,
}: AtelierLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
