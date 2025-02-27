"use client"
// app/admin/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Encabezado con menú persistente */}
      <header className="font-montserrat top-0 z-10">
        <nav className="flex flex-row gap-4">
          {/* Grupo 1: Categorías y Subcategorías */}
          <div className="mr-4 p-4 flex space-x-4">
            <Link
              href="/dashboard/productos/gestion/categorias"
              className={`px-4 py-2 rounded font-montserrat ${
                isActive("/dashboard/productos/gestion/categorias")
                  ? "bg-[#0D47A1] text-white"
                  : "bg-white text-[#0D47A1] border border-[#0D47A1]"
              }`}
            >
              Categorías
            </Link>
            <Link
              href="/dashboard/productos/gestion/subcategorias"
              className={`px-4 py-2 rounded font-montserrat ${
                isActive("/dashboard/productos/gestion/subcategorias")
                  ? "bg-[#0D47A1] text-white"
                  : "bg-white text-[#0D47A1] border border-[#0D47A1]"
              }`}
            >
              Subcategorías
            </Link>
          </div>

          {/* Grupo 2: Marcas y Modelos */}
          <div className="mr-4 p-4 flex space-x-4">
            <Link
              href="/dashboard/productos/gestion/marcas"              
              className={`px-4 py-2 rounded font-montserrat ${
                isActive("/dashboard/productos/gestion/marcas")
                  ? "bg-[#0D47A1] text-white"
                  : "bg-white text-[#0D47A1] border border-[#0D47A1]"
              }`}
            >
              Marcas
            </Link>
            <Link
              href="/dashboard/productos/gestion/modelos"
              className={`px-4 py-2 rounded font-montserrat ${
                isActive("/dashboard/productos/gestion/modelos")
                  ? "bg-[#0D47A1] text-white"
                  : "bg-white text-[#0D47A1] border border-[#0D47A1]"
              }`}
            >
              Modelos
            </Link>
          </div>

          {/* Grupo 3: Talle y Color */}
          <div className="mr-4 p-4 flex space-x-4">
            <Link
              href="/dashboard/productos/gestion/talles"
              className={`px-4 py-2 rounded font-montserrat ${
                isActive("/dashboard/productos/gestion/talles")
                  ? "bg-[#0D47A1] text-white"
                  : "bg-white text-[#0D47A1] border border-[#0D47A1]"
              }`}
            >
              Talle
            </Link>
            <Link
              href="/dashboard/productos/gestion/colores"
              className={`px-4 py-2 rounded font-montserrat ${
                isActive("/dashboard/productos/gestion/colores")
                  ? "bg-[#0D47A1] text-white"
                  : "bg-white text-[#0D47A1] border border-[#0D47A1]"
              }`}
            >
              Color
            </Link>
          </div>
        </nav>
      </header>

      {/* Área de contenido que cambia según la sección */}
      <main className="p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;

