import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { Product } from './ReceivedProducts/interfaces'

interface UseSelectProductSearchProps {
  optionsMap: (product: Product) => any
}
export const useSelectProductSearch = ({ optionsMap }: UseSelectProductSearchProps) => {
  const [searchText, setSearchText] = React.useState(null)
  const [debouncedTerm, setDebouncedTerm] = React.useState('')
  const [timeOutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null)

  const productQuery = useQuery(
    ['search-product-traceability', debouncedTerm],
    async () => {
      return await makeCoreGetRequest(
        `/bakery/product/traceability/nameOrCodeOrEanWithRecipe/${debouncedTerm}`
      )
    },
    {
      initialData: [],
      enabled: debouncedTerm.length > 0,
      keepPreviousData: true
    }
  )


  const options = (optionsMap ? productQuery.data.map(optionsMap) : productQuery.data) || []

  const onInputChange = (e, value) => {
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
  }

  return {
    options,
    onInputChange,
    inputValue: searchText
  }
}
