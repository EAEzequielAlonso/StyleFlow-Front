// api.ts
import { getCookie } from "cookies-next"; // Asegúrate de tener esta librería
import { Color } from "./types"; // Ajusta la importación si es necesario
import { useRouter } from "next/router";

// Función para redirigir al login si no hay token
const redirectToLogin = () => {
  const router = useRouter();
  router.push("/login");
};

export const fetchGet = async (page:number, limit:number, searchQuery:string, sortField:string, sortOrder:string): Promise<[Color[],number]> => {
  try {
    const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/color?page=${page}&limit=${limit}&search=${encodeURIComponent(
        searchQuery
      )}&sortField=${sortField}&sortOrder=${sortOrder}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los colores");
    }

    const data: [Color[], number] = await response.json();
    return data;
  } catch (error) {
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchPut = async (id: string, name: string) => {
  const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/color/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el color");
  }

  return await response.json();
};

export const fetchPost = async (name: string) => {
  const token = getCookie("token");

  if (!token) {
    redirectToLogin(); // Redirige al login si no hay token
    throw new Error("No token found, please log in.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/color`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al agregar el color");
  }

  return await response.json();
};

export const fetchDelete = async (id: string) => {
  const token = getCookie("token");
  if (!token) {
    redirectToLogin(); // Redirige al login si no hay token
    throw new Error("No token found, please log in.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/color/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el color");
  }

  return await response.json();
};