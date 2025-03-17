
export interface Subcategory {
  id: string;
  name: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;  
}

interface searchData {
  name: string;
  optionId: string;
}

export interface SearchProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: searchData, 
  setSearchQuery: React.Dispatch<React.SetStateAction<searchData>>;
  options: Category[] | null;
}

export interface TableProp {
  setTotalCat: React.Dispatch<React.SetStateAction<number>>;
  selected: Subcategory | null;
  setSelected: React.Dispatch<React.SetStateAction<Subcategory | null>>, 
  searchQuery: searchData;
  page: number;
  actionUpdate: boolean;
}

export interface PaginationProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalCat: number;
}

export interface Selected {
  selected: Subcategory | null;
  setSelected: React.Dispatch<React.SetStateAction<Subcategory | null>>;
  actionUpdate: boolean;
  setActionUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  options: Category[] | null;
  setOptions?: React.Dispatch<React.SetStateAction<Category[] | null>>;
}
