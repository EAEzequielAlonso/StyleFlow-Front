import { Product, SearchQueryProduct, Sort } from "@/types";
import { create } from "zustand"

interface StateProduct {
    page: number;
    totalPages:number;
    data: Product[];
    selected: Product | null;
    searchQuery: SearchQueryProduct;
    sort: Sort;
    limit: number;
    update: boolean;
    // relations: RelationsProduct;

    setPage: (pag: number) => void;
    setTotalPages: (totPag: number) => void;
    setData: (data: Product[]) => void;
    setSelected: (product: Product | null) => void;
    setSearchQuery: (query: SearchQueryProduct) => void;
    setSort: (sort: Sort) => void;
    setLimit: (limit: number) => void;
    setUpdate: () => void;
    // setRelations: (relations: RelationsProduct) => void;
}

export const useCrudProduct = create<StateProduct>()((set) => ({
    page: 1,
    totalPages:0,
    limit: 10,
    data:[],
    selected:null,
    searchQuery: {
        name:"", 
        categoryId: "",
        subcategoryId:"",
        brandId:"",
        modelId:"",
        sizeTypeId:"",
      },
    sort: {field:"name", order:"asc"},
    update: false,
    // relations: {
    //     category: null,
    //     subcategory:null,
    //     brand: null,
    //     model:null,
    //     sizeType:null
    // },

    setPage: (pag) => set({ page: pag }),
    setTotalPages: (totPag) => set({ totalPages: totPag }),
    setData: (data) => set({ data: data }),
    setSelected: (product) => set({ selected: product }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSort: (sort) => set({ sort: sort }),
    setLimit: (limit) => set({ limit: limit }),
    setUpdate: () => set((state) => ({ update: !state.update })),
    // setRelations: (relations) => set({ relations: relations }),
}))