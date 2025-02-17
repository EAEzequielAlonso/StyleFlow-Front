// 📌 Archivo: src/app/dashboard/layout.tsx

import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar fijo a la izquierda */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
