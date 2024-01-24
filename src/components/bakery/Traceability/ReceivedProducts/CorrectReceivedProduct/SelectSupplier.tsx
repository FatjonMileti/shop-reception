import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { Product, Supplier } from '../interfaces'

interface SelectSupplierProps {
  setSelectedSupplier: (supplier: Supplier) => void
  selectedSupplier?: Supplier
  selectedProduct: Product
  error?: boolean
  helperText?: string
}
export const SelectSupplier = ({
  setSelectedSupplier,
  selectedSupplier,
  selectedProduct,
  error,
  helperText
}: SelectSupplierProps) => {
  const supplierQuery = useQuery(
    ['supplier'],
    async () => {
      try {
        return await makeCoreGetRequest(`/bakery/supplier/byProduct/${selectedProduct.metiCode}`)
      } catch (err) {}
    },

    {
      initialData: [],
      enabled: !!selectedProduct,
      keepPreviousData: true
    }
  )

  return (
    <Autocomplete
      variant="outlined"
      options={supplierQuery.data.map(({ id, supplierName }) => ({
        value: id,
        label: supplierName
      }))}
      label="Furnizor - Denumire"
      onChange={(event, value) => {
        setSelectedSupplier(value ? supplierQuery.data.find(({ id }) => id === value.value) : null)
      }}
      value={
        selectedSupplier ? { label: selectedSupplier.supplierName, value: selectedSupplier.id } : undefined
      }
      error={error}
      helperText={helperText}
    />
  )
}
