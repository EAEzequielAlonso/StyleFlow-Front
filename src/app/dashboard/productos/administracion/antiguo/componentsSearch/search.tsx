import { SearchProp } from "../types";


const Search: React.FC<SearchProp> = ({setPage, searchQuery, setSearchQuery, options}) => {
    
  return (
        <div className="container-search">
          <input type="text"
            value={searchQuery.name}
            onChange={(e) => {
              setSearchQuery((prev) => ({...prev, name: e.target.value}));
              setPage(1);
            }}
            placeholder="Buscar por nombre..."
          />
          {/* Esta es Categoria */}
          <select
            value={searchQuery.categoryId}
            onChange={(e) => {
              setSearchQuery((prev) => ({...prev, categoryId: e.target.value}));

              setPage(1);
            }}
          >
            <option value="">Busca por Categoria</option>
            {options?.category && options.category.map((dat) => (
              <option key={dat.id} value={dat.id}>
                {dat.name}
              </option>
            ))}
          </select>
          {/* Aca falta la subcategoria */}

          {/* Esta es Marca */}
          <select
            value={searchQuery.brandId}
            onChange={(e) => {
              setSearchQuery((prev) => ({...prev, brandId: e.target.value}));
              setPage(1);
            }}
          >
            <option value="">Busca por Marca</option>
            {options?.brand && options.brand.map((dat) => (
              <option key={dat.id} value={dat.id}>
                {dat.name}
              </option>
            ))}
          </select>
          {/* Aca falta la modelos */}

          {/* Esta es grupo de talles */}
          <select
            value={searchQuery.sizeTypeId}
            onChange={(e) => {
              setSearchQuery((prev) => ({...prev, sizeTypeId: e.target.value}));

              setPage(1);
            }}
          >
            <option value="">Busca por Grupos de talles</option>
            {options?.sizeType && options.sizeType.map((dat) => (
              <option key={dat.id} value={dat.id}>
                {dat.name}
              </option>
            ))}
          </select>
        </div>
    )
}

export default Search;