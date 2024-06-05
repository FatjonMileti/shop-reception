import { Grid } from '@mui/material'
import React, { useState } from 'react'

import Resizer from 'react-image-file-resizer'
import { useMutation } from 'react-query'
import { ProductDetails } from './ProductDetails'
import { Product, Supplier } from '../interfaces'
import { formatPayloadDate } from 'utils/helpers'
import { makeCorePostRequest } from 'utils/api'
import { AxiosError } from 'axios'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

const resizeFile = (file): Promise<File> => {
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      'JPEG',
      50,
      0,
      (uri: File) => {
        resolve(uri)
      },
      'file'
    )
  })
}

const TestProductDetailsForm: React.FC = () => {
  const [image, setImage] = React.useState<File | null>(null)

  const { showNotification } = useNotification()

  const productMutation = useMutation(
    async ({
      productDetails,
      selectedProduct,
      selectedSupplier
    }: {
      productDetails: ProductDetails
      selectedProduct: Product
      selectedSupplier: Supplier
    }) => {
      const formData = new FormData()

      const data = {
        productId: selectedProduct.id,
        supplierId: selectedSupplier.id,
        entryDate: formatPayloadDate(productDetails.entryDate),
        hasExpireDate: productDetails.hasExpirationDate,
        expireDate: formatPayloadDate(productDetails.expirationDate),
        hasSecondaryDlc: productDetails.hasSecondaryDLC,
        dlcDays: productDetails.secondaryDLC,
        batchQuantity: productDetails.amount,
        batchName: productDetails.lot
      }

      formData.append('dto', new Blob([JSON.stringify(data)], { type: 'application/json' }))
      formData.append('fileObject', productDetails.picture)

      await makeCorePostRequest('/bakery/batch', formData)
    },
    {
      onSuccess: () => {
        // detailsForm.resetForm()
        showNotification({
          message: `Product added successfully`,
          type: 'success'
        })
      },
      onError: (res: any) => {
        if (res?.code === AxiosError.ERR_NETWORK) {
          showNotification({
            message: 'Verificati conexiunea la internet',
            type: 'error'
          })
          return
        }

        showNotification({
          message: `Exceptie: va rugam incercati, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <Grid container rowSpacing={3.5}>
      <Grid item></Grid>
    </Grid>
  )
}

export default TestProductDetailsForm
