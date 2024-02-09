import { Grid } from '@mui/material'
import { Autocomplete, Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../utils/api'
import {Supplier, Product} from '../interfaces'

interface SelectSupplierProps {
  setSelectedSupplier: (supplier: Supplier) => void
  selectedSupplier?: Supplier
  onContinue: () => void
  onCancel: () => void
  selectedProduct: Product
}
export const SelectSupplier = ({
  setSelectedSupplier,
  selectedSupplier,
  selectedProduct,
  onCancel,
  onContinue
}: SelectSupplierProps) => {
  const supplierQuery = useQuery<Supplier[]>(
    ['supplier'],
    async () => {
      try {
        return await makeCoreGetRequest(`/bakery/supplier/byProduct/${selectedProduct.metiCode}`)
      } catch (err) {}
    },

    {
      initialData: [],
      enabled: !!selectedProduct,
      keepPreviousData: true
    }
  )

  return (
    <Grid container rowSpacing={3.5}>
      <Grid
        item
        xs={12}
        container
        columnSpacing={2}
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <Input
            variant="outlined"
            type="search"
            value={selectedProduct?.name}
            disabled={true}
            width={'100%'}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            variant="outlined"
            options={supplierQuery.data.map(({ id, supplierName }) => ({ value: id, label: supplierName }))}
            label="Cauta dupa Cod Furnizor / Furnizor"
            onChange={(event, value) => {
              setSelectedSupplier(
                value ? supplierQuery.data.find(({ id }) => id === value.value) : null
              )
            }}
            value={selectedSupplier && { label: selectedSupplier.supplierName, value: selectedSupplier.id }}
          />
        </Grid>
      </Grid>

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
            disabled={!selectedSupplier}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
