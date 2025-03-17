// api.ts
import { getCookie } from "cookies-next"; // Asegúrate de tener esta librería
import { Subcategory, Category } from "./types"; // Ajusta la importación si es necesario
import { useRouter } from "next/router";

// Función para redirigir al login si no hay token
const redirectToLogin = () => {
  const router = useRouter();
  router.push("/login");
};

export const fetchGet = async (page:number, limit:number, name:string, optionId:string, sortField:string, sortOrder:string): Promise<[Subcategory[],number]> => {
  try {
    const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategory?page=${page}&limit=${limit}&name=${encodeURIComponent(
        name)}&optionId=${encodeURIComponent(optionId)}&sortField=${sortField}&sortOrder=${sortOrder}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener las subcategorias");
    }

    const data: [Subcategory[], number] = await response.json();
    return data;
  } catch (error) {
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchGetOptions = async (): Promise<Category[]> => {
  try {
    const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/commerce`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener las subcategorias");
    }

    const data: Category[] = await response.json();
    return data;
  } catch (error) {
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchPut = async (id: string, name: string, categoryId: string) => {
  const token = getCookie("token");

    if (!token) {
      redirectToLogin(); // Redirige al login si no hay token
      throw new Error("No token found, please log in.");
    }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategory/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      categoryId
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar la subcategoria");
  }

  return await response.json();
};

export const fetchPost = async (name: string, categoryId: string) => {
  const token = getCookie("token");

  if (!token) {
    redirectToLogin(); // Redirige al login si no hay token
    throw new Error("No token found, please log in.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategory`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      categoryId
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al agregar la subcategoria");
  }

  return await response.json();
};

export const fetchDelete = async (id: string) => {
  const token = getCookie("token");
  if (!token) {
    redirectToLogin(); // Redirige al login si no hay token
    throw new Error("No token found, please log in.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategory/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar la subcategoria");
  }

  return await response.json();
};