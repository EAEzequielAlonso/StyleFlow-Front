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
          <select
            value={searchQuery.optionId}
            onChange={(e) => {
              setSearchQuery((prev) => ({...prev, optionId: e.target.value}));
              setPage(1);
            }}
          >
            <option value="">Busca por Marcas</option>
            {options && options.map((dat) => (
              <option key={dat.id} value={dat.id}>
                {dat.name}
              </option>
            ))}
          </select>
        </div>
    )
}

export default Search;