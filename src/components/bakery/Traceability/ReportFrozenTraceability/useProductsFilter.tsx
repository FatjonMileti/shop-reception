import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../utils/api'

export const useProductsFilter = () => {
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

  const options = productQuery.data.map(({ id, name }) => ({ value: id, label: name })) || []

  const onInputChange = (e, value) => {

    setSearchText(value)
    if (e?.type === 'change') {
      console.log('e:', e.target.value)
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
