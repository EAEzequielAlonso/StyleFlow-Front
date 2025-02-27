"use client"

import { useState } from "react";
import { Category, CategoryFormProps } from "../../types";
import { fetchPostCategory } from "./categoryApi";
import SimpleFormPost from "../SimpleFormPost";

const CategoryForm: React.FC<CategoryFormProps> = ({ categories, setCategories }) => {
    
  const [newCategoryName, setNewCategoryName] = useState("");

  // Función para agregar nueva categoría

  const addCategory = async () => {
    if (newCategoryName.trim() === "") return;
    try {
      const newCat: Category = await fetchPostCategory(newCategoryName);
      setCategories([...categories, newCat]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    }
  };
    return (
        <SimpleFormPost name={newCategoryName} setName={setNewCategoryName} add={addCategory} />
    )
}

export default CategoryForm;