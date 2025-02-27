import { useEffect, useState } from "react";
import { Category, CategoryTableProp } from "../types";
import { fetchGetCategories } from "../categoryApi";

const CategoryTable: React.FC<CategoryTableProp>  = ({page, searchQuery, selectedCategory, setSelectedCategory, actionUpdate}) => {

  // Estado para la ordenación
  const [sortField, setSortField] = useState("category");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // Estado para la lista de categorías
  const [categories, setCategories] = useState<Category[]>([]);
  const limit = 10

  // Cada vez que cambian la página, la búsqueda o el orden, se refresca la data
  const actualizaTablaCategorias = async () => {
    const result:[Category[], number] = await fetchGetCategories(page, limit, searchQuery, sortField, sortOrder)
    setCategories(result[0]);
  }


  useEffect( () => {
      actualizaTablaCategorias();
      // Se limpia la selección al actualizar la data
      setSelectedCategory(null);
    }, [page, searchQuery, sortField, sortOrder, actionUpdate]);
    
  // Maneja la selección de una categoría de la tabla para editarla o eliminarla
    const handleSelectCategory = (cat: Category) => {
      setSelectedCategory(cat);
    };

  return (
        <table className="w-full">
          <thead>
            <tr className="bg-[#1976D2] text-white">
              <th
                onClick={() => {
                  setSortField("category");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                className="cursor-pointer p-2 shadow-lg"
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
                className={`border-b cursor-pointer hover:bg-[#fff3da] ${
                  selectedCategory?.id === cat.id ? "bg-[#fff3da]" : ""
                }`}
                onClick={() => handleSelectCategory(cat)}
              >
                <td className="p-2">{cat.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
}

export default CategoryTable;