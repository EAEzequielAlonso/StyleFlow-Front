import { SearchProp } from "../types";


const Search: React.FC<SearchProp> = ({setPage, searchQuery, setSearchQuery}) => {
    return (
        <div className="container-search">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por nombre..."
          />
        </div>
    )
}

export default Search;