
import CRUDComponent from "@/components/crud/crudComponent";
import { CRUDProps, Product } from "@/types";
import { crudApiServer } from "@/utils/fetchApiServer";

const ProductAdmin = async () => {
   
  const {fetchRelatedData,
    fetchItems} = crudApiServer<Product>({endpoint:"product", relations: ["category", "subcategory", "brand", "model"]}) 
  const result = await fetchItems('page=1&limit=10&sortField=name&sortOrder=asc', {});
  const relatedData = await fetchRelatedData();

   const crudObject: CRUDProps<Product> = {
    items: result![0],
    totalReg: result![1],
    label: "Productos",
    route:"product",
   /* onCreate,
    onRead: async () => (() => Promise<void>),
    onUpdate,
    onDelete,*/
    columns: [
      { key: "name", label: "Nombre"},
      { key: "category", label: "Categoria"},
      { key: "subcategory", label: "Subcategoria"},
      { key: "brand", label: "Marca"},
      { key: "model", label: "Modelo"},
    ],
    search: {
        name: "",
        categoryId:"",
        subcategoryId:"",
        brandId:"",
        modelId:"",
        sizeTypeId:"",
    },
    /*dataForm: [
      { key: "name", label: "Nombre", elementType: <input /> },
      { key: "description", label: "Descripción", elementType: <input /> },
      { key: "cost", label: "Costo", elementType: <input /> },
      { key: "profit", label: "Utilidad", elementType: <input /> },
      { key: "price", label: "Precio", elementType: <input /> },
      { key: "category", label: "Category", elementType: <select /> },
      { key: "subcategory", label: "Subcategoria", elementType: <select /> },
      { key: "brand", label: "Marca", elementType: <select /> },
      { key: "model", label: "Modelo", elementType: <select /> },
      { key: "sizeType", label: "Grupo de Talles", elementType: <select /> },
    ],*/
    options: [
      { key: "name", type: "text", label: "Nombre", route: "", data: [] },
      { key: "category", type: "select", label: "Categoria", route: "/category/commerce", data: relatedData!.category[0] },
      { key: "subcategory", type: "select", label: "Subcategoria", route: "/subcategory/commerce", data: relatedData!.subcategory[0]},
      { key: "brand", type: "select", label: "Marca", route: "/brand/commerce", data: relatedData!.brand[0] },
      { key: "model", type: "select", label: "Modelo", route: "/model/commerce", data: relatedData!.model[0] },
      { key: "sizeType", type: "select", label: "Grupo de Talles", route: "/sizetype/commerce", data: [] },
    ],
  }

  return (
    <div>
      <CRUDComponent {...crudObject}/>
    </div>
  );
};

export default ProductAdmin;
