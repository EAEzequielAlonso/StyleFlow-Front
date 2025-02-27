import { CategoryPaginationProp } from "../types";

const CategoryPagination: React.FC<CategoryPaginationProp> = ({page, setPage}) => {
    return (
        <div className="mt-4 flex justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-[#0D47A1] text-white rounded font-montserrat disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-[#0D47A1] text-white rounded font-montserrat"
          >
            Siguiente
          </button>
        </div>
    )
}

export default CategoryPagination;