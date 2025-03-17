"use client"

import { getCookie } from "cookies-next";

const routeApi = process.env.NEXT_PUBLIC_API_URL

// Función para redirigir al login si no hay token
 const redirectToLogin = async (): Promise<string> => {
   const token = await getCookie("token")
   if (!token) {
     throw new Error("No token found, please log in.");
   }
   return token;
 };

export const fetchGetClient = async (endpoint:string, queryParams = '', label: string, search: object) => {
  try {
    const token = await redirectToLogin()
    const response = await fetch(`${routeApi}/${endpoint}?${queryParams}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...search}),
    });
    const resp = await response.json();
    return resp

  } catch (error) {
    throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
  }
};
// Obtener todos los datos de la relacion asociada.
export const fetchGetRelationClient = async (endpoint: string, label: string) => {
  const token = await redirectToLogin();
  try {
    const response = await fetch(`${routeApi}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
        throw new Error (`Error al cargar los datos en ${label}. Error: ${error}`); // Re-lanzar el error para manejarlo en el componente
  }
};

export const createItem = async (item: Omit<any, 'id'>, endpoint: string) => {
    try {
      const token = await redirectToLogin()
      const response = await fetch(`${routeApi}/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      return await response.json();

    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

export const updateItem = async (id: string | number, item: Partial<any>, endpoint:string) => {
    try {
      const token = await redirectToLogin()
      const response = await fetch(`${routeApi}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

export const deleteItem = async (id: string | number, endpoint:string) => {
    try {
      const token = await redirectToLogin()
        const response = await fetch(`${routeApi}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
