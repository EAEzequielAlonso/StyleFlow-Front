"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Category, Subcategory } from "./types";
import CategoryForm from "./components/category/categoryForm";
import CategoryList from "./components/category/categoryList";
import SubcategoryForm from "./components/subcategory/SubcategoryForm";
import SubcategoryList from "./components/subcategory/SubcategoryList";
import { fetchGetCategories } from "./components/category/categoryApi";
import { fetchGetSubcategories } from "./components/subcategory/subcategoryApi";


export default function CategoriesPage() {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

 // Obtener categorías al cargar la página
 useEffect(() => {
  const loadCategories = async () => {
    try {
      const data = await fetchGetCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  loadCategories();
}, []);

// Obtener subcategorías cuando cambia la categoría seleccionada
useEffect(() => {
  if (!selectedCategoryId) return;

  const loadSubcategories = async () => {
    try {
      const data = await fetchGetSubcategories(selectedCategoryId);
      setSubcategories(data);
    } catch (error) {
      console.error("Error loading subcategories:", error);
    }
  };

  loadSubcategories();
}, [selectedCategoryId]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-2 font-roboto">
      <motion.h1
        className="text-3xl font-bold text-[#0D47A1] mb-6 font-montserrat"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Administración de <a>Categorías</a> y <a>Subcategorias</a>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#1976D2] mb-4 font-montserrat">
            Categorías 
          </h2>

          {/* Formulario para agregar categorias */}
          <CategoryForm categories={categories} setCategories={setCategories} />
           
          {/* Tabla de Categorías */}
          <CategoryList categories={categories} setCategories={setCategories}
           selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />

        </div>

        {/* Detalle de Subcategorías de la Categoría Seleccionada */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#1976D2] mb-4 font-montserrat">
            Subcategorías 
          </h2>

          {selectedCategoryId ? (
            <>
              {/*Formulario agregar subcategorias*/}
              <SubcategoryForm subcategories={subcategories} setSubcategories={setSubcategories} selectedCategoryId={selectedCategoryId} />

              {/*Formulario agregar subcategorias*/}
              <SubcategoryList subcategories={subcategories} setSubcategories={setSubcategories} selectedCategoryId={selectedCategoryId} />
            </>
          ) : (
            <p className="text-gray-600">
              Selecciona una categoría para ver sus subcategorías.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
