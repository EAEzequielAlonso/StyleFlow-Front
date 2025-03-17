
export interface Color {
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
  selected: Color | null;
  setSelected: React.Dispatch<React.SetStateAction<Color | null>>, 
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
  selected: Color | null;
  setSelected: React.Dispatch<React.SetStateAction<Color | null>>;
  actionUpdate: boolean;
  setActionUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}
