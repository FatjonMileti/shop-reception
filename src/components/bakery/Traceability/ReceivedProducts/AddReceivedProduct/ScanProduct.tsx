import { Input } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { Product } from '../interfaces'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'

interface ScanProductProps {
  setSelectedProduct: (product: Product) => void
  selectedProduct: Product
}

export const ScanProduct = ({ setSelectedProduct, selectedProduct }: ScanProductProps) => {
  const [productCode, setProductCode] = React.useState('')
  const { showNotification } = useNotification()

  const productQuery = useQuery<Product>(
    ['product-scan', productCode],

    async () => {
      try {
        return await makeCoreGetRequest(`/bakery/product/traceability/Ean/${productCode}`)
      } catch (err) {}
    },

    {
      initialData: undefined,
      enabled: productCode.length > 0,
      keepPreviousData: true,

      onSuccess: (data) => {
        setSelectedProduct(data)
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
    <Input
      type="text"
      variant="outlined"
      autoFocus
      value={productCode}
      onChange={e => {
        const target = e.target as HTMLInputElement
        setProductCode(target.value)
      }}
    />
  )
}
