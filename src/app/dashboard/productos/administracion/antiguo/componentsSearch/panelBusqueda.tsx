import React, { useState } from "react";
import { Selected, SearchData } from "../types";
import Search from "./search";
import Table from "./table";
import Pagination from "./pagination";

const PanelBusqueda: React.FC<Selected> = ( {selected, setSelected, actionUpdate, options} ) => {
    

  // Estados para la búsqueda
  const [searchQuery, setSearchQuery] = useState<SearchData>({
    name:"", 
    categoryId: "",
    subcategoryId:"",
    brandId:"",
    modelId:"",
    sizeTypeId:"",
  });
  
  // Estado para la paginación
  const [page, setPage] = useState(1);
  const [totalReg, setTotalReg] = useState(0);

  const dataSearch = {
    setPage,
    setSearchQuery,
    searchQuery,
    options
  }

  const dateTable = {
    setTotalReg,
    page,
    searchQuery,
    selected,
    setSelected,
    actionUpdate
  }


    return (
        <>
        {/* Panel Izquierdo: Tabla de Categorías */}
      <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300">
        {/* Formulario de búsqueda */}
        <Search {...dataSearch}/>

        {/* Tabla de categorías */}
        <Table {...dateTable} />

        {/* Paginación */}
        <Pagination totalReg={totalReg} page={page} setPage={setPage} />

      </div>
        </>
    )
}

export default PanelBusqueda;