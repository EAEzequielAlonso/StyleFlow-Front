import { CategorySearchProp } from "../types";


const CategorySearch: React.FC<CategorySearchProp> = ({setPage, searchQuery, setSearchQuery}) => {
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

export default CategorySearch;