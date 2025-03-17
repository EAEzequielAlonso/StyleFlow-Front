import React, { useState } from "react";
import { Selected } from "../types";
import Search from "./search";
import Table from "./table";
import Pagination from "./pagination";

const PanelBusqueda: React.FC<Selected> = ( {selected, setSelected, actionUpdate, options} ) => {
    

  // Estados para la búsqueda
  const [searchQuery, setSearchQuery] = useState({name:"", optionId:""});
  
  // Estado para la paginación
  const [page, setPage] = useState(1);
  const [totalCat, setTotalCat] = useState(0);

  const dataSearch = {
    setPage,
    setSearchQuery,
    searchQuery,
    options
  }


    return (
        <>
        {/* Panel Izquierdo: Tabla de Categorías */}
      <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300">
        {/* Formulario de búsqueda */}
        <Search {...dataSearch}/>

        {/* Tabla de categorías */}
        <Table setTotalCat={setTotalCat} page={page} searchQuery={searchQuery} selected={selected} setSelected={setSelected} actionUpdate={actionUpdate} />

        {/* Paginación */}
        <Pagination totalCat={totalCat} page={page} setPage={setPage} />

      </div>
        </>
    )
}

export default PanelBusqueda;