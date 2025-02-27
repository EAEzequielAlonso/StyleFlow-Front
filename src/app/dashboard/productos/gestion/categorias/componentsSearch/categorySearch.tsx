import { CategorySearchProp } from "../types";


const CategorySearch: React.FC<CategorySearchProp> = ({setPage, searchQuery, setSearchQuery}) => {
    return (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por nombre..."
            className="border border-gray-300 rounded p-2 flex-1"
          />
        </div>
    )
}

export default CategorySearch;