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
import {
  getInitialValues,
  quantityCalculation,
  toBatchFormat,
  toChargeFormat,
  validationSchema
} from './helpers'
import { SelectOrScanProduct } from './SelectOrScanProduct'
import { Product } from '../../ReceivedProducts/interfaces'
import { SelectCharge } from './SelectCharge'
import dayjs from 'dayjs'
import { calculateComponentDlc } from '../CorrectOwnProductionTraceabilityModal/helpers'
import { AxiosError } from 'axios'

interface AddOwnProductionTraceabilityModalProps {
  isModalOpen: boolean
  closeModal: () => void
  setShouldRefreshData: Function
}
export const AddOwnProductionTraceabilityModal = ({
  isModalOpen,
  closeModal,
  setShouldRefreshData
}: AddOwnProductionTraceabilityModalProps) => {
  const { showNotification } = useNotification()
  const [step, setStep] = useState<number>(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(null)
  const [componentMetiCode, setComponentMetiCode] = useState<string | number | undefined>(undefined)

  const ownTraceabilityMutation = useMutation(
    async (values: any) => {
      await makeCorePostRequest(`/bakery/traceability/production`, values)
    },
    {
      onSuccess: () => {
        showNotification({
          message: `Data added successfully`,
          type: 'success'
        })
        cancel()
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

  const recipeQuery = useQuery(
    ['recipe', selectedProduct?.metiCode],
    async () => {
      const result = await makeCoreGetRequest(`/bakery/recipe/${selectedProduct?.metiCode}`)
      let charges = []
      let batches = []
      let others = []
      if (result) {
        result[0].componentList.forEach(item => {
          if (item.withBatch && item.withRecipe) {
            charges.push(item)
          } else if (item.withBatch) {
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

  const initialValues = useMemo(() => getInitialValues(recipeQuery, selectedProduct), [recipeQuery.data])

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: async (values: any) => {

      const removeProductionDate = ({ productionDate, ...item }) => item

      const payload = {
        productId: selectedProduct?.id,
        metiCode: selectedProduct?.metiCode,
        productName: selectedProduct?.name,
        productionDate: formatPayloadDate(values.productionDate),
        chargeNumber: values.chargeNumber,
        productionOperator: values.productionOperator,
        quantity: values.quantity,
        thermalCondition: values.thermalCondition,
        dlc: selectedProduct.dlcDays
          ? formatPayloadDate(dayjs(values.productionDate).add(selectedProduct.dlcDays, 'days'))
          : null,
        conform: values.conform,
        nonComplianceReason: values.nonComplianceReason,
        productDestination: values.productDestination,
        traceabilityProductionList: values.traceabilityProductionList
          .map(item => ({
            ...item,
            dlc: calculateComponentDlc(item)
          }))
          .map(removeProductionDate)
      }

      if (values.traceabilityProductionList.length === 0) {
        showNotification({
          message: 'Nu se poate salva fara lot sau sarja.',
          type: 'error'
        })

        return
      }

      const emptyBatches =
        recipeQuery.data.batches.length > 0 &&
        recipeQuery.data.batches.find(
          batch =>
            !values.traceabilityProductionList.some(
              item => item.componentCode === batch.componentCode && item.batchId
            )
        )

      const emptyCharges =
        recipeQuery.data.charges.length > 0 &&
        recipeQuery.data.charges.find(
          charge =>
            !values.traceabilityProductionList.some(
              item => item.componentCode === charge.componentCode && item.childTraceabilityId
            )
        )

      if (emptyBatches || emptyCharges) {
        showNotification({
          message: 'Nu se poate salva fara lot sau sarja.',
          type: 'error'
        })

        return
      }

      ownTraceabilityMutation.mutate(payload)
      setShouldRefreshData(true)
    }
  })

  const cancel = () => {
    closeModal()
    setSelectedProduct(undefined)
    setStep(0)
    formik.resetForm()
  }

  const addNewBatches = (batchesToAdd: any[]) => {
    if (batchesToAdd.length === 0) return

    const newBatches = batchesToAdd.filter(
      b => !formik.values.traceabilityProductionList.some(c => c.batchId === b.id)
    )

    if (newBatches.length === 0) return

    const componentQuantity = recipeQuery?.data?.batches?.find(
      b => b.componentCode === componentMetiCode
    )?.componentQuantity

    const calculatedQuantity = quantityCalculation(
      formik.values.quantity,
      componentQuantity,
      recipeQuery?.data?.details?.recipeQuantity
    )?.toFixed(3)

    formik.setFieldValue('traceabilityProductionList', [
      ...formik.values.traceabilityProductionList,
      ...newBatches.map(b => toBatchFormat(b, calculatedQuantity))
    ])
  }

  const addNewCharges = (chargesToAdd: any[]) => {
    if (chargesToAdd.length === 0) return

    const mewCharges = chargesToAdd.filter(
      ch => !formik.values.traceabilityProductionList.some(c => c.childTraceabilityId === ch.id)
    )

    if (mewCharges.length === 0) return

    const componentQuantity = recipeQuery?.data?.charges?.find(
      b => b.componentCode === componentMetiCode
    )?.componentQuantity

    const calculatedQuantity = quantityCalculation(
      formik.values.quantity,
      componentQuantity,
      recipeQuery?.data?.details?.recipeQuantity
    )?.toFixed(3)

    formik.setFieldValue('traceabilityProductionList', [
      ...formik.values.traceabilityProductionList,
      ...mewCharges.map(b => toChargeFormat(b, calculatedQuantity))
    ])
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
      modalTitle={'Adauga trasabilitate productie proprie'}
      modalWidth="50%"
    >
      <Grid container>
        {ownTraceabilityMutation.isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        {!ownTraceabilityMutation.isLoading && (
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
                  onAddBatch={componentMetiCode => {
                    setComponentMetiCode(componentMetiCode)
                    setStep(2)
                  }}
                  onAddCharge={componentMetiCode => {
                    setComponentMetiCode(componentMetiCode)
                    setStep(3)
                  }}
                  onCancel={cancel}
                  formik={formik}
                  recipeQuery={recipeQuery}
                />,
                <SelectBatch
                  onContinue={batches => {
                    addNewBatches(batches)
                    setStep(1)
                  }}
                  onCancel={() => {
                    setStep(1)
                  }}
                  componentMetiCode={componentMetiCode}
                  productionDate={formik.values.productionDate}
                />,
                <SelectCharge
                  onContinue={charges => {
                    addNewCharges(charges)
                    setStep(1)
                  }}
                  onCancel={() => {
                    setStep(1)
                  }}
                  componentMetiCode={componentMetiCode}
                  productionDate={formik.values.productionDate}
                />
              ][step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
