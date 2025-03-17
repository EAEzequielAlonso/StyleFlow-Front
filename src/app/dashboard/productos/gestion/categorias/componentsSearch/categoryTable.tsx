import { useEffect, useState } from "react";
import { Category, CategoryTableProp } from "../types";
import { fetchGetCategories } from "../fetchApi";

const CategoryTable: React.FC<CategoryTableProp>  = ({setTotalCat, page, searchQuery, selected, setSelected, actionUpdate}) => {

  // Estado para la ordenación
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // Estado para la lista de categorías
  const [categories, setCategories] = useState<Category[]>([]);
  const limit = 10

  // Cada vez que cambian la página, la búsqueda o el orden, se refresca la data
  const actualizaTabla = async () => {
    const result:[Category[], number] = await fetchGetCategories(page, limit, searchQuery, sortField, sortOrder)
    setTotalCat(result[1]);
    setCategories(result[0]);
  }


  useEffect( () => {
      actualizaTabla();
      // Se limpia la selección al actualizar la data
      setSelected(null);
    }, [page, searchQuery, sortField, sortOrder, actionUpdate]);
    
  // Maneja la selección de una categoría de la tabla para editarla o eliminarla
    const handleSelectCategory = (cat: Category) => {
      setSelected(cat);
    };
 
  return (
        <table className="table">
          <thead>
            <tr>
              <th
                onClick={() => {
                  setSortField("name");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}>
                Nombre
                {sortField === "name" && <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className={`${selected?.id === cat.id ? "bg-[#fff3da]" : ""}`}
                onClick={() => handleSelectCategory(cat)}
              >
                <td>{cat.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
}

export default CategoryTable;