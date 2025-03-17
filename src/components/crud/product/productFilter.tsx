"use client"

import { useCrudProduct } from "@/store";

export interface filterProps {
    type: "number" | "input" | "select";
    label: string;
    searchKey: string;// a que coresponde de searchQuery    
    data?: {id:string; name:string}[];
}

interface Props {
    filterForm: filterProps[]
}

export default function ProductFilter ({ filterForm }: Props) {
  
  const { setSearchQuery, setUpdate } = useCrudProduct();
    // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear un objeto para almacenar los valores del formulario
    const formData: any = {};

    // Iterar sobre todos los elementos del formulario
    Array.from(e.currentTarget.elements).forEach((element) => {
      if (
        (element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement) &&
        element.name // Solo considerar elementos con un atributo "name"
      ) {
        // Guardar el valor del campo en el objeto formData usando el nombre del campo como clave
        formData[element.name] = element.value;
      }
    });
    // Actualizar el estado searchQuery con los valores capturados
    setSearchQuery(formData);
    setUpdate()
  };

  return (
    <form className="container-search" onSubmit={handleSubmit}>
      {filterForm.map((element) => (
        <div key={element.searchKey.toString()}>
          {/* Etiqueta del campo */}
          <label>{element.label}</label>

          {/* Renderizar select o input según el tipo */}
          {element.type === "select" ? (
            <select
              defaultValue="" 
              name={element.searchKey}
            >
              {/* Renderizar las opciones del select */}
              <option value="">Elige una Opción</option>
              {element.data?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={element.type}
              defaultValue="" 
              name={element.searchKey}
              placeholder="Buscar..."
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn-text-orange">
        Buscar
      </button>
    </form>
  );
};
