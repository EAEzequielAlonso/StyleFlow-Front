
export interface GrupoTalle {
  id: string;
  name: string;
}

export interface SearchProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string, 
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export interface TableProp {
  setTotalCat: React.Dispatch<React.SetStateAction<number>>;
  selected: GrupoTalle | null;
  setSelected: React.Dispatch<React.SetStateAction<GrupoTalle | null>>, 
  searchQuery: string;
  page: number;
  actionUpdate: boolean;
}

export interface PaginationProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalCat: number;
}

export interface Selected {
  selected: GrupoTalle | null;
  setSelected: React.Dispatch<React.SetStateAction<GrupoTalle | null>>;
  actionUpdate: boolean;
  setActionUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}
