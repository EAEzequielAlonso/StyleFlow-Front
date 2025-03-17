
export interface Subcategory {
  id: string;
  name: string;
  category: CatMarGroup;
}

export interface Modelo {
  id: string;
  name: string;
  brand: CatMarGroup;
}

export interface CatMarGroup {
  id: string;
  name: string;  
}

export interface SearchData {
  name: string;
  categoryId: string;
  subcategoryId: string;
  brandId: string;
  modelId: string;
  sizeTypeId: string;
}

export interface OptionsData {
  category: CatMarGroup[] | null;
  subcategory: Subcategory[] | null;
  brand: CatMarGroup[] | null;
  model: Modelo[] | null;
  sizeType: CatMarGroup[] | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  cost: number;
  profit: number;
  price: number;
  startDate: Date | null;
  endDate?: Date | null;
  category: CatMarGroup,
  categoryId: string,
  subcategory: Subcategory,
  subcategoryId?: string,
  model: Modelo,
  modelId?: string,
  brand: CatMarGroup,
  brandId: string,
  sizeType: CatMarGroup,
  sizeTypeId: string,
}

export interface SearchProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: SearchData, 
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchData>>;
  options: OptionsData | null;
}

export interface TableProp {
  setTotalReg: React.Dispatch<React.SetStateAction<number>>;
  selected: Product | null;
  setSelected: React.Dispatch<React.SetStateAction<Product | null>>, 
  searchQuery: SearchData;
  page: number;
  actionUpdate: boolean;
}

export interface PaginationProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalReg: number;
}

export interface Selected {
  selected: Product | null;
  setSelected: React.Dispatch<React.SetStateAction<Product | null>>;
  actionUpdate: boolean;
  setActionUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  options: OptionsData | null;
  setOptions?: React.Dispatch<React.SetStateAction<OptionsData | null>>;
}
