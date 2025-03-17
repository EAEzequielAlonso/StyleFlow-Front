import ProductTable from "@/components/crud/product/productTable";
import ProductPagination from "@/components/crud/product/productPagination";
import { fetchGetServer, fetchGetRelationServer } from "@/utils/fetchApiServer";
import ProductFilter, { filterProps } from "@/components/crud/product/productFilter";

export default async function ProductAdmin () {

  const InitialLoad = async () => {
    
    const relations = {
      category:[],
      subcategory:null,
      brand:[],
      model:null,
      sizeType:[]
    };
    const result = await Promise.all([
      fetchGetServer("product/getproducts", "page=1&limit=10&sortField=name&sortOrder=asc","Productos" , {}),
      fetchGetRelationServer("category/commerce", "Categoria"),
      fetchGetRelationServer("subcategory/commerce", "Subcategoria"),
      fetchGetRelationServer("brand/commerce", "Marca"),
      fetchGetRelationServer("model/commerce", "Modelo"),
      fetchGetRelationServer("size-type/commerce", "Grupo de Talles")
    ])
    const data = result[0];
    relations.category = result[1];
    relations.subcategory = result[2];
    relations.brand = result[3];
    relations.model = result[4];
    relations.sizeType = result[5];

    return {data, relations}
  }

  const preload = await InitialLoad();

  const filterFormProduct: filterProps[] = [
    {type: "input", label: "Nombre", searchKey: "name"},
    {type: "select", label: "Categoria", searchKey: "categoryId", data:preload.relations.category},
    {type: "select", label: "Marca", searchKey: "brandId", data:preload.relations.brand},
    {type: "select", label: "Grupo de Talles", searchKey: "sizeTypeId", data:preload.relations.sizeType}
  ]

  return (

    <div className="flex gap-4">
  
      {/* Panel Izquierdo: Tabla de Categorías */}
      <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300">
          {/* Formulario de búsqueda */}
          <ProductFilter filterForm={filterFormProduct}/>

          {/* Tabla de categorías */}
          <ProductTable initialData={preload.data[0]}/>

          {/* Paginación */}
          <ProductPagination initialPages = {preload.data[1]}/>

      </div>

      {/* Panel Derecho: Formulario de Creación / Edición 
      <PanelAcciones/>*/}

    </div>
  );
};
