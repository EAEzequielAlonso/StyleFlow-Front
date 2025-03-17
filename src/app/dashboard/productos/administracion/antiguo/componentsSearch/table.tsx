"use client"
import { useEffect, useState } from "react";
import { Product, TableProp } from "../types";
import { fetchGet } from "../fetchApi";

const Table: React.FC<TableProp>  = ({setTotalReg, page, searchQuery, selected, setSelected, actionUpdate}) => {

  // Estado para la ordenación
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // Estado para la lista de categorías
  const [data, setData] = useState<Product[]>([]);
  const limit = 10

  // Cada vez que cambian la página, la búsqueda o el orden, se refresca la data
  const actualizaTabla = async () => {
    const result:[Product[], number] = await fetchGet(page, limit, searchQuery, sortField, sortOrder)
    setTotalReg(result[1]);
    setData(result[0]);
  }


  useEffect( () => {
      actualizaTabla();
      // Se limpia la selección al actualizar la data
      setSelected(null);
    }, [page, searchQuery, sortField, sortOrder, actionUpdate]);
    
  // Maneja la selección de una categoría de la tabla para editarla o eliminarla
    const handleSelectCategory = (gt: Product) => {
      setSelected(gt);
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
              <th
                onClick={() => {
                  setSortField("brand");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}>
                Marca
                {sortField === "brand" && <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>}
              </th>
              <th
                onClick={() => {
                  setSortField("category");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}>
                Categoria
                {sortField === "category" && <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>}
              </th>
              <th
                onClick={() => {
                  setSortField("subcategory");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}>
                Subcategoria
                {sortField === "subcategory" && <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dat) => (
              <tr
                key={dat.id}
                className={`${selected?.id === dat.id ? "bg-[#fff3da]" : ""}`}
                onClick={() => handleSelectCategory(dat)}
              >
                <td>{dat.name}</td>
                <td>{dat.brand.name}</td>
                <td>{dat.category.name}</td>
                <td>{dat.subcategory.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
}

export default Table;