import { Product, Selected } from "../types";
import { fetchDelete, fetchPost, fetchPut } from "../fetchApi"
import { FormEvent, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
 

const PanelAcciones: React.FC<Selected> = ({selected, setSelected, actionUpdate, setActionUpdate, options}) => {
  
  const [selectedState, setSelectedState] = useState<Product | null>(null);

  // Sincroniza el estado cuando `selected` cambia
  useEffect(() => {
      setSelectedState(selected);

  }, [selected]);
   
      // Maneja el envío del formulario (creación o actualización)
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const product:Partial<Product> = {
      name : (form.elements.namedItem("name") as HTMLInputElement).value,
      description : (form.elements.namedItem("name") as HTMLInputElement).value,
      image : (form.elements.namedItem("name") as HTMLInputElement).value,
      cost : +(form.elements.namedItem("cost") as HTMLInputElement).value,
      profit : +(form.elements.namedItem("profit") as HTMLInputElement).value,
      price : +(form.elements.namedItem("price") as HTMLInputElement).value,
      startDate : new Date(),
      categoryId: (form.elements.namedItem("categoryId") as HTMLSelectElement).value,
      brandId: (form.elements.namedItem("brandId") as HTMLSelectElement).value,
      sizeTypeId: (form.elements.namedItem("sizeTypeId") as HTMLSelectElement).value,
    }
    
    try {
      if (selected) 
        {await fetchPut(selected.id, selectedState!)
      } else {await fetchPost(product)}
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
                onClick= { () => { 
                  setSelected(null) 
                  } }>
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
          <div className="mb-4">
            <label className="block mb-1">Descripcion</label>
            <input
              name="description"
              defaultValue={selected?.description || ""}
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Imagen</label>
            <input
              name="image"
              defaultValue={selected?.image || ""}
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Costo</label>
            <input
              name="cost"
              defaultValue={selected?.cost || ""}
              type="number"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Ganancia</label>
            <input
              name="profit"
              defaultValue={selected?.profit || ""}
              type="number"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">precio</label>
            <input
              name="price"
              defaultValue={selected?.price || ""}
              type="number"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Marca</label>
            <select
              name="brandId"
              value={selectedState?.brand.id || ""}
              onChange={(e) => setSelectedState((prev) =>
                prev ? { ...prev, brand: { id: e.target.value, name: e.target.selectedOptions[0].text } }
                     : prev // Si `prev` es `null`, lo dejamos como está para no romper el estado
              )}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Seleccione una Marca</option>
              {options?.brand && options.brand.map((dat) => (
                <option key={dat.id} value={dat.id}>
                  {dat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Categoria</label>
            <select
              name="categoryId"
              value={selectedState?.category.id || ""}
              onChange={(e) => setSelectedState((prev) =>
                prev ? { ...prev, category: { id: e.target.value, name: e.target.selectedOptions[0].text } }
                     : prev // Si `prev` es `null`, lo dejamos como está para no romper el estado
              )}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Seleccione una Categoria</option>
              {options?.category && options.category.map((dat) => (
                <option key={dat.id} value={dat.id}>
                  {dat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Grupo de Talles</label>
            <select
              name="sizeTypeId"
              value={selectedState?.sizeType.id || ""}
              onChange={(e) => setSelectedState((prev) =>
                prev ? { ...prev, sizeType: { id: e.target.value, name: e.target.selectedOptions[0].text } }
                     : prev // Si `prev` es `null`, lo dejamos como está para no romper el estado
              )}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Seleccione un Grupo de Talles</option>
              {options?.sizeType && options.sizeType.map((dat) => (
                <option key={dat.id} value={dat.id}>
                  {dat.name}
                </option>
              ))}
            </select>
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