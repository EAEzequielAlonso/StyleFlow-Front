import React, { useState } from "react";
import { CategorySelected } from "../types";
import CategorySearch from "./categorySearch";
import CategoryTable from "./categoryTable";
import CategoryPagination from "./categoryPagination";

const PanelBusqueda: React.FC<CategorySelected> = ({selected, setSelected, actionUpdate}) => {
    

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  
  // Estado para la paginación
  const [page, setPage] = useState(1);
  const [totalCat, setTotalCat] = useState(0);

    return (
        <>
        {/* Panel Izquierdo: Tabla de Categorías */}
      <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300">
        {/* Formulario de búsqueda */}
        <CategorySearch setPage={setPage} setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>

        {/* Tabla de categorías */}
        <CategoryTable setTotalCat={setTotalCat} page={page} searchQuery={searchQuery} selected={selected} setSelected={setSelected} actionUpdate={actionUpdate} />

        {/* Paginación */}
        <CategoryPagination totalCat={totalCat} page={page} setPage={setPage} />

      </div>
        </>
    )
}

export default PanelBusqueda;