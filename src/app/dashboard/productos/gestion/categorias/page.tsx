
"use client";

import { useState, useEffect, FormEvent } from "react";
import { fetchDeleteCategory, fetchGetCategories, fetchPostCategory, fetchPutCategory } from "./categoryApi";
import { Category as Categoria } from "./types";


const CategoriesAdmin = () => {
  // Estado para la lista de categorías
  const [categories, setCategories] = useState<Categoria[]>([]);
  // Estado para la categoría seleccionada (para editar o eliminar)
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(null);
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  // Estado para la paginación
  const [page, setPage] = useState(1);
  // Estado para la ordenación
  const [sortField, setSortField] = useState("category");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const limit = 10
  // Cada vez que cambian la página, la búsqueda o el orden, se refresca la data
  const actualizaTablaCategorias = async () => {
    const result:[Categoria[], number] = await fetchGetCategories(page, limit, searchQuery, sortField, sortOrder)
    setCategories(result[0]);
  }
  useEffect( () => {
    actualizaTablaCategorias();
    // Se limpia la selección al actualizar la data
    setSelectedCategory(null);
  }, [page, searchQuery, sortField, sortOrder]);

  // Maneja la selección de una categoría de la tabla para editarla o eliminarla
  const handleSelectCategory = (cat: Categoria) => {
    setSelectedCategory(cat);
  };

  // Maneja el envío del formulario (creación o actualización)
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const category = (form.elements.namedItem("category") as HTMLInputElement).value
    try {
      let res
      if (selectedCategory) 
        {res = await fetchPutCategory(selectedCategory.id, category)
      } else {res = await fetchPostCategory(category)}
      console.log(res)
      if (res.ok) {
        console.log("entro a la actualizacion")
        // Se actualiza la lista de categorías
        await fetchGetCategories(page, limit, searchQuery, sortField, sortOrder);
        setSelectedCategory(null);
        form.reset();
      } else {
        console.log("entro al error")
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error en el submit del formulario:", error);
    }
  };

  // Función para eliminar la categoría seleccionada
  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      console.log("selectedCategory.id ",selectedCategory.id)
      const res = await fetchDeleteCategory(selectedCategory.id)
      if (res.ok) {
        await actualizaTablaCategorias();
        setSelectedCategory(null);
      } else {
        console.error("Error al eliminar la categoría");
      }
    } catch (error) {
      console.error("Error en la eliminación:", error);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Panel Izquierdo: Tabla de Categorías */}
      <div className="w-2/3 bg-white p-4 rounded shadow">
        {/* Formulario de búsqueda */}
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por nombre..."
            className="border border-gray-300 rounded p-2 flex-1"
          />
          <button
            onClick={() => setPage(1)}
            className="px-4 py-2 bg-[#FF9800] text-white rounded font-montserrat"
          >
            Buscar
          </button>
        </div>

        {/* Tabla de categorías */}
        <table className="w-full">
          <thead>
            <tr className="bg-[#1976D2] text-white">
              <th
                onClick={() => {
                  setSortField("category");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                className="cursor-pointer p-2"
              >
                Nombre
                {sortField === "category" && <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className={`border-b cursor-pointer hover:bg-[#F5F5F5] ${
                  selectedCategory?.id === cat.id ? "bg-[#F5F5F5]" : ""
                }`}
                onClick={() => handleSelectCategory(cat)}
              >
                <td className="p-2">{cat.category}</td>
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
          {selectedCategory ? "Editar Categoría" : "Crear Categoría"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nombre</label>
            <input
              name="category"
              defaultValue={selectedCategory?.category || ""}
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF9800] text-white rounded font-montserrat"
            >
              {selectedCategory ? "Actualizar" : "Crear"}
            </button>
            {selectedCategory && (
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

export default CategoriesAdmin;
