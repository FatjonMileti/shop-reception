import React from 'react'
import { Modal } from 'components/core-ui/Modal'
import { SelectOrScanProduct } from './SelectOrScanProduct'
import { SelectSupplier } from './SelectSupplier'
import { ProductDetails } from './ProductDetails'
import { useMutation } from 'react-query'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { makeCorePostRequest } from '../../../../../utils/api'
import { formatPayloadDate, resizeFile } from '../../../../../utils/helpers'
import { CircularProgress, Grid } from '@mui/material'
import { Supplier, Product } from '../interfaces'
import { useFormik } from 'formik'
import { productDetailsSchema } from '../helper'
import dayjs from 'dayjs'
import { AxiosError } from 'axios'
import { useOfflineTool } from '../../../../core-ui/Offline'

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
export const AddReceivedProduct = ({
  isModalOpen,
  closeModal,
  onSuccess
}: AddReceivedProductProps) => {
  const [step, setStep] = React.useState(0)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | undefined>(undefined)
  const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier | undefined>(undefined)
  const [isPictureChanged, setIsPictureChanged] = React.useState(false)
  const { showNotification } = useNotification()

  const offlineTool = useOfflineTool();

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPictureChanged) {
        event.preventDefault()
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isPictureChanged])

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

      formData.append('dto', new Blob([JSON.stringify(data)], { type: 'application/json' }))

      const resizedImage = await resizeFile({ file: productDetails.picture })
      console.log('originalImage', (productDetails.picture.size / (1024 * 1024)).toFixed(5), 'mb')
      console.log('resizedImage', (resizedImage.size / (1024 * 1024)).toFixed(5), 'mb')

      formData.append('fileObject', resizedImage)

      await makeCorePostRequest('/bakery/batch', formData)


    },
    {
      onSuccess: () => {
        closeModal()
        setSelectedProduct(undefined)
        setSelectedSupplier(undefined)
        setStep(0)
        detailsForm.resetForm()
        if (onSuccess) {
          onSuccess()
        }
        setIsPictureChanged(false)
        showNotification({
          message: `Product added successfully`,
          type: 'success'
        })
      },
      onError: (err: any) => {
        if (err?.code === AxiosError.ERR_NETWORK) {
          showNotification({
            message: 'Verificati conexiunea la internet',
            type: 'error'
          })

          // Store offline
          offlineTool.addOwnTask({
            type: `Produse receptionate, ${selectedProduct.name}`,
            data: err.config.data as FormData,
            url: '/bakery/batch',
            method: 'post'
          })

          closeModal()
          setSelectedProduct(undefined)
          setSelectedSupplier(undefined)
          setStep(0)
          detailsForm.resetForm()
          setIsPictureChanged(false)

          return
        }

        showNotification({
          message: `Exceptie: va rugam incercati, ${formatErrorMessage(err)}`,
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
                  setIsPictureChanged={setIsPictureChanged}
                />
              ][step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
