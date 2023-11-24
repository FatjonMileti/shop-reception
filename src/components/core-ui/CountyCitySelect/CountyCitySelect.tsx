import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { CountyCitySelectProps } from './CountyCitySelectDefinitons'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from '../AsyncAutocomplete/serializers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

const CountyCitySelect = (props: CountyCitySelectProps) => {
  const {
    county,
    city,
    value,
    onChange,
    hidden,
    disabled,
    error,
    helperText,
    required,
    variant = 'standard'
  } = props

  const [counties, setCounties] = useState([])
  const [cities, setCities] = useState([])
  const [countiesOpen, setCountiesOpen] = useState(false)
  const [citiesOpen, setCitiesOpen] = useState(false)

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      try {
        const { action } = county
        const { url, valueKey, labelKey } = action

        const result = await makeCoreGetRequest(`${url}?page=-1`)

        setCounties(toAsyncSelectOptions(result.list, valueKey, labelKey))
      } catch (error) {
        showNotification({
          message: `A aparut o eroarea la obtinerea listei de judete. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [])

  useEffect(() => {
    setCities([])
    if (value?.county?.value) {
      ;(async () => {
        try {
          const { action } = city
          const { url, valueKey, labelKey } = action

          const result = await makeCoreGetRequest(
            `${url}?page=-1&filterBy=county.id&filterValue=${value.county.value}`
          )

          setCities(toAsyncSelectOptions(result.list, valueKey, labelKey))
        } catch (error) {
          showNotification({
            message: `A aparut o eroarea la obtinerea listei de orase. ${formatErrorMessage(
              error
            )}`,
            type: 'error'
          })
        }
      })()
    }
  }, [value?.county?.value])

  return (
    <Grid container spacing={4} style={hidden ? { display: 'none' } : {}}>
      <Grid item xs={12} md={6}>
        <Autocomplete
          {...county}
          disablePortal
          id={county.id || 'county-async'}
          options={counties}
          open={countiesOpen}
          onOpen={() => {
            setCountiesOpen(true)
          }}
          onClose={() => {
            setCountiesOpen(false)
          }}
          loading={countiesOpen && counties.length === 0}
          value={value?.county?.value ? value?.county : null}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, newValue) => onChange(newValue, 'county')}
          disabled={disabled}
          error={error && !value?.county?.value}
          helperText={
            error && !value?.county?.value && helperText.includes('required')
              ? 'Judet is required'
              : ''
          }
          required={required}
          variant={variant}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          {...city}
          disablePortal
          id={city.id || 'city-async'}
          options={cities}
          open={citiesOpen}
          onOpen={() => {
            setCitiesOpen(true)
          }}
          onClose={() => {
            setCitiesOpen(false)
          }}
          loading={citiesOpen && cities.length === 0}
          value={value?.city?.value ? value?.city : null}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, newValue) => onChange(newValue, 'city')}
          disabled={disabled}
          error={error && !value?.city?.value}
          helperText={
            error && !value?.city?.value && helperText.includes('required')
              ? 'Oras is required'
              : ''
          }
          required={required}
          variant={variant}
        />
      </Grid>
    </Grid>
  )
}

export default CountyCitySelect
