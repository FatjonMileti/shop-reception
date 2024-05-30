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
import { calculateComponentDlc, getInitialValues, toBatchFormat, validationSchema } from './helpers'
import dayjs from 'dayjs'
import { AxiosError } from 'axios'

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

  const initialValues = useMemo(
    () => getInitialValues(itemToCorrectQuery?.data),
    [itemToCorrectQuery?.data]
  )

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema,
    initialValues,
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
        dlc: values.product?.dlcDays
          ? formatPayloadDate(dayjs(values.productionDate).add(values.product?.dlcDays, 'days'))
          : null,
        traceabilityFrozenList: values.traceabilityFrozenList.map(item => ({
          ...item,
          dlc: calculateComponentDlc(item)
        }))
      }

      if (values.traceabilityFrozenList.length === 0) {
        showNotification({
          message: 'Nu se poate salva fara lot.',
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
            <ProductDetails
              onSelectBatch={() => {
                setStep(1)
              }}
              onCancel={cancel}
              formik={formik}
            />

            {step === 1 && (
              <Modal
                isModalOpen={isModalOpen}
                closeModal={() => {
                  setStep(0)
                }}
                modalTitle="Corectie trasabilitate congelate si ambalaje"
                modalWidth="50%"
              >
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
              </Modal>
            )}
          </>
        )}
      </Grid>
    </Modal>
  )
}
