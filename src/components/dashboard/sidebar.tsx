"use client"; // Requiere interactividad

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import { FiShoppingCart, FiLogOut, FiChevronDown } from "react-icons/fi";
import {
  LuShoppingCart,
  LuShoppingBag,     // Venta Rápida
  LuGauge,           // Dashboard
  LuStore,           // Sucursales
  LuBox,             // Productos
  LuPackage,         // Categorías y Marcas
  LuCreditCard,      // Formas de Pago
  LuUsers,           // Usuarios y Roles
  LuSettings,        // Administración
  LuUser,            // Mi Cuenta
  LuBell,            // Notificaciones
  LuDollarSign,      // Pagos y Planes
  LuDatabase,        // Movimientos de Caja
  LuFileText,        // Historial de Ventas
  LuChartNoAxesCombined, // Balances
  LuTrello,
} from "react-icons/lu";
import { IoShirtOutline } from "react-icons/io5";
import { deleteCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface MenuItemProps {
  href: string;
  icon: React.ReactElement;
  text: string;
  isOpen: boolean;
  active: boolean;
}

const MenuItem: React.FC<MenuItemProps> = memo(({ href, icon, text, isOpen, active }) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded transition ${
        active ? "bg-blue-600" : "hover:bg-blue-600"
      }`}
    >
      {icon}
      {isOpen && <span>{text}</span>}
    </Link>
  );
});
MenuItem.displayName = "MenuItem";

interface MenuDropdownItem {
  icon: React.ReactElement;
  href: string;
  text: string;
}

interface MenuDropdownProps {
  title: string;
  icon: React.ReactElement;
  isOpen: boolean;
  isExpanded: boolean;
  toggle: () => void;
  items: MenuDropdownItem[];
}

const MenuDropdown: React.FC<MenuDropdownProps> = memo(({ title, icon, isOpen, isExpanded, toggle, items }) => {
  const pathname = usePathname();
  // Se considera activo si alguna ruta de los items coincide (o es base de la ruta actual)
  const isActive = items.some((item) => pathname.startsWith(item.href));

  return (
    <div>
      <button
        onClick={toggle}
        className={`flex items-center font-semibold justify-between p-2 w-full rounded transition-transform duration-300 ${
          isExpanded || isActive ? "bg-blue-600 shadow-xl" : "hover:bg-blue-600"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          {isOpen && <span className="w-32 text-left">{title}</span>}
        </div>
        {isOpen && (
          <FiChevronDown
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="ml-4 space-y-2">
          {items.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              text={item.text}
              isOpen={isOpen}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
MenuDropdown.displayName = "MenuDropdown";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  const toggleSubmenu = useCallback(
    (menu: string) => {
      if (openSubmenu && openSubmenu !== menu) {
        setOpenSubmenu(null);
        setTimeout(() => {
          setOpenSubmenu(menu);
        }, 300); // Debe coincidir con la duración de la animación
      } else {
        setOpenSubmenu(openSubmenu === menu ? null : menu);
      }
    },
    [openSubmenu]
  );

  const handleLogout = useCallback(() => {
    deleteCookie("token");
    router.push("/"); // Redirige a la página inicial
  }, [router]);

  return (
    <>
    <div className={`bg-blue-700 text-white h-screen p-4 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out `}>

      </div>
    <aside
      className={`bg-blue-700 text-white h-screen p-4 fixed overflow-y-auto ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out`}
    >
      {/* Botón para abrir/cerrar el sidebar */}
      <button onClick={toggleSidebar} className="mb-6 flex items-center gap-2 text-white">
        <Image src="/images/Logo.svg" alt="Logo SaaS" width="50" height="50"/>
        {isOpen && <span className="text-white font-bold text-xl w-10 pl-4">PHYES SOFT</span>}
      </button>

      {/* Menú */}
      <nav className="space-y-2 text-xl">
        <MenuDropdown
          title="Venta Rapida"
          icon={<LuShoppingCart size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "Venta Rapida"}
          toggle={() => toggleSubmenu("Venta Rapida")}
          items={[
            { icon: <LuShoppingBag size={24} />, href: "/dashboard/venta-rapida", text: "Nueva Venta" },
          ]}
        />

        <MenuDropdown
          title="Dashboard"
          icon={<LuGauge size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "Dashboard"}
          toggle={() => toggleSubmenu("Dashboard")}
          items={[
            { icon: <LuGauge size={24} />, href: "/dashboard/general", text: "General" },
            { icon: <LuTrello size={24} />, href: "/dashboard/datos-fiscales", text: "Datos Fiscales" },
            { icon: <LuChartNoAxesCombined size={24} />, href: "/dashboard/balance-reportes", text: "Blances y Reportes" },
            { icon: <LuBell size={24} />, href: "/dashboard/notificaciones-internas", text: "Notificaciones" },
          ]}
        />

        <MenuDropdown
          title="Caja"
          icon={<LuDatabase size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "Caja"}
          toggle={() => toggleSubmenu("Caja")}
          items={[
            { icon: <LuDollarSign size={24} />, href: "/dashboard/caja/caja-diaria", text: "Caja Diaria" },
            { icon: <LuFileText size={24} />, href: "/dashboard/caja/movimientos", text: "Mov. de Caja" },
          ]}
        />

        <MenuDropdown
          title="Ventas"
          icon={<FiShoppingCart size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "ventas"}
          toggle={() => toggleSubmenu("ventas")}
          items={[
            { icon: <LuFileText size={24} />, href: "/dashboard/ventas/historial", text: "Historial de Ventas" },
            { icon: <LuCreditCard size={24} />, href: "/dashboard/ventas/forma-pago", text: "Formas de Pago" },
          ]}
        />

        <MenuDropdown
          title="Productos"
          icon={<IoShirtOutline size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "productos"}
          toggle={() => toggleSubmenu("productos")}
          items={[
            { icon: <LuPackage size={24} />, href: "/dashboard/productos/administracion", text: "Administracion" },
            { icon: <LuBox size={24} />, href: "/dashboard/productos/gestion", text: "Gestión" },
          ]}
        />

        <MenuDropdown
          title="Administración"
          icon={<LuSettings size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "Administración"}
          toggle={() => toggleSubmenu("Administración")}
          items={[
            { icon: <LuStore size={24} />, href: "/dashboard/administracion/comercio", text: "Comercio" },
            { icon: <LuStore size={24} />, href: "/dashboard/administracion/sucursales", text: "Sucursales" },
            { icon: <LuUsers size={24} />, href: "/dashboard/administracion/usuarios-roles", text: "Usuarios y Roles" },
          ]}
        />

        <MenuDropdown
          title="Mi Cuenta"
          icon={<LuUser size={30} />}
          isOpen={isOpen}
          isExpanded={openSubmenu === "Mi Cuenta"}
          toggle={() => toggleSubmenu("Mi Cuenta")}
          items={[
            { icon: <LuUsers size={24} />, href: "/dashboard/mi-cuenta/perfil", text: "Perfil" },
            { icon: <LuBell size={24} />, href: "/dashboard/mi-cuenta/notificaciones-app", text: "Notificaciones" },
            { icon: <LuDollarSign size={24} />, href: "/dashboard/mi-cuenta/pago-suscripcion", text: "Pago y Suscripcion" },
          ]}
        />

        <button onClick={handleLogout} className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition w-full">
          <div className="flex items-center gap-3">
            <FiLogOut size={30} />
            {isOpen && <span className="w-32 text-left">Cerrar Sesión</span>}
          </div>
        </button>
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
