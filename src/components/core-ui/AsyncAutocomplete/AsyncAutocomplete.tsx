import * as React from 'react'
import { useSelector } from 'react-redux'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from './serializers'
import { useNotification } from 'hooks'
import { RootState } from 'configureStore'

interface AsyncAutocompleteOption {
  value: string | number
  label: string
}

const AsyncAutocomplete = props => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<readonly AsyncAutocompleteOption[]>([])
  const loading = open && options.length === 0

  const { action, width, hasDefaultFirstValue, setFilterValues, ...rest } = props

  const { showNotification } = useNotification()

  const filterState = useSelector((state: RootState) => state.table.filters)

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    getOptions()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (hasDefaultFirstValue) {
      getOptions(setFilterValues)
    }
  }, [])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const getOptions = async (cb?: (name: string, value: any) => {}) => {
    try {
      let url = action.url

      if (action.filterQueryKey && action.localQueryKey) {
        url = `${url}?page=-1&filterBy=${action.filterQueryKey}&filterValue=${
          filterState[action.localQueryKey]?.value
        }`
      }
      const result = await makeCoreGetRequest(url)
      const { valueKey, labelKey } = action

      const resultOptions = toAsyncSelectOptions(result.list || result, valueKey, labelKey) || []
      setOptions(resultOptions)
      cb && cb(rest.name, resultOptions[0])
    } catch (error) {
      showNotification({
        message: `Error while fetching dropdown data. ${error?.message}`,
        type: 'error'
      })
    }
  }

  return (
    <Autocomplete
      {...rest}
      disablePortal
      id="async-demo"
      options={options}
      //TO DO: fix styling for all autocomplete and filters
      style={{ maxWidth: width ?? 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      loading={loading}
      value={props.value}
      onChange={(_, value) => props.onChange(value)}
    />
  )
}

export default AsyncAutocomplete
