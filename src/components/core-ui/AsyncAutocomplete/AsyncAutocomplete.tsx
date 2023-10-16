import * as React from 'react'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from './serializers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useMediaQuery } from '@mui/material'

interface AsyncAutocompleteOption {
  value: string | number
  label: string
}

const AsyncAutocomplete = props => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<readonly AsyncAutocompleteOption[]>([])
  const loading = open && options.length === 0

  const {
    action,
    width,
    hasDefaultFirstValue,
    setValueForFilter,
    setFilterValues,
    extraUrlParams,
    ...rest
  } = props

  const { showNotification } = useNotification()

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
      getOptions(setValueForFilter, setFilterValues)
    }
  }, [])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const isXs = useMediaQuery('(max-width:624px)')

  const getOptions = async (
    cb1?: (name: string, value: any) => {},
    cb2?: (name: string, value: any) => {}
  ) => {
    try {
      let url = action.url

      if (action.filterQueryKey && action.localQueryKey) {
        url = `${url}?page=-1&filterBy=${action.filterQueryKey}&filterValue=${encodeURIComponent(
          extraUrlParams.find(param => param.name === action.localQueryKey)?.value
        )}`
      }
      const result = await makeCoreGetRequest(url)
      const { valueKey, labelKey } = action

      const resultOptions = toAsyncSelectOptions(result.list || result, valueKey, labelKey) || []
      setOptions(resultOptions)
      cb1 && cb1(rest.name, props.value || resultOptions[0])
      cb2 && cb2(rest.name, props.value || resultOptions[0])
    } catch (error) {
      showNotification({
        message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
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
      style={{ maxWidth: isXs ? '100%' : width ?? 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      loading={loading}
      value={props.value || (props.multiple ? [] : '')}
      onChange={(_, value) => props.onChange(value)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
    />
  )
}

export default AsyncAutocomplete
