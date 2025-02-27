// app/admin/layout.tsx
import { ReactNode } from "react";
import { MenuOptionGoup, MenuGroup } from "./menuGroup";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const itemsMenu:MenuOptionGoup[][] = [
    [
      {href: "/dashboard/productos/gestion/categorias", title: "Categorias"},
      {href: "/dashboard/productos/gestion/subcategorias", title: "Subcategorias"}
    ],
    [
      {href: "/dashboard/productos/gestion/marcas", title: "Marcas"},
      {href: "/dashboard/productos/gestion/modelos", title: "Modelos"}
    ],
    [
      {href: "/dashboard/productos/gestion/talles", title: "Talles"},
      {href: "/dashboard/productos/gestion/colores", title: "Colores"}
    ]
  ]
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Encabezado con menú persistente */}
      <header className="font-montserrat top-0 z-10">
        <nav className="flex flex-row gap-4">
          {itemsMenu.map ((item, index) => {
            return (
              <MenuGroup key={index} menuGroup={item}/>
            )
          })}
        </nav>
      </header>

      {/* Área de contenido que cambia según la sección */}
      <main className="p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;

