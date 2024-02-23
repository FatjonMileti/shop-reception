import { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useMutation } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { formatPayloadDate } from 'utils/helpers'
import { makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { ProductDetails } from './ProductDetails/ProductDetails'
import { SelectBatch } from './SelectBatch'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { SelectOrScanProduct } from './SelectOrScanProduct'
import { Product } from '../../ReceivedProducts/interfaces'
import { SelectCharge } from './SelectCharge'

interface OwnProductionTraceabilityModalProps {
  isModalOpen: boolean
  closeModal: () => void
  editItem?: any
  setEditItem: Function
  isEdit: boolean
}
export const OwnProductionTraceabilityModal = ({
  isModalOpen,
  closeModal,
  editItem,
  setEditItem,
  isEdit
}: OwnProductionTraceabilityModalProps) => {
  const { showNotification } = useNotification()
  const [step, setStep] = useState<number>(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [showAddBatch, setShowAddBatch] = useState<boolean>(false)
  const [showAddCharge, setShowAddCharge] = useState<boolean>(false)
  const submitTask = async values => {
    await makeCorePostRequest(`/bakery/traceability/production`, values)
  }
  const [recipeMetiCode, setRecipeMetiCode] = useState()

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
        productId: selectedProduct?.id || values.productId,
        productionDate: formatPayloadDate(values.productionDate),
        metiCode: values?.metiCode || selectedProduct?.metiCode,
        productName: selectedProduct?.name || values.productName
      }

      if (values.traceabilityProductionList.length === 0) {
        showNotification({
          message: `Cannot save without batch and charge.`,
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
    formik.setFieldValue('traceabilityProductionList', [])
    setSelectedRows([])
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
      modalTitle={`${
        isEdit
          ? 'Corectie trasabilitate productie proprie'
          : 'Adauga trasabilitate productie proprie'
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
                  onSelectBatch={(step?: number, metiCode?: any) => {
                    if (step === 2) {
                      setShowAddBatch(true)
                    }
                    if (step === 3) {
                      setShowAddCharge(true)
                    }
                    if (typeof step === 'undefined') {
                      setShowAddBatch(true)
                    }

                    setStep(step ? step : 2)
                  }}
                  onCancel={cancel}
                  selectedRows={selectedRows}
                  formik={formik}
                  isEdit={isEdit}
                  setRecipeMetiCode={setRecipeMetiCode}
                />,
                <SelectBatch
                  onContinue={() => {
                    setShowAddBatch(false)
                    setStep(1)
                  }}
                  onCancel={() => {
                    setStep(1)
                    setShowAddBatch(false)
                    setSelectedRows([])
                  }}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  metiCode={formik.values?.metiCode || selectedProduct?.metiCode}
                  selectedProduct={selectedProduct}
                  recipeMetiCode={recipeMetiCode}
                />,

                <SelectCharge
                  onContinue={() => {
                    setShowAddCharge(false)
                    setStep(1)
                  }}
                  onCancel={cancel}
                  setSelectedRows={setSelectedRows}
                  selectedRows={selectedRows}
                  metiCode={formik.values?.metiCode || selectedProduct?.metiCode}
                  selectedProduct={selectedProduct}
                />
              ][showAddBatch ? 2 : showAddCharge ? 3 : isEdit ? 1 : step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
