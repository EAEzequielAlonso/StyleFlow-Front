
"use client";

import { useState } from "react";
import { Color } from "./types";
import PanelBusqueda from "./componentsSearch/panelBusqueda";
import PanelAcciones from "./componentsAction/panelAcciones";

const CategoriesAdmin = () => {
  // Estado para la categoría seleccionada (para editar o eliminar)
  const [selected, setSelected] = useState<Color | null>(null);

  // Estado para actualizar tabla cuando realizo accion desde PanelAction
  const [actionUpdate, setActionUpdate] = useState<boolean>(false);

  return (
    <div className="flex gap-4">
  
      {/* Panel Derecho: Formulario de Creación / Edición */}
      <PanelBusqueda selected={selected} setSelected= {setSelected} actionUpdate={actionUpdate}/>

      {/* Panel Derecho: Formulario de Creación / Edición */}
      <PanelAcciones selected={selected} setSelected= {setSelected} actionUpdate={actionUpdate} setActionUpdate={setActionUpdate} />

    </div>
  );
};

export default CategoriesAdmin;
