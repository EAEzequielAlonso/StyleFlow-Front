export interface Subcategory {
  id: string;
  subcategory: string;
  categoryId: string | null;
}

export interface Category {
  id: string;
  category: string;
}

export interface CategoryFormProps {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  }

export interface CategoryListProps {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    selectedCategoryId: string | null;
    setSelectedCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
  }

  export interface SubcategoryProps {
    subcategories: Subcategory[];
    setSubcategories: React.Dispatch<React.SetStateAction<Subcategory[]>>;
    selectedCategoryId: string | null;
  }

  export interface SimpleFormProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    add: () => void;
  }