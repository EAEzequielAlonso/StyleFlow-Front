"use client"

import { useCrudProduct } from "@/store"
import { useEffect } from "react"

interface Props {
  initialPages: number
}

export default function ProductPagination ({initialPages}: Props) {
    
    const {page, totalPages, setPage, setTotalPages, limit, setUpdate} = useCrudProduct()
    
    useEffect (() => {
      setTotalPages(Math.ceil(initialPages/limit))
    }, [initialPages, limit, setTotalPages])

    return (
        <div className="container-pagination">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page-1) 
              setUpdate()
            }}
          >
            Anterior
          </button>
          <h2>{page} de {totalPages}</h2>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page+1)
              setUpdate()
            } }
          >
            Siguiente
          </button>
        </div>
    )
}