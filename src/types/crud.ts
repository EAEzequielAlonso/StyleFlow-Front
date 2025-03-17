import { Brand, Category, Model, SizeType, Subcategory } from "./entities";

export interface Sort {
    field: string,
    order: "asc" | "desc"
}

export interface SearchQueryProduct {
    name: string, 
    categoryId: string,
    subcategoryId: string,
    brandId: string,
    modelId: string,
    sizeTypeId: string,
}

export interface RelationsProduct {
  category: Category[] | null;
  subcategory: Subcategory[] | null;
  brand: Brand[] | null;
  model: Model[] | null;
  sizeType: SizeType[] | null;
}

