import { PaginationProp } from "../types";

const Pagination: React.FC<PaginationProp> = ({totalCat, page, setPage}) => {
    
  const limit = 10
  const totalPage = Math.ceil(totalCat / limit)
  return (
        <div className="container-pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>
          <h2>{page} de {totalPage}</h2>
          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
    )
}

export default Pagination;