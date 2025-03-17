import { useEffect, useState } from "react";
import { Marca, TableProp } from "../types";
import { fetchGet } from "../fetchApi";

const Table: React.FC<TableProp>  = ({setTotalCat, page, searchQuery, selected, setSelected, actionUpdate}) => {

  // Estado para la ordenación
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // Estado para la lista de categorías
  const [colors, setColors] = useState<Marca[]>([]);
  const limit = 10

  // Cada vez que cambian la página, la búsqueda o el orden, se refresca la data
  const actualizaTabla = async () => {
    const result:[Marca[], number] = await fetchGet(page, limit, searchQuery, sortField, sortOrder)
    setTotalCat(result[1]);
    setColors(result[0]);
  }


  useEffect( () => {
      actualizaTabla();
      // Se limpia la selección al actualizar la data
      setSelected(null);
    }, [page, searchQuery, sortField, sortOrder, actionUpdate]);
    
  // Maneja la selección de una categoría de la tabla para editarla o eliminarla
    const handleSelectCategory = (mar: Marca) => {
      setSelected(mar);
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
            {colors.map((col) => (
              <tr
                key={col.id}
                className={`${selected?.id === col.id ? "bg-[#fff3da]" : ""}`}
                onClick={() => handleSelectCategory(col)}
              >
                <td>{col.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
}

export default Table;