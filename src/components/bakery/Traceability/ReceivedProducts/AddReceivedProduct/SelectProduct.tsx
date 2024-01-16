import { Grid } from '@mui/material'
import { Autocomplete, Button } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../../core-ui/Modal/Modal.modules.scss'
import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { debounce } from 'lodash'

export const SelectProduct = () => {
  const [searchText, setSearchText] = React.useState('')
  const [debouncedTerm, setDebouncedTerm] = React.useState('')

  const [timeOutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null)

  console.log('debouncedTerm: ', debouncedTerm)

  // React.useEffect(() => {
  //   const debouncedSearch = debounce(term => {
  //     setDebouncedTerm(term)
  //   }, 300)
  //   debouncedSearch(searchText)
  //   return () => {
  //     debouncedSearch.cancel()
  //   }
  // }, [searchText])

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
      enabled: debouncedTerm.length > 0, // Only run query if searchTerm is not empty
      keepPreviousData: true // Optional: Keep previous data while fetching,
    }
  )

  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={12}>
        <Autocomplete
          variant="outlined"
          options={productQuery.data.map(({ id, name }) => ({ value: id, label: name }))}
          label="Cauta dupa Cod METI / Cod EAN / Nume produs "
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

            // setSearchText('')
          }}
          autoComplete={false}
        />
      </Grid>

      <Grid item xs={12} className={s.modalButtons}>
        <Button variant="outlined" label="Anuleaza" onClick={() => {}} />
        <Button variant="contained" label="Continua" onClick={() => {}} />
      </Grid>
    </Grid>
  )
}
