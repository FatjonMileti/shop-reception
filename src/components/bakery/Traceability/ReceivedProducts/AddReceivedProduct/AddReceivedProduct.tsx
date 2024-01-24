import React from 'react'
import { Modal } from 'components/core-ui/Modal'
import { SelectOrScanProduct } from './SelectProduct'
import { SelectSupplier } from './SelectSupplier'
import { ProductDetails } from './ProductDetails'
import { useMutation } from 'react-query'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { makeCorePostRequest } from '../../../../../utils/api'
import { formatPayloadDate } from '../../../../../utils/helpers'
import { CircularProgress, Grid } from '@mui/material'
import { Supplier, Product } from '../interfaces'

interface ReceivedProductRequestData {
  productId: string
  supplierId: string
  entryDate: string
  batchName: string
  hasExpireDate: boolean
  expireDate: string
  hasSecondaryDlc: boolean
  dlcDays: number
  batchQuantity: number

  // imageUrl: 'string'

  // storeId: string

  // batchStatus: 'string'
  // closeReason: 'OUT_OF_STOCK'

  // verifiedBy: 'string'
  // verifiedDate: '2024-01-18T11:43:36.604Z'
  // verified: true
}

interface AddReceivedProductProps {
  isModalOpen: boolean
  closeModal: () => void
}
export const AddReceivedProduct = ({ isModalOpen, closeModal }: AddReceivedProductProps) => {
  const [step, setStep] = React.useState(0)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | undefined>(undefined)
  const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier | undefined>(undefined)
  const { showNotification } = useNotification()

  const cancel = () => {
    closeModal()
    setSelectedProduct(undefined)
    setSelectedSupplier(undefined)
    setStep(0)
  }

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

      const data: ReceivedProductRequestData = {
        productId: selectedProduct.id,
        supplierId: selectedSupplier.id,
        entryDate: formatPayloadDate(productDetails.entryDate),
        hasExpireDate: productDetails.hasExpirationDate,
        expireDate: formatPayloadDate(productDetails.expirationDate),
        hasSecondaryDlc: productDetails.hasSecondaryDLC,
        dlcDays: parseInt(productDetails.secondaryDLC),
        batchQuantity: parseInt(productDetails.amount),
        batchName: productDetails.lot
      }

      formData.append('dto', JSON.stringify(data))
      formData.append('fileObject', productDetails.picture)

      await makeCorePostRequest('/bakery/batch', formData)
    },
    {
      onSuccess: () => {
        closeModal()
        showNotification({
          message: `Product added successfully`,
          type: 'success'
        })
      },
      onError: res => {
        showNotification({
          message: `Error while trying add product, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle="Adauga lot nou receptionat"
      modalWidth="50%"
    >
      <Grid container>
        {productMutation.isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        {!productMutation.isLoading && (
          <>
            {
              [
                <SelectOrScanProduct
                  setSelectedProduct={setSelectedProduct}
                  onContinue={() => setStep(1)}
                  selectedProduct={selectedProduct}
                  onCancel={cancel}
                />,
                <SelectSupplier
                  selectedProduct={selectedProduct}
                  setSelectedSupplier={setSelectedSupplier}
                  selectedSupplier={selectedSupplier}
                  onContinue={() => setStep(2)}
                  onCancel={cancel}
                />,
                <ProductDetails
                  selectedProduct={selectedProduct}
                  selectedSupplier={selectedSupplier}
                  onContinue={(productDetails: ProductDetails) => {
                    productMutation.mutate({
                      productDetails,
                      selectedProduct,
                      selectedSupplier
                    })
                  }}
                  onCancel={cancel}
                />
              ][step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
