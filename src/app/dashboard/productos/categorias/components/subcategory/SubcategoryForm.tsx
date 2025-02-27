"use client"

import { useState } from "react";
import { Subcategory, SubcategoryProps } from "../../types";
import { fetchPostSubcategory } from "./subcategoryApi";
import SimpleFormPost from "../SimpleFormPost";

const SubcategoryForm: React.FC<SubcategoryProps> = ({ subcategories, setSubcategories, selectedCategoryId }) => {
    
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
   // Función para agregar subcategoría a la categoría seleccionada
   const addSubcategory = async () => {
    if (newSubcategoryName.trim() === "") return;
    try {
        const newSubcat: Subcategory = await fetchPostSubcategory(newSubcategoryName, selectedCategoryId)
        setSubcategories([...subcategories, newSubcat]);
        setNewSubcategoryName("");
    } catch (error) {
        console.error("Error al agregar la categoría:", error);
      }
  };
    
    return (
        <SimpleFormPost name={newSubcategoryName} setName={setNewSubcategoryName} add={addSubcategory} />
    )
}

export default SubcategoryForm