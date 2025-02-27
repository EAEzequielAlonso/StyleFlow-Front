"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next"; // Para obtener cookies
import { User } from "./type";



export default function DashboardMyCount() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie("token");
      if (!token) {
        router.push("/login"); // Si no hay token, redirige al login
        return;
      } 

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener la información del usuario");
        }

        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        setError("Hubo un error al cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cuenta de Usuario. Estos son tus datos: </h1>

      {user ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={user.imgProfile || "/default-profile.png"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Información adicional</h3>
            <p><strong>DNI:</strong> {user.dni}</p>
            <p><strong>CUIT:</strong> {user.cuit}</p>
            <p><strong>Teléfono:</strong> {user.phone}</p>
            <p><strong>Dirección:</strong> {user.address}</p>
            <p><strong>Ciudad:</strong> {user.city}</p>
            <p><strong>Fecha de nacimiento:</strong> {new Date(user.birthdate).toLocaleDateString()}</p>
            <p><strong>Fecha de inicio:</strong> {new Date(user.startDate).toLocaleDateString()}</p>
            <p><strong>Fecha de finalización:</strong> {new Date(user.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p>No se pudo cargar la información del usuario.</p>
      )}
    </div>
  );
}
