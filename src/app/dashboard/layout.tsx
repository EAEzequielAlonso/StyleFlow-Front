// 📌 Archivo: src/app/dashboard/layout.tsx

import Sidebar from "@/components/dashboard/sidebar";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  
  const cookieStore = await cookies(); // Obtiene el objeto de cookies
  const token = cookieStore.get("token")?.value; // Obtiene el valor del token

  if (!token) {
    redirect("/login"); // Redirige a login si no hay token
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar fijo a la izquierda */}
      <main className="flex-1 p-2">{children}</main>
    </div>
  );
}
