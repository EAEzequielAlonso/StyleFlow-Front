import { Selected } from "../types";
import { fetchDelete, fetchPost, fetchPut } from "../fetchApi"
import { FormEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";


const PanelAcciones: React.FC<Selected> = ({selected, setSelected, actionUpdate, setActionUpdate}) => {
    
      // Maneja el envío del formulario (creación o actualización)
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    try {
      if (selected) 
        {await fetchPut(selected.id, name)
      } else {await fetchPost(name)}
        // Se actualiza la lista de categorías
        setActionUpdate(!actionUpdate);
        setSelected(null);
        form.reset();
    } catch (error) {
      console.error("Error en el submit del formulario:", error);
    }
  };

  // Función para eliminar la categoría seleccionada
  const handleDelete = async () => {
    if (!selected) return;
    try {
      await fetchDelete(selected.id)
      //NECESITO ACTUALIZAR LA TABLA
      setActionUpdate(!actionUpdate);
      setSelected(null);
    } catch (error) {
      console.error("Error en la eliminación:", error);
    }
  };
    
    return (
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300">
        <div className="flex flex-row justify-between items-center">
            <h2> Panel de Acciones </h2>
            <button 
                className="btn-icon-orange"
                onClick= { () => setSelected(null) }>
                <AiOutlinePlus size={20}/>
            </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nombre</label>
            <input
              name="name"
              defaultValue={selected?.name || ""}
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex space-x-2 justify-end">
            <button
              type="submit"
              className="btn-text-green"
            >
              { selected ? "Actualizar" : "Guardar" }
            </button>
            {selected && (
              <button
                type="button"
                onClick={handleDelete}
                className="btn-text-red"
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    )
}

export default PanelAcciones;