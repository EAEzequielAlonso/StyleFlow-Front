"use client";

import { useEffect, useState } from "react";
import { Subcategory, Category } from "./types";
import PanelBusqueda from "./componentsSearch/panelBusqueda";
import PanelAcciones from "./componentsAction/panelAcciones";
import { fetchGetOptions } from "./fetchApi";

const CategoriesAdmin = () => {
  // Estado para la categoría seleccionada (para editar o eliminar)
  const [selected, setSelected] = useState<Subcategory | null>(null);

  // Estado para la categoría seleccionada (para editar o eliminar)
  const [options, setOptions] = useState<Category[] | null>(null);

  // Estado para actualizar tabla cuando realizo accion desde PanelAction
  const [actionUpdate, setActionUpdate] = useState<boolean>(false);
  
  const dataBusqueda = {
    selected,
    setSelected,
    options,
    actionUpdate
  }

  const dataAcciones = {
    selected,
    setSelected,
    options,
    actionUpdate,
    setActionUpdate
  }

  const loadOptions = async () => {
    const resOptions = await fetchGetOptions();
    setOptions(resOptions);
  }

  useEffect ( () => {
    loadOptions();
  }, [])

  return (

    <div className="flex gap-4">
  
      {/* Panel Derecho: Formulario de Creación / Edición */}
      <PanelBusqueda {...dataBusqueda}/>

      {/* Panel Derecho: Formulario de Creación / Edición */}
      <PanelAcciones {...dataAcciones}/>

    </div>
  );
};

export default CategoriesAdmin;
