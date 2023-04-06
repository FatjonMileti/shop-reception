import * as React from 'react'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from './serializers'

interface AsyncAutocompleteOption {
  value: string | number
  label: string
}

const AsyncAutocomplete = props => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<readonly AsyncAutocompleteOption[]>([])
  const loading = open && options.length === 0

  const { action, comboValue, width, ...rest } = props

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      try {
        let url = action.url

        if (comboValue) {
          url = `${url}?size=-1&filterBy=${action.comboQueryKey}&filterValue=${comboValue.value}`
        }
        const result = await makeCoreGetRequest(url)
        const { valueKey, labelKey } = action
        setOptions(toAsyncSelectOptions(result.list, valueKey, labelKey))
      } catch (error) {
        console.log(error) // should still show the unfiltered data ?
      }
    })()
    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      {...rest}
      disablePortal
      id="async-demo"
      options={options}
      style={{ width: width ?? 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      loading={loading}
      value={props.value ?? ''}
      onChange={(_, value) => props.onChange(value)}
    />
  )
}

export default AsyncAutocomplete
