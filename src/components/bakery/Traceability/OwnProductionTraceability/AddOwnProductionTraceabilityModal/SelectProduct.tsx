import { Grid } from '@mui/material'
import { Autocomplete, Button } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../utils/api'

import { Product } from '../../ReceivedProducts/interfaces'

interface SelectProductProps {
  setSelectedProduct: (product: Product) => void
  selectedProduct: Product
  onContinue: () => void
  onCancel: () => void
  hideActions?: boolean
  customLabel?: string
}
export const SelectProduct = ({
  setSelectedProduct,
  selectedProduct,
  onContinue,
  onCancel,
  hideActions = false,
  customLabel
}: SelectProductProps) => {
  const [searchText, setSearchText] = React.useState(selectedProduct?.name || null)
  const [debouncedTerm, setDebouncedTerm] = React.useState('')
  const [timeOutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null)

  const productQuery = useQuery(
    ['search', debouncedTerm],
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
  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={hideActions ? 8 : 12}>
        <Autocomplete
          variant="outlined"
          options={productQuery.data.map(({ id, name }) => ({ value: id, label: name }))}
          label={customLabel || 'Cauta dupa Cod METI / Cod EAN / Nume produs'}
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
            setSelectedProduct(
              value ? productQuery.data.find(({ id }) => id === value.value) : null
            )
          }}
          value={
            selectedProduct && {
              label: searchText || selectedProduct.name,
              value: selectedProduct.id
            }
          }
          autoComplete={false}
          filterOptions={x => x}
        />
      </Grid>
      {!hideActions && (
        <Grid item xs={12} container justifyContent="space-between">
          <Grid>
            <Button size="large" variant="outlined" label="Anuleaza" onClick={onCancel} />
          </Grid>
          <Grid>
            <Button
              size="large"
              variant="contained"
              label="Continua"
              onClick={onContinue}
              disabled={!selectedProduct}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
