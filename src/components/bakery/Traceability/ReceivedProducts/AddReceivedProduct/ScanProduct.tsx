import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { Product } from '../interfaces'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { Grid } from '@mui/material'

interface ScanProductProps {
  setSelectedProduct: (product: Product) => void
  onContinue: () => void
  onCancel: () => void
}

export const ScanProduct = ({
  setSelectedProduct,
  onContinue,
  onCancel
}: ScanProductProps) => {
  const [productCode, setProductCode] = React.useState('')
  const { showNotification } = useNotification()

  const productQuery = useQuery<Product>(
    ['product-scan', productCode],
    async () => {
        return await makeCoreGetRequest(`/bakery/product/traceability/Ean/${productCode}`)
    },

    {
      initialData: undefined,
      enabled: false,
      keepPreviousData: true,

      onSuccess: data => {
        setSelectedProduct(data)
        onContinue()
        showNotification({
          message: `Product scaned successfully`,
          type: 'success'
        })
      },
      onError: res => {
        showNotification({
          message: `Error while trying scan product, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={12}>
        <Input
          type="text"
          variant="outlined"
          label="Scaneaza codul"
          autoFocus
          value={productCode}
          onChange={e => {
            const target = e.target as HTMLInputElement
            setProductCode(target.value)
          }}
          inputProps={{
            onPaste: e => {
              setTimeout(() => {
                productQuery.refetch() // Refetch after state update
              }, 0)
            }
          }}
          fullWidth
        />
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
            onClick={() => {
              productQuery.refetch()
            }}
            disabled={!productCode}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
