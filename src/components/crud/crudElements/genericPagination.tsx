import { PaginationProps } from "../../../types"   

  export const GenericPagination = ({ setDinamicCrud, dinamicCrud }: PaginationProps) => {
    return (
      <div className="container-pagination">
        <button
          disabled={dinamicCrud.page === 1}
          onClick={() => {
            setDinamicCrud((prev) => ({...prev, page: prev.page-1}))
          }}
        >
          Anterior
        </button>
        <h2>{dinamicCrud.page} de {dinamicCrud.totalPages}</h2>
        <button
          disabled={dinamicCrud.page === dinamicCrud.totalPages}
          onClick={() => {
            setDinamicCrud((prev) => ({...prev, page: prev.page+1}))
          }}
        >
          Siguiente
        </button>
      </div>
  )
  };