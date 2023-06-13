import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { CountyCitySelectProps } from './CountyCitySelectDefinitons'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from '../AsyncAutocomplete/serializers'
import { useNotification } from 'hooks'

const CountyCitySelect = (props: CountyCitySelectProps) => {
  const { county, city, value, onChange, hidden } = props

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
          message: `A aparut o eroarea la obtinerea listei de judete. ${error?.message}`,
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
            `${url}?page=-1&filterBy=countyId&filterValue=${value.county.value}`
          )

          setCities(toAsyncSelectOptions(result.list, valueKey, labelKey))
        } catch (error) {
          showNotification({
            message: `A aparut o eroarea la obtinerea listei de orase. ${error?.message}`,
            type: 'error'
          })
        }
      })()
    }
  }, [value?.county?.value])

  return hidden ? null : (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Autocomplete
          {...county}
          disablePortal
          id="county-async"
          options={counties}
          // style={{ width: width ?? 300 }}
          open={countiesOpen}
          onOpen={() => {
            setCountiesOpen(true)
          }}
          onClose={() => {
            setCountiesOpen(false)
          }}
          loading={countiesOpen && counties.length === 0}
          value={value?.county?.value ? value?.county : { label: '', value: '' }}
          onChange={(_, newValue) => onChange(newValue, 'county')}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          {...city}
          disablePortal
          id="city-async"
          options={cities}
          // style={{ width: width ?? 300 }}
          open={citiesOpen}
          onOpen={() => {
            setCitiesOpen(true)
          }}
          onClose={() => {
            setCitiesOpen(false)
          }}
          loading={citiesOpen && cities.length === 0}
          value={value?.city?.value ? value?.city : { label: '', value: '' }}
          onChange={(_, newValue) => onChange(newValue, 'city')}
        />
      </Grid>
    </Grid>
  )
}

export default CountyCitySelect
