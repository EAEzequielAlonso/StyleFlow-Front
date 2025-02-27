"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // App Router usa "next/navigation"
import { setCookie } from "cookies-next"; // Para manejar cookies
import { signIn } from "next-auth/react"; // Para iniciar sesión con Google

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      setCookie("token", data.token, { maxAge: 60 * 60 * 24 }); // 1 día
      router.push("/dashboard"); // Redirige después del login
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Manejo del inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const res = await signIn("google", { redirect: false });
      if (res?.ok) {
        router.push("/dashboard"); // Redirige al dashboard si el login es exitoso
      } else {
        setError("Error al iniciar sesión con Google.");
      }
    } catch (err: any) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Iniciar sesión</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="tu@correo.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="******"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300">
            Iniciar sesión
          </button>
        </form>

        {/* Botón para iniciar sesión con Google */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
          >
            <img src="./images/google-logo.png" alt="Google" width={24} height={24} className="mr-2" />
            Iniciar sesión con Google
          </button>
        </div>

        {/* Enlaces de ayuda */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="/auth/forgot-password" className="text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
          <p className="my-2">¿No tienes cuenta? <a href="/auth/register" className="text-blue-600 hover:underline">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
