import React from 'react'
import { Modal } from 'components/core-ui/Modal'
import { SelectOrScanProduct } from './SelectOrScanProduct'
import { SelectSupplier } from './SelectSupplier'
import { ProductDetails } from './ProductDetails'
import { useMutation } from 'react-query'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { makeCorePostRequest } from '../../../../../utils/api'
import { formatPayloadDate } from '../../../../../utils/helpers'
import { CircularProgress, Grid } from '@mui/material'
import { Supplier, Product } from '../interfaces'
import { useFormik } from 'formik'
import { productDetailsSchema } from '../helper'
import dayjs from 'dayjs'

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

const initialValues: ProductDetails = {
  entryDate: dayjs(),
  hasExpirationDate: true,
  expirationDate: null,
  hasSecondaryDLC: true,
  secondaryDLC: null,
  amount: undefined,
  lot: '',
  picture: undefined
}

interface AddReceivedProductProps {
  isModalOpen: boolean
  closeModal: () => void
  onSuccess?: () => void
}
export const AddReceivedProduct = ({ isModalOpen, closeModal, onSuccess }: AddReceivedProductProps) => {
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
        dlcDays: productDetails.secondaryDLC,
        batchQuantity: productDetails.amount,
        batchName: productDetails.lot
      }

      formData.append('dto',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      )
      formData.append('fileObject', productDetails.picture)

      await makeCorePostRequest('/bakery/batch', formData)
    },
    {
      onSuccess: () => {
        closeModal()
        setSelectedProduct(undefined)
        setSelectedSupplier(undefined)
        setStep(0)
        detailsForm.resetForm()
        if(onSuccess) {
          onSuccess()
        }
        showNotification({
          message: `Product added successfully`,
          type: 'success'
        })
      },
      onError: res => {
        showNotification({
          message: `Exceptie: va rugam incercati, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  const detailsForm = useFormik<ProductDetails>({
    enableReinitialize: false,
    validationSchema: productDetailsSchema,
    validateOnChange: false,
    initialValues,
    onSubmit: productDetails => {
      productMutation.mutate({
        productDetails,
        selectedProduct,
        selectedSupplier
      })
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
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
                  onCancel={cancel}
                  form={detailsForm}
                />
              ][step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
