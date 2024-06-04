import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'

const useSearchInput = (searchParam, queryKey, url) => {
  const [searchText, setSearchText] = useState(null)
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [timeOutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const query = useQuery(
    [queryKey, debouncedTerm],
    async () => {
      return await makeCoreGetRequest(`${url}?${searchParam}=${debouncedTerm}`)
    },
    {
      initialData: [],
      enabled: debouncedTerm.length > 0,
      keepPreviousData: true
    }
  )

  const options = query.data || []

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

export default useSearchInput
