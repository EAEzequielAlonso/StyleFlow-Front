import { useState } from "react";
import { FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";
import { SubcategoryProps } from "../../types";
import { fetchDeleteSubcategory, fetchPutSubcategory } from "./subcategoryApi";

const SubcategoryList: React.FC<SubcategoryProps> = ({ subcategories, setSubcategories}) => {
    
    // Estados para editar subcategorías
    const [editingSubcategoryId, setEditingSubcategoryId] = useState<string | null>(null);
    const [editedSubcategoryName, setEditedSubcategoryName] = useState("");
  
    // Funciones para editar subcategorías
  const startEditSubcategory = (id: string, currentName: string) => {
    setEditingSubcategoryId(id);
    setEditedSubcategoryName(currentName);
  };

  const updateSubcategory = async (subcategoryId: string) => {
    if (editedSubcategoryName.trim() === "") return;
    try {
      await fetchPutSubcategory(subcategoryId, editedSubcategoryName)
      setSubcategories((prev) =>
        prev.map((subcat) => (subcat.id === subcategoryId ? { ...subcat, subcategory: editedSubcategoryName.trim() } : subcat))
      );
    }catch (error) {
      console.error("Error al actualizar la Subcategoría:", error);
    } finally {
      setEditingSubcategoryId(null);
      setEditedSubcategoryName("");
    }
  };

  const cancelEditSubcategory = () => {
    setEditingSubcategoryId(null);
    setEditedSubcategoryName("");
  };

  // Función para eliminar subcategoría
  const deleteSubcategory = async (subcategoryId: string) => {
    try {
        // Llamar a la API para eliminar la categoría
        await fetchDeleteSubcategory(subcategoryId);
        setSubcategories((prev) => prev.filter((subcat) => subcat.id !== subcategoryId));
    } catch (error) {
      console.error("Error al eliminar la Subcategoría:", error);
    }
  };
    
    return (
        <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-[#0D47A1]">Nombre</th>
                    <th className="py-2 px-4 text-[#0D47A1]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {subcategories.map((sub) => (
                    
                    <tr key={sub.id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4 text-[#424242]">
                        {editingSubcategoryId === sub.id ? (
                          <input
                            type="text"
                            value={editedSubcategoryName}
                            onChange={(e) => setEditedSubcategoryName(e.target.value)}
                            className="border border-gray-300 p-1 rounded w-full"
                          />
                        ) : (
                          sub.subcategory
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingSubcategoryId === sub.id ? (
                          <>
                            <button
                              onClick={() => updateSubcategory(sub.id)}
                              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                            >
                              <FiCheck size={20} />
                            </button>
                            <button
                              onClick={cancelEditSubcategory}
                              className="bg-gray-500 text-white px-2 py-1 rounded"
                            >
                              <FiX size={20} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditSubcategory(sub.id, sub.subcategory)}
                              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                            >
                              <FiEdit size={20} />
                            </button>
                            <button
                              onClick={() => deleteSubcategory(sub.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              <FiTrash size={20} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>
    )
}

export default SubcategoryList;