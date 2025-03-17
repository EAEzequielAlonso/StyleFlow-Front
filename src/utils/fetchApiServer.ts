import { cookies } from "next/headers";

const routeApi = process.env.NEXT_PUBLIC_API_URL

// Función para redirigir al login si no hay token
const redirectToLogin = async (): Promise<string> => {
   const getCookie = await cookies()
   const token = getCookie.get("token")?.value;
   if (!token) {
     throw new Error("No token found, please log in.");
   }
   return token;
};

// FETCH PARA PRODUCTOS.
//Obtener todos los productos,
export const fetchGetServer = async (endpoint:string, queryParams = '', label: string, search: object) => {
  try {
    const token = await redirectToLogin()
    const response = await fetch(`${routeApi}/${endpoint}?${queryParams}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search
      }),
    });

    return await response.json();

  } catch (error) {
    throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
  }
};
// Obtener todos los datos de la relacion asociada.
export const fetchGetRelationServer = async (endpoint: string, label: string) => {
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

