import { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useMutation, UseQueryResult } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { formatPayloadDate } from 'utils/helpers'
import { makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { ProductDetails } from './ProductDetails'
import { SelectBatch } from './SelectBatch'
import { useFormik } from 'formik'
import { getInitialValues, toBatchFormat, validationSchema } from './helpers'

interface CorrectFrozenTraceabilityModalProps {
  isModalOpen: boolean
  closeModal: () => void
  itemToCorrectQuery: UseQueryResult<any>
}
export const CorrectFrozenTraceabilityModal = ({
  isModalOpen,
  closeModal,
  itemToCorrectQuery
}: CorrectFrozenTraceabilityModalProps) => {
  const { showNotification } = useNotification()

  const [step, setStep] = useState<number>(0)

  const itemToCorrectMutation = useMutation(
    async (values: any) => {
      await makeCorePutRequest(
        `/bakery/traceability/frozen/correction/${itemToCorrectQuery?.data?.id}`,
        values
      )
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

  const initialValues = useMemo(
    () => getInitialValues(itemToCorrectQuery?.data),
    [itemToCorrectQuery?.data]
  )

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      const payload = {
        productId: values.product.id,
        metiCode: values.product.metiCode,
        productName: values.product.name,
        productionDate: formatPayloadDate(values.productionDate),
        chargeNumber: values.chargeNumber,
        productionOperator: values.productionOperator,
        quantity: values.quantity,
        thermalCondition: values.thermalCondition,
        conform: values.conform,
        nonComplianceReason: values?.nonComplianceReason || null,
        productDestination: values?.productDestination || null,
        dlc: values.dlc,
        traceabilityFrozenList: values.traceabilityFrozenList
      }

      if (values.traceabilityFrozenList.length === 0) {
        showNotification({
          message: `Cannot save without batch.`,
          type: 'error'
        })

        return
      }

      itemToCorrectMutation.mutate(payload)
    }
  })

  const cancel = () => {
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
      modalTitle="Corectie trasabilitate congelate si ambalaje"
      modalWidth="50%"
    >
      <Grid container>
        {(itemToCorrectMutation.isLoading || itemToCorrectQuery.isFetching) && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        {!itemToCorrectMutation.isLoading && itemToCorrectQuery?.data && (
          <>
            {
              [
                <ProductDetails
                  onSelectBatch={() => {
                    setStep(1)
                  }}
                  onCancel={cancel}
                  formik={formik}
                />,
                <SelectBatch
                  onContinue={frozenItems => {
                    addNewFrozenItems(frozenItems)
                    setStep(0)
                  }}
                  onCancel={() => {
                    setStep(0)
                  }}
                  formik={formik}
                />
              ][step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
