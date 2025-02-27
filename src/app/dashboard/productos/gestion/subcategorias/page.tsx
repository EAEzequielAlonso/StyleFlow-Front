"use client";

import { useState, useEffect, FormEvent } from "react";

interface Subcategoria {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
}

interface Categoria {
  id: number;
  name: string;
}

const SubcategoriesAdmin = () => {
  // Estado para la lista de subcategorías y la subcategoría seleccionada
  const [subcategories, setSubcategories] = useState<Subcategoria[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategoria | null>(null);
  
  // Estados para búsqueda: por nombre de subcategoría y por categoría
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  
  // Estados para paginación y ordenamiento
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Estado para almacenar las categorías disponibles (para asignar a la subcategoría)
  const [categories, setCategories] = useState<Categoria[]>([]);

  // Función para obtener las categorías para el select
  const fetchCategorias = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Error al obtener las categorías");
      const result = await res.json();
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Función para obtener las subcategorías desde la API
  const fetchSubcategories = async () => {
    try {
      const endpoint = `/api/subcategories?page=${page}&limit=10&search=${encodeURIComponent(
        searchQuery
      )}&searchCategory=${encodeURIComponent(searchCategory)}&sortField=${sortField}&sortOrder=${sortOrder}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Error al obtener las subcategorías");
      const result = await res.json();
      setSubcategories(result.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
    // Se limpia la selección al actualizar la data
    setSelectedSubcategory(null);
  }, [page, searchQuery, searchCategory, sortField, sortOrder]);

  // Seleccionar una subcategoría de la tabla para editar o eliminar
  const handleSelectSubcategory = (sub: Subcategoria) => {
    setSelectedSubcategory(sub);
  };

  // Maneja el envío del formulario (creación o actualización)
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      categoryId: Number((form.elements.namedItem("categoryId") as HTMLSelectElement).value),
    };

    try {
      const method = selectedSubcategory ? "PUT" : "POST";
      let endpoint = `/api/subcategories`;
      if (selectedSubcategory) {
        endpoint += `/${selectedSubcategory.id}`;
      }
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchSubcategories();
        setSelectedSubcategory(null);
        form.reset();
      } else {
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error en el submit del formulario:", error);
    }
  };

  // Función para eliminar la subcategoría seleccionada
  const handleDelete = async () => {
    if (!selectedSubcategory) return;
    try {
      const endpoint = `/api/subcategories/${selectedSubcategory.id}`;
      const res = await fetch(endpoint, { method: "DELETE" });
      if (res.ok) {
        await fetchSubcategories();
        setSelectedSubcategory(null);
      } else {
        console.error("Error al eliminar la subcategoría");
      }
    } catch (error) {
      console.error("Error en la eliminación:", error);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Panel Izquierdo: Tabla de Subcategorías */}
      <div className="w-2/3 bg-white p-4 rounded shadow">
        {/* Formulario de búsqueda */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por subcategoría..."
            className="border border-gray-300 rounded p-2 flex-1 mb-2 sm:mb-0"
          />
          <select
            value={searchCategory}
            onChange={(e) => {
              setSearchCategory(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setPage(1)}
            className="px-4 py-2 bg-[#FF9800] text-white rounded font-montserrat"
          >
            Buscar
          </button>
        </div>

        {/* Tabla de subcategorías */}
        <table className="w-full">
          <thead>
            <tr className="bg-[#1976D2] text-white">
              <th
                onClick={() => {
                  setSortField("name");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                className="cursor-pointer p-2"
              >
                Nombre {sortField === "name" && <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>}
              </th>
              <th className="p-2">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((sub) => (
              <tr
                key={sub.id}
                onClick={() => handleSelectSubcategory(sub)}
                className={`border-b cursor-pointer hover:bg-[#F5F5F5] ${
                  selectedSubcategory?.id === sub.id ? "bg-[#F5F5F5]" : ""
                }`}
              >
                <td className="p-2">{sub.name}</td>
                <td className="p-2">{sub.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="mt-4 flex justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-[#0D47A1] text-white rounded font-montserrat disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-[#0D47A1] text-white rounded font-montserrat"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Panel Derecho: Formulario de Creación / Edición */}
      <div className="w-1/3 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-montserrat mb-4">
          {selectedSubcategory ? "Editar Subcategoría" : "Crear Subcategoría"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nombre de la Subcategoría</label>
            <input
              name="name"
              defaultValue={selectedSubcategory?.name || ""}
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Categoría</label>
            <select
              name="categoryId"
              defaultValue={selectedSubcategory?.categoryId || ""}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF9800] text-white rounded font-montserrat"
            >
              {selectedSubcategory ? "Actualizar" : "Crear"}
            </button>
            {selectedSubcategory && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded font-montserrat"
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubcategoriesAdmin;
