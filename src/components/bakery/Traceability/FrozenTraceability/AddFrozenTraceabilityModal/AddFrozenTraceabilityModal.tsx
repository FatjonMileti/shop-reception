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
import { getInitialValues, validationSchema, toBatchFormat } from './helpers'
import { SelectOrScanProduct } from '../../ReceivedProducts/AddReceivedProduct/SelectOrScanProduct'
import { Product } from '../../ReceivedProducts/interfaces'

interface AddFrozenTraceabilityModalProps {
  isModalOpen: boolean
  closeModal: () => void
  setShouldRefreshData: Function
}
export const AddFrozenTraceabilityModal = ({
  isModalOpen,
  closeModal,
  setShouldRefreshData
}: AddFrozenTraceabilityModalProps) => {
  const { showNotification } = useNotification()
  const [step, setStep] = useState<number>(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(null)

  const frozenTraceabilityMutation = useMutation(
    async (values: any) => {
      await makeCorePostRequest(`/bakery/traceability/frozen`, values)
    },
    {
      onSuccess: () => {
        cancel()
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
    }
  )

  const initialValues = useMemo(() => getInitialValues(), [])

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: false,
    validationSchema,
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      const payload = {
        productId: selectedProduct.id,
        metiCode: selectedProduct?.metiCode,
        productName: selectedProduct?.name,
        productionDate: formatPayloadDate(values.productionDate),
        chargeNumber: values.chargeNumber,
        productionOperator: values.productionOperator,
        quantity: values.quantity,
        thermalCondition: values.thermalCondition,
        conform: values.conform,
        nonComplianceReason: values?.nonComplianceReason || null,
        productDestination: values?.productDestination || null,
        dlc: values.dlc || null,
        traceabilityFrozenList: values.traceabilityFrozenList
      }

      if (values.traceabilityFrozenList.length === 0) {
        showNotification({
          message: `Cannot save without batch.`,
          type: 'error'
        })

        return
      }

      frozenTraceabilityMutation.mutate(payload)
      setShouldRefreshData(true)
    }
  })

  const cancel = () => {
    setSelectedProduct(undefined)
    setStep(0)
    formik.resetForm()
    closeModal()
  }

  const addNewFrozenItems = (itemsToAdd: any[]) => {
    if (itemsToAdd.length === 0) return

    const newItems = itemsToAdd.filter(
      itemToAdd =>
        !formik.values?.traceabilityFrozenList.some(
          existingItem => existingItem.batchId === itemToAdd.id
        )
    )

    if (newItems.length === 0) return

    formik.setFieldValue('traceabilityFrozenList', [
      ...formik.values?.traceabilityFrozenList,
      ...newItems.map(sr => toBatchFormat(sr, formik.values?.quantity))
    ])
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
      modalTitle="Adauga trasabilitate congelate si ambalaje"
      modalWidth="50%"
    >
      <Grid container>
        {frozenTraceabilityMutation.isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        {!frozenTraceabilityMutation.isLoading && (
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
                  onSelectBatch={() => {
                    setStep(2)
                  }}
                  onCancel={cancel}
                  formik={formik}
                />,
                <SelectBatch
                  selectedProduct={selectedProduct}
                  onContinue={frozenItems => {
                    addNewFrozenItems(frozenItems)
                    setStep(1)
                  }}
                  onCancel={() => {
                    setStep(1)
                  }}
                />
              ][step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
