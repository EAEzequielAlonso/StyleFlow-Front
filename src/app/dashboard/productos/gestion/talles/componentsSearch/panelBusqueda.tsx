import React, { useState } from "react";
import { CategorySelected } from "../types";
import CategorySearch from "./categorySearch";
import CategoryTable from "./categoryTable";
import CategoryPagination from "./categoryPagination";

const PanelBusqueda: React.FC<CategorySelected> = ({selectedCategory, setSelectedCategory, actionUpdate}) => {
    

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  // Estado para la paginación
  const [page, setPage] = useState(1);

    return (
        <>
        {/* Panel Izquierdo: Tabla de Categorías */}
      <div className="w-2/3 bg-white p-4 rounded shadow">
        {/* Formulario de búsqueda */}
        <CategorySearch setPage={setPage} setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>

        {/* Tabla de categorías */}
        <CategoryTable page={page} searchQuery={searchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} actionUpdate={actionUpdate} />

        {/* Paginación */}
        <CategoryPagination page={page} setPage={setPage} />

      </div>
        </>
    )
}

export default PanelBusqueda;