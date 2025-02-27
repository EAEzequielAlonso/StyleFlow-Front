
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
  selected: Category | null;
  setSelected: React.Dispatch<React.SetStateAction<Category | null>>, 
  searchQuery: string;
  page: number;
  actionUpdate: boolean;
}

export interface CategoryPaginationProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export interface CategorySelected {
  selected: Category | null;
  setSelected: React.Dispatch<React.SetStateAction<Category | null>>;
  actionUpdate: boolean;
  setActionUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}
