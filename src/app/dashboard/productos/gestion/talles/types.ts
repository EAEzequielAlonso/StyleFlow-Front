
export interface Talle {
  id: string;
  name: string;
  sizeType: GrupoTalle;
}

export interface GrupoTalle {
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
  options: GrupoTalle[] | null;
}

export interface TableProp {
  setTotalCat: React.Dispatch<React.SetStateAction<number>>;
  selected: Talle | null;
  setSelected: React.Dispatch<React.SetStateAction<Talle | null>>, 
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
  selected: Talle | null;
  setSelected: React.Dispatch<React.SetStateAction<Talle | null>>;
  actionUpdate: boolean;
  setActionUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  options: GrupoTalle[] | null;
  setOptions?: React.Dispatch<React.SetStateAction<GrupoTalle[] | null>>;
}
