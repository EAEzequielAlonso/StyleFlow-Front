export interface Subcategory {
  id: string;
  subcategory: string;
  categoryId: string | null;
}

export interface Category {
  id: string;
  category: string;
}

export interface CategorySearchProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string, 
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export interface CategoryTableProp {
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>, 
  searchQuery: string;
  page: number;
  actionUpdate: boolean;
}

export interface CategoryPaginationProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export interface CategorySelected {
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  actionUpdate: boolean;
  setActionUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
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