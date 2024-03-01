import { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useMutation, useQuery } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { formatPayloadDate } from 'utils/helpers'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { ProductDetails } from './ProductDetails/ProductDetails'
import { SelectBatch } from './SelectBatch'
import { useFormik } from 'formik'
import { getInitialValues, validationSchema } from './helpers'
import { SelectOrScanProduct } from './SelectOrScanProduct'
import { Product } from '../../ReceivedProducts/interfaces'
import { SelectCharge } from './SelectCharge'

interface OwnProductionTraceabilityModalProps {
  isModalOpen: boolean
  closeModal: () => void
}
export const OwnProductionTraceabilityModal = ({
  isModalOpen,
  closeModal,
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
  const [componentMetiCode, setComponentMetiCode] = useState()

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
    () => getInitialValues(selectedProduct, selectedRows),
    [selectedProduct?.id, selectedRows]
  )

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: false,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: async (values: any, { resetForm }) => {

      const payload = {
        ...values,
        productId: selectedProduct?.id,
        productionDate: formatPayloadDate(values.productionDate),
        metiCode: selectedProduct?.metiCode,
        productName: selectedProduct?.name
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
    }
  })

  const cancel = () => {
    closeModal()
    setShowAddBatch(false)
    setShowAddCharge(false)
    setSelectedProduct(undefined)
    setStep(0)
    formik.resetForm()
    formik.setFieldValue('traceabilityProductionList', [])
    setSelectedRows([])
  }

  const recipeQuery= useQuery(
    ['recipe', selectedProduct?.metiCode],
    async () => {
      const result = await makeCoreGetRequest(
        `/bakery/recipe/${selectedProduct?.metiCode}`
      )
      let charges = []
      let batches = []
      let others = []
      if (result) {
        result[0].componentList.forEach(item => {
          if(item.withBatch && item.withRecipe)  {
            charges.push(item)
          } else if(item.withBatch) {
            batches.push(item)
          } else if (item.withRecipe) {
            charges.push(item)
          } else {
            others.push(item)
          }
        })
      }
      return { charges, batches, others, details: result[0] }
    },
    {
      enabled: !!selectedProduct?.metiCode,
      onError: error => {
        showNotification({
          message: `Error while fetching recipe data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
      modalTitle={'Adauga trasabilitate productie proprie'}
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
                  selectedProduct={selectedProduct}
                  onSelectBatch={(step?: number) => {
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
                  setComponentMetiCode={setComponentMetiCode}
                  recipeQuery={recipeQuery}
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
                  metiCode={selectedProduct?.metiCode}
                  selectedProduct={selectedProduct}
                  componentMetiCode={componentMetiCode}
                  formik={formik}
                  recipeQuery={recipeQuery}
                />,
                <SelectCharge
                  onContinue={() => {
                    setShowAddCharge(false)
                    setStep(1)
                  }}
                  onCancel={cancel}
                  setSelectedRows={setSelectedRows}
                  selectedRows={selectedRows}
                  selectedProduct={selectedProduct}
                  formik={formik}
                  componentMetiCode={componentMetiCode}
                  recipeQuery={recipeQuery}
                />
              ][showAddBatch ? 2 : showAddCharge ? 3 : step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
