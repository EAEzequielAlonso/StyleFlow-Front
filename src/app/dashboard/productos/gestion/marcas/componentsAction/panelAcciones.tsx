import { CategorySelected } from "../types";
import { fetchDeleteCategory, fetchPostCategory, fetchPutCategory } from "../categoryApi"
import { FormEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";


const PanelAcciones: React.FC<CategorySelected> = ({selectedCategory, setSelectedCategory, actionUpdate, setActionUpdate}) => {
    
      // Maneja el envío del formulario (creación o actualización)
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const category = (form.elements.namedItem("category") as HTMLInputElement).value
    try {
      if (selectedCategory) 
        {await fetchPutCategory(selectedCategory.id, category)
      } else {await fetchPostCategory(category)}
        // Se actualiza la lista de categorías
        setActionUpdate(!actionUpdate);
        setSelectedCategory(null);
        form.reset();
    } catch (error) {
      console.error("Error en el submit del formulario:", error);
    }
  };

  // Función para eliminar la categoría seleccionada
  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      await fetchDeleteCategory(selectedCategory.id)
      //NECESITO ACTUALIZAR LA TABLA
      setActionUpdate(!actionUpdate);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error en la eliminación:", error);
    }
  };
    
    return (
        <div className="w-1/3 bg-white p-4 rounded shadow">
        <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold text-[#1976D2] mb-4 font-montserrat">
            Panel de Acciones
            </h2>
            <button 
                className="p-3 bg-[#FF9800] text-white shadow-xl hover:bg-orange-600 active:scale-90 rounded font-montserrat"
                onClick= { () => setSelectedCategory(null) }>
                <AiOutlinePlus size={20}/>
            </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nombre</label>
            <input
              name="category"
              defaultValue={selectedCategory?.category || ""}
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex space-x-2 justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#5fbd20] text-white shadow-xl rounded font-montserrat active:scale-90"
            >
              {selectedCategory ? "Actualizar" : "Guardar"}
            </button>
            {selectedCategory && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white shadow-xl rounded font-montserrat active:scale-90"
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