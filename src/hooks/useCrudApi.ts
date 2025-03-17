
import { useState } from 'react';
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { SearchQuery } from '@/types';

const routeApi = process.env.NEXT_PUBLIC_API_URL

interface CrudState<T> {
  items: [T[], number];
  loading: boolean;
  error: string | null;
}

interface RelatedData {
  [key: string]: Array<{ id: string; name: string }>;
}

interface UseCrudApiOptions {
  endpoint: string;
  relations?: string[];
}

const token = getCookie("token");

// Función para redirigir al login si no hay token
const redirectToLogin = () => {
 
  if (!token) {
    const router = useRouter();
    router.push("/login");
    throw new Error("No token found, please log in.");
  }
};

export const useCrudApi = <T extends { id?: string}>(
  options: UseCrudApiOptions
) => {
  const { endpoint, relations = [] } = options;

  const [state, setState] = useState<CrudState<T>>({
    items: [[], 0],
    loading: false,
    error: null,
  });

  const [relatedData, setRelatedData] = useState<RelatedData>({});
  const [loadingRelated, setLoadingRelated] = useState(false);

  const fetchRelatedData = async () => {
    
    redirectToLogin()
    
    if (relations.length === 0) return;
    setLoadingRelated(true);
    try {
      const relatedDataPromises = relations.map((relation) =>
        fetch(`${routeApi}/${relation}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
            .then((res) => res.json())
      );

      const results = await Promise.all(relatedDataPromises);

      const relatedDataMap = relations.reduce((acc, relation, index) => {
        acc[relation] = results[index];
        return acc;
      }, {} as RelatedData);

      setRelatedData(relatedDataMap);
    } catch (error) {
      console.error('Error fetching related data:', error);
    } finally {
      setLoadingRelated(false);
    }
  };

  const fetchItems = async (queryParams = '', search: SearchQuery) => {
    
    redirectToLogin()
    
    setState((prev) => ({ ...prev, loading: true }));
    
    try {
      const response = await fetch(`${routeApi}/${endpoint}?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      });

      const items = await response.json();

      setState({ items, loading: false, error: null });
    } catch (err) {
      setState({ items:[[],0], loading: false, error: 'Error fetching data' });
    }
  };

  const createItem = async (item: Omit<T, 'id'>) => {
    try {
      const response = await fetch(`${routeApi}/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const newItem = await response.json();
      setState((prev) => ({ ...prev, data: [...prev.items, newItem] }));
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const updateItem = async (id: string | number, item: Partial<T>) => {
    try {
      const response = await fetch(`${routeApi}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const updatedItem = await response.json();
      setState((prev) => ({
        ...prev,
        data: prev.items[0].map((i) => (i.id === id ? updatedItem : i)),
      }));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id: string | number) => {
    try {
      await fetch(`${routeApi}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setState((prev) => ({
        ...prev,
        data: prev.items[0].filter((i) => i.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

 /* useEffect(() => {
    fetchItems("", {});
    fetchRelatedData();
  }, []);*/

  return {
    ...state,
    relatedData,
    loadingRelated,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
};