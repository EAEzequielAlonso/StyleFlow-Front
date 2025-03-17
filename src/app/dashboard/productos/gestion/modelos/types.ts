
export interface Modelo {
  id: string;
  name: string;
  brand: Marca;
}

export interface Marca {
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
  options: Marca[] | null;
}

export interface TableProp {
  setTotalCat: React.Dispatch<React.SetStateAction<number>>;
  selected: Modelo | null;
  setSelected: React.Dispatch<React.SetStateAction<Modelo | null>>, 
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
  selected: Modelo | null;
  setSelected: React.Dispatch<React.SetStateAction<Modelo | null>>;
  actionUpdate: boolean;
  setActionUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  options: Marca[] | null;
  setOptions?: React.Dispatch<React.SetStateAction<Marca[] | null>>;
}
