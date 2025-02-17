"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR DESKTOP */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg fixed w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="text-white text-2xl font-bold tracking-wide">
            Mi<span className="text-yellow-400">SaaS</span>
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
            <Link href="#benefits" className="hover:text-yellow-300 transition">Beneficios</Link>
            <Link href="#pricing" className="hover:text-yellow-300 transition">Precios</Link>
            <Link href="#testimonials" className="hover:text-yellow-300 transition">Casos de Éxito</Link>
            <Link href="#clients" className="hover:text-yellow-300 transition">Clientes</Link>
          </div>

          {/* BOTONES LOGIN/REGISTRO */}
          <div className="hidden md:flex space-x-4">
            <Link href="/login">
              <button className="bg-transparent border border-white px-4 py-2 text-white rounded-lg hover:bg-white hover:text-blue-600 transition">
                Iniciar Sesión
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-yellow-400 px-4 py-2 text-blue-800 font-semibold rounded-lg hover:bg-yellow-300 transition">
                Regístrate Gratis
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* BOTÓN FLOTANTE MENU (SOLO EN MOBILE) */}
      <button
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg text-white text-2xl hover:bg-blue-700 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* DROPDOWN MOBILE */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-blue-800 bg-opacity-95 flex flex-col items-center justify-center text-white space-y-6 z-50">
          <Link href="#benefits" className="text-xl hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Beneficios</Link>
          <Link href="#pricing" className="text-xl hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Precios</Link>
          <Link href="#testimonials" className="text-xl hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Casos de Éxito</Link>
          <Link href="#clients" className="text-xl hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Clientes</Link>
          <Link href="/login">
            <button className="bg-transparent border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition w-full">
              Iniciar Sesión
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-yellow-400 px-6 py-3 text-blue-800 font-semibold rounded-lg hover:bg-yellow-300 transition w-full">
              Regístrate Gratis
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
