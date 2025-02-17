"use client"; // Requiere interactividad

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiHome, FiBox, FiShoppingCart, FiSettings, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <aside className={`bg-blue-700 text-white h-screen p-4 ${isOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out`}>
      {/* Botón para abrir/cerrar el sidebar */}
      <button onClick={toggleSidebar} className="mb-6 flex items-center gap-2 text-white">
        <FiMenu size={40} />
        {isOpen && <span className="text-lg">Dashboard</span>}
      </button>

      {/* Menú */}
      <nav className="space-y-2 text-xl">
        <MenuItem href="/dashboard" icon={<FiHome size={30} />} text="Inicio" isOpen={isOpen} />

        {/* Comercio */}
        <MenuDropdown
          title="Comercio"
          icon={<FiBox size={24} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "comercio"}
          toggle={() => toggleSubmenu("comercio")}
          items={[
            { href: "/dashboard/comercio", text: "Información" },
            { href: "/dashboard/comercio/sucursal", text: "Sucursal" },
            { href: "/dashboard/comercio/usuarios", text: "Usuarios" },
            { href: "/dashboard/comercio/configuraciones", text: "Configuraciones" },
          ]}
        />

        {/* Productos */}
        <MenuDropdown
          title="Productos"
          icon={<FiBox size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "productos"}
          toggle={() => toggleSubmenu("productos")}
          items={[
            { href: "/dashboard/productos", text: "Productos" },
            { href: "/dashboard/productos/categorias", text: "Categorías" },
            { href: "/dashboard/productos/marcas", text: "Marcas" },
            { href: "/dashboard/productos/talles", text: "Talles" },
            { href: "/dashboard/productos/colores", text: "Colores" },
          ]}
        />

        {/* Ventas */}
        <MenuDropdown
          title="Ventas"
          icon={<FiShoppingCart size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "ventas"}
          toggle={() => toggleSubmenu("ventas")}
          items={[
            { href: "/dashboard/ventas", text: "Ventas" },
            { href: "/dashboard/ventas/caja", text: "Caja" },
            { href: "/dashboard/ventas/movimientos", text: "Movimientos" },
          ]}
        />

        {/* Otros ítems */}
        <MenuItem href="/dashboard/configuracion" icon={<FiSettings size={30} />} text="Configuración" isOpen={isOpen} />
        <MenuItem href="/dashboard/mi-cuenta" icon={<FiUser size={30} />} text="Mi Cuenta" isOpen={isOpen} />
        <MenuItem href="/" icon={<FiLogOut size={30} />} text="Cerrar Sesión" isOpen={isOpen} />
      </nav>
    </aside>
  );
};

// Componente para ítems del menú
const MenuItem = ({ href, icon, text, isOpen }: { href: string; icon: React.ReactElement; text: string; isOpen: boolean }) => (
  <Link href={href} className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition">
    {icon}
    {isOpen && <span>{text}</span>}
  </Link>
);

// Componente para desplegables con animación
const MenuDropdown = ({
  title,
  icon,
  isOpen,
  isExpanded,
  toggle,
  items,
}: {
  title: string;
  icon: React.ReactElement;
  isOpen: boolean;
  isExpanded: boolean;
  toggle: () => void;
  items: { href: string; text: string }[];
}) => (
  <div>
    <button onClick={toggle} className="flex items-center justify-between p-2 w-full rounded hover:bg-blue-600 transition">
      <div className="flex items-center gap-3">
        {icon}
        {isOpen && <span>{title}</span>}
      </div>
      {isOpen && (
        <FiChevronDown
          className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
        />
      )}
    </button>

    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[500px]" : "max-h-0"}`}>
      <div className="ml-6 space-y-2">
        {items.map((item) => (
          <MenuItem key={item.href} href={item.href} icon={<FiBox size={24} />} text={item.text} isOpen={isOpen} />
        ))}
      </div>
    </div>
  </div>
);

export default Sidebar;
