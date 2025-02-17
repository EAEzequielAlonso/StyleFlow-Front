"use client"; // IMPORTANTE para habilitar el useRouter en Next.js

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Para la navegación en Next.js 13+
import Image from "next/image";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Esto ahora funcionará correctamente

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
    } else {
      setError(null);
      router.push("/dashboard"); // Redirige al dashboard tras el login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@correo.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="******"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
            <a href="/register" className="text-sm text-blue-500 hover:underline">Crear cuenta</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Iniciar sesión
          </button>

          <div className="flex items-center my-4">
            <div className="border-t w-full mr-2"></div>
            <span className="text-gray-500">o</span>
            <div className="border-t w-full ml-2"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            <Image src="/images/google-logo.png" alt="Google" width={20} height={20} />
            <span className="ml-2">Iniciar sesión con Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
