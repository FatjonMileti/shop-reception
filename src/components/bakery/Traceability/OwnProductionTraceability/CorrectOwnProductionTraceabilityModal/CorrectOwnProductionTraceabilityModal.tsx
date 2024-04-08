import { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useMutation, useQuery, UseQueryResult } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { formatPayloadDate } from 'utils/helpers'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { ProductDetails } from './ProductDetails/ProductDetails'
import { SelectBatch } from './SelectBatch'
import { useFormik } from 'formik'
import { getInitialValues, validationSchema } from './helpers'
import { SelectCharge } from './SelectCharge'
import {
  quantityCalculation,
  toBatchFormat,
  toChargeFormat
} from '../AddOwnProductionTraceabilityModal/helpers'
import { calculateComponentDlc } from './helpers'

interface CorrectOwnProductionTraceabilityModalProps {
  isModalOpen: boolean
  closeModal: () => void
  correctItemQuery: UseQueryResult<any>
}
export const CorrectOwnProductionTraceabilityModal = ({
  isModalOpen,
  closeModal,
  correctItemQuery
}: CorrectOwnProductionTraceabilityModalProps) => {
  const { showNotification } = useNotification()
  const [step, setStep] = useState<number>(0)
  const [componentMetiCode, setComponentMetiCode] = useState<string | number | undefined>()

  const correctItemMutation = useMutation(
    async (values: any) => {
      await makeCorePutRequest(
        `/bakery/traceability/production/correction/${correctItemQuery?.data?.id}`,
        values
      )
    },
    {
      onSuccess: () => {
        showNotification({
          message: `Data added successfully`,
          type: 'success'
        })
        cancel()
      },
      onError: res => {
        showNotification({
          message: `Error while trying to add data, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  const initialValues = useMemo(
    () => getInitialValues(correctItemQuery?.data),
    [correctItemQuery?.data?.id]
  )

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: async (values: any) => {
      const removeProductionDate = ({ productionDate, ...item }) => item

      const payload = {
        productId: values?.product?.productId,
        productionDate: formatPayloadDate(values.productionDate),
        chargeNumber: values?.chargeNumber,
        productionOperator: values?.productionOperator,
        quantity: values?.quantity,
        thermalCondition: values?.thermalCondition,
        dlc: values?.dlc,
        conform: values?.conform,
        nonComplianceReason: values?.nonComplianceReason,
        productDestination: values?.productDestination,
        metiCode: values?.product?.metiCode,
        productName: values.product?.name,
        traceabilityProductionList: values?.traceabilityProductionList
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

      correctItemMutation.mutate(payload)
    }
  })

  console.log("formik.errors: ", formik.errors)
  console.log("formik.values: ", formik.values)


  const cancel = () => {
    closeModal()
    setStep(0)
    formik.resetForm()
  }

  const recipeQuery = useQuery(
    ['receip', formik.values?.product?.metiCode],
    async () => {
      const result = await makeCoreGetRequest(`/bakery/recipe/${formik.values?.product?.metiCode}`)
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
      enabled: !!formik.values?.product?.metiCode,
      onError: error => {
        showNotification({
          message: `Error while fetching recipe data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )
  const addNewBatches = (batchesToAdd: any[]) => {
    if (batchesToAdd.length === 0) return

    const mewBatches = batchesToAdd.filter(
      b => !formik.values.traceabilityProductionList.some(c => c.batchId === b.id)
    )

    if (mewBatches.length === 0) return

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
      ...mewBatches.map(b => toBatchFormat(b, calculatedQuantity))
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
      modalTitle={'Corectie trasabilitate productie proprie'}
      modalWidth="50%"
    >
      <Grid container>
        {(correctItemMutation.isLoading || correctItemQuery.isFetching) && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        {!correctItemMutation.isLoading && correctItemQuery?.data && (
          <>
            {
              [
                <ProductDetails
                  onAddBatch={componentMetiCode => {
                    setComponentMetiCode(componentMetiCode)
                    setStep(1)
                  }}
                  onAddCharge={componentMetiCode => {
                    setComponentMetiCode(componentMetiCode)
                    setStep(2)
                  }}
                  onCancel={cancel}
                  formik={formik}
                  recipeQuery={recipeQuery}
                />,
                <SelectBatch
                  onContinue={batches => {
                    addNewBatches(batches)
                    setStep(0)
                  }}
                  onCancel={() => {
                    setStep(0)
                  }}
                  metiCode={formik.values?.metiCode}
                  componentMetiCode={componentMetiCode}
                  productionDate={formik.values.productionDate}
                />,
                <SelectCharge
                  onContinue={charges => {
                    addNewCharges(charges)
                    setStep(0)
                  }}
                  onCancel={() => {
                    setStep(0)
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
