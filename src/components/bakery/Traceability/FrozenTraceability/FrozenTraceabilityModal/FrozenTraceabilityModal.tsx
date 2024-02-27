import { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useMutation } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { formatPayloadDate } from 'utils/helpers'
import { makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { ProductDetails } from './ProductDetails'
import { SelectBatch } from './SelectBatch'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { SelectOrScanProduct } from '../../ReceivedProducts/AddReceivedProduct/SelectOrScanProduct'
import { Product } from '../../ReceivedProducts/interfaces'

interface FrozenTraceabilityModalProps {
  isModalOpen: boolean
  closeModal: () => void
  editItem?: any
  setEditItem: Function
  isEdit: boolean
}
export const FrozenTraceabilityModal = ({
  isModalOpen,
  closeModal,
  editItem,
  setEditItem,
  isEdit
}: FrozenTraceabilityModalProps) => {
  const { showNotification } = useNotification()
  const [step, setStep] = useState<number>(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [showAddBatch, setShowAddBatch] = useState<boolean>(false)

  const submitTask = async values => {
    await makeCorePostRequest(`/bakery/traceability/frozen`, values)
  }

  const { isLoading, mutate } = useMutation(submitTask, {
    onSuccess: () => {
      closeModal()
      showNotification({
        message: `Data added successfully`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while trying to add data, ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const initialValues = useMemo(
    () => getInitialValues(selectedProduct, selectedRows, editItem),
    [selectedProduct?.id, selectedRows, editItem?.id, isEdit]
  )

  const validationSchema = useMemo(() => getValidationSchema(), [])

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: isEdit ? true : false,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: async (values: any, { resetForm }) => {
      const payload = {
        ...values,
        productId: values.productId || selectedProduct.id,
        productionDate: formatPayloadDate(values.productionDate),
        metiCode: values?.metiCode || selectedProduct?.metiCode,
        productName: values?.productName || selectedProduct?.name
      }

      if (values.traceabilityFrozenList.length === 0) {
        showNotification({
          message: `Cannot save without batch.`,
          type: 'error'
        })

        return
      }

      mutate(payload)
      resetForm()
      setSelectedRows([])
      setStep(0)
      setSelectedProduct(undefined)
      setEditItem(null)
    }
  })

  const cancel = () => {
    closeModal()
    setShowAddBatch(false)
    setSelectedProduct(undefined)
    setEditItem(null)
    setStep(0)
    formik.resetForm()
    formik.setFieldValue('traceabilityFrozenList', [])
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
      modalTitle={`${
        isEdit
          ? 'Corectie trasabilitate congelate si ambalaje'
          : 'Adauga trasabilitate congelate si ambalaje'
      }`}
      modalWidth="50%"
    >
      <Grid container>
        {isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        {!isLoading && (
          <>
            {
              [
                <SelectOrScanProduct
                  setSelectedProduct={setSelectedProduct}
                  selectedProduct={selectedProduct}
                  onContinue={() => setStep(1)}
                  onCancel={cancel}
                />,
                <ProductDetails
                  selectedProduct={
                    editItem
                      ? {
                          id: formik.values.productId,
                          name: formik.values.productName || '',
                          metiCode: formik.values.metiCode || ''
                        }
                      : selectedProduct
                  }
                  onSelectBatch={() => {
                    setShowAddBatch(true)
                    setStep(2)
                  }}
                  onCancel={cancel}
                  selectedRows={selectedRows}
                  formik={formik}
                  isEdit={isEdit}
                />,
                <SelectBatch
                  selectedProduct={selectedProduct}
                  onContinue={() => {
                    setShowAddBatch(false)
                    setStep(1)
                  }}
                  onCancel={() => {
                    setShowAddBatch(false)
                    setSelectedRows([])
                    setStep(1)
                  }}
                  setSelectedRows={setSelectedRows}
                />
              ][showAddBatch ? 2 : isEdit ? 1 : step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
