import * as React from 'react'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { useSearchParams } from 'react-router-dom'
import {makeCoreGetRequest, makeCorePostRequest} from 'utils/api'
import { toAsyncSelectOptions } from './serializers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useMediaQuery } from '@mui/material'
import s from './AsyncAutocomplete.modules.scss'

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
    isPost,
    loadInfoMessage,
    ...rest
  } = props

  const { showNotification } = useNotification()
  let [searchParams] = useSearchParams()

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

  const queryParams = React.useMemo(() => {
      let qp = {}

      if (searchParams.size > 0) {
        for (let entry of searchParams.entries()) {
          const [name, value] = entry
          qp["store"] = value
        }
      } else if (Array.isArray(props?.siblingValuesAsQueryParams) && props.siblingValues) {
        props.siblingValuesAsQueryParams.forEach(siblingName => {

          let  siblingValue

          if (Array.isArray(props.siblingValues[siblingName])) {
            siblingValue = props.siblingValues[siblingName].map(selectedOption => {
              return selectedOption.value
            }).join(',')
          } else {
              siblingValue = props.siblingValues[siblingName]?.value
          }
          if (siblingValue) {
              qp[siblingName] = siblingValue
          }
        })
      }

      return qp
  }, [props.siblingValues])

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

      const result = await makeCoreGetRequest(url, {
        params: queryParams,
        paramsSerializer: {
          indexes: null
        }
      })

      // let result
      //
      // if (isPost) {
      //   result = await makeCorePostRequest(url, queryParams)
      // } else {
      //   result = await makeCoreGetRequest(url, {
      //     params: queryParams,
      //     paramsSerializer: {
      //       indexes: null
      //     }
      //   })
      // }

      // /families
      // /cadentier/families

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
<>
  {loading && loadInfoMessage && <span className={s.infoMessage}>{loadInfoMessage}</span>}
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
</>
  )
}

export default AsyncAutocomplete
