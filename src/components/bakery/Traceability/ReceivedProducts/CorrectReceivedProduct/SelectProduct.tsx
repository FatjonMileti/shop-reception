import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Product } from '../interfaces'

interface SelectProductProps {
  setSelectedProduct: (product: Product) => void
  selectedProduct: Product
  error?: boolean;
  helperText?: string;
}
export const SelectProduct = ({ setSelectedProduct, selectedProduct, error, helperText }: SelectProductProps) => {
  const [searchText, setSearchText] = React.useState('')
  const [debouncedTerm, setDebouncedTerm] = React.useState('')

  const [timeOutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null)

  const productQuery = useQuery(
    ['search', debouncedTerm],

    async () => {
      try {
        return await makeCoreGetRequest(
          `/bakery/product/traceability/nameOrCodeOrEan/${debouncedTerm}`
        )
      } catch (err) {}
    },

    {
      initialData: [],
      enabled: debouncedTerm.length > 3,
      keepPreviousData: true
    }
  )

  return (
    <Autocomplete
      variant="outlined"
      options={productQuery.data.map(({ id, name }) => ({ value: id, label: name }))}
      label="Produs"
      onInputChange={(e, value) => {
        setSearchText(value)
        if (e?.type === 'change') {
          if (timeOutId) {
            setTimeoutId(null)
            clearTimeout(timeOutId)
          }

          const id = setTimeout(() => {
            setDebouncedTerm(value)
            setTimeoutId(null)
          }, 300)

          setTimeoutId(id)
        }
      }}
      inputValue={searchText}
      onChange={(event, value) => {
        setSelectedProduct(value ? productQuery.data.find(({ id }) => id === value.value) : null)
      }}
      value={selectedProduct ? { label: selectedProduct.name, value: selectedProduct.id }: undefined}
      autoComplete={false}
      filterOptions={x => x}
      error={error}
      helperText={helperText}
    />
  )
}
