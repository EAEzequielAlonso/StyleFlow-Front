"use client"

import { useState } from "react";
import { FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";
import { CategoryListProps } from "../../types";
import { fetchDeleteCategory, fetchPutCategory } from "./categoryApi";

const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories, selectedCategoryId, setSelectedCategoryId }) => {

  // Estados para editar categorías
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

    // Funciones para editar categorías
  const startEditCategory = (id: string, currentName: string) => {
    setEditingCategoryId(id); 
    setEditedCategoryName(currentName);
  };

  const updateCategory = async (id: string) => {
    if (editedCategoryName.trim() === "") return;
    try {
        await fetchPutCategory(id, editedCategoryName)
        setCategories((prev) =>
          prev.map((cat) => (cat.id === id ? { ...cat, category: editedCategoryName.trim() } : cat))
        );
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    } finally {
      setEditingCategoryId(null);
      setEditedCategoryName("");
    }
  };

  const cancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditedCategoryName("");
  };

// Función para eliminar categoría
const deleteCategory = async (id: string) => {
  try {
    // Llamar a la API para eliminar la categoría
    await fetchDeleteCategory(id);

    // Actualizar el estado local con la categoría eliminada
    setCategories((prev) => prev.filter((cat) => cat.id !== id));

    // Si la categoría eliminada es la seleccionada, deseleccionar
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);
    }
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
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
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className={`cursor-pointer hover:bg-gray-100 ${
                    selectedCategoryId === category.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  <td className="py-2 px-4 text-[#424242]">
                    {editingCategoryId === category.id ? (
                      <input
                        type="text"
                        value={editedCategoryName}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditedCategoryName(e.target.value)}
                        className="border border-gray-300 p-1 rounded w-full"
                      />
                    ) : (
                      category.category
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingCategoryId === category.id ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCategory(category.id);
                          }}
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        >
                          <FiCheck size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEditCategory();
                          }}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          <FiX size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditCategory(category.id, category.category);
                          }}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        >
                          <FiEdit size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCategory(category.id);
                          }}
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

export default CategoryList;