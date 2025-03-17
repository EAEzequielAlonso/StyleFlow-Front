"use client"

import { useCrudProduct } from "@/store";
import { Product } from "@/types";
import { fetchGetClient } from "@/utils/fetchApiClient"; 
import { useEffect } from "react";

interface Props {
  initialData: Product[];
}

export default function ProductTable ({initialData}: Props) {

    const {data, setData, selected, setSelected, sort, setSort, update,
      page, limit, searchQuery, setTotalPages
    } = useCrudProduct()

    const columns: {key: "name" | "category" | "brand" | "sizeType", label: string}[] = [
        {key: "name", label: "Nombre"},
        {key: "category", label: "Categoria"},
        {key: "brand", label: "Marca"},
        {key: "sizeType", label: "Grupo de Talles"},
    ]

    useEffect (() => {
       setData(initialData)
    },[initialData, setData])

    useEffect (() => {
      const fetchData = async () => {
        try {
          const result = await fetchGetClient(
            "product/getproducts",
            `page=${page}&limit=${limit}&sortField=${sort.field}&sortOrder=${sort.order}`,
            "Productos",
            searchQuery
          );
    
          setData(result[0]);
          setTotalPages(Math.ceil(result[1]/limit));
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      };
      fetchData(); // Llamar a la función asíncrona
      
   },[update, sort])

    return (
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  onClick={() => {
                    const newOrder = sort.order === "asc" ? "desc" : "asc";
                    setSort({ field: column.key.toString(), order: newOrder });
                   }}
                >
                  {column.label}
                  {sort.field === column.key.toString() && <span>{sort.order === "asc" ? " ▲" : " ▼"}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className={`${selected?.id === item.id ? "bg-[#fff3da]" : ""}`}
                onClick={() => setSelected(item)}
              >
                {columns.map((column) => (
                  <td key={column.key.toString()}>{column.key==="name" ? item[column.key] : item[column.key].name}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
}