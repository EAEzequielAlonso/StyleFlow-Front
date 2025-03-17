"use client"

// api.ts
import { getCookie } from "cookies-next"; // Asegúrate de tener esta librería
import { Product, SearchData, CatMarGroup } from "./types"; // Ajusta la importación si es necesario
import { useRouter } from "next/router";

// Función para redirigir al login si no hay token
const redirectToLogin = () => {
  const router = useRouter();
  router.push("/login");
};

export const fetchGet = async (page:number, limit:number, search: SearchData, sortField:string, sortOrder:string): Promise<[Product[],number]> => {
  try {
    const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/getProducts?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los Productos");
    }

    const data: [Product[], number] = await response.json();
    return data;
  } catch (error) {
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchGetOptions = async (route: string, label: string): Promise<CatMarGroup[]> => {
  try {
    const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al obtener los datos en ${label}`);
    }

    const data: CatMarGroup[] = await response.json();
    return data;
  } catch (error) {
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchGetOptionsByGroup = async (id:string, route: string, label: string) => {
  try {
    const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}/:${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al obtener los datos en ${label}`);
    }

    const data: CatMarGroup[] = await response.json();
    return data;
  } catch (error) {
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchPut = async (id: string, product: Partial<Product>) => {
  const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el producto");
  }

  return await response.json();
};

export const fetchPost = async (product: Partial<Product>) => {
  const token = getCookie("token");

  if (!token) {
    redirectToLogin(); // Redirige al login si no hay token
    throw new Error("No token found, please log in.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al agregar el producto");
  }

  return await response.json();
};

export const fetchDelete = async (id: string) => {
  const token = getCookie("token");
  if (!token) {
    redirectToLogin(); // Redirige al login si no hay token
    throw new Error("No token found, please log in.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el Producto");
  }

  return await response.json();
};