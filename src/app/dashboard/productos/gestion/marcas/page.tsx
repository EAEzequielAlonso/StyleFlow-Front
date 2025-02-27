
"use client";

import { useState } from "react";
import { Category as Categoria } from "./types";
import PanelBusqueda from "./componentsSearch/panelBusqueda";
import PanelAcciones from "./componentsAction/panelAcciones";

const CategoriesAdmin = () => {
  // Estado para la categoría seleccionada (para editar o eliminar)
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(null);

  // Estado para actualizar tabla cuando realizo accion desde PanelAction
  const [actionUpdate, setActionUpdate] = useState<boolean>(false);

  return (
    <div className="flex gap-4 p-4">
  
      {/* Panel Derecho: Formulario de Creación / Edición */}
      <PanelBusqueda selectedCategory={selectedCategory} setSelectedCategory= {setSelectedCategory} actionUpdate={actionUpdate}/>

      {/* Panel Derecho: Formulario de Creación / Edición */}
      <PanelAcciones selectedCategory={selectedCategory} setSelectedCategory= {setSelectedCategory} actionUpdate={actionUpdate} setActionUpdate={setActionUpdate} />

    </div>
  );
};

export default CategoriesAdmin;
