"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface MenuOptionGoup {
    href:string;
    title:string;
}

export const MenuGroup: React.FC<{ menuGroup: MenuOptionGoup[] }> = ({menuGroup}) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
    return (
        <div className="mr-4 p-4 flex space-x-4">
            {menuGroup.map((menu) => {
               return (
                 <Link
                    key = {menu.title}
                    href={menu.href}              
                    className={`px-4 py-2 rounded text-xl font-montserrat shadow-lg ${
                    isActive(menu.href)
                        ? "bg-[#0D47A1] text-white"
                        : "bg-white text-[#0D47A1] border border-[#0D47A1]"
                    }`}
                    >
                    {menu.title}
              </Link>
               )
            })}
          </div>
    )
}

export default MenuGroup;