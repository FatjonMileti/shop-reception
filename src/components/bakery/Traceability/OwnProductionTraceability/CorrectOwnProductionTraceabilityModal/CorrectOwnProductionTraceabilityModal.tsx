import { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useMutation, UseQueryResult } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { formatPayloadDate } from 'utils/helpers'
import { makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { ProductDetails } from './ProductDetails/ProductDetails'
import { SelectBatch } from './SelectBatch'
import { useFormik } from 'formik'
import { getInitialValues, validationSchema } from './helpers'
import { SelectCharge } from './SelectCharge'

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
  const [selectedRows, setSelectedRows] = useState([])
  const [showAddBatch, setShowAddBatch] = useState<boolean>(false)
  const [showAddCharge, setShowAddCharge] = useState<boolean>(false)

  const editItem = correctItemQuery?.data

  const submitTask = async values => {
    await makeCorePutRequest(`/bakery/traceability/production/correction/${editItem.id}`, values)
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
    () => getInitialValues(selectedRows, editItem),
    [selectedRows, editItem?.id]
  )

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: async (values: any, { resetForm }) => {
      const payload = {
        ...values,
        productId: values.productId,
        productionDate: formatPayloadDate(values.productionDate),
        metiCode: values?.metiCode,
        productName: values.productName
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
    }
  })

  const cancel = () => {
    closeModal()
    setShowAddBatch(false)
    formik.resetForm()
    formik.setFieldValue('traceabilityProductionList', [])
    setSelectedRows([])
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
      modalTitle={'Corectie trasabilitate productie proprie'}
      modalWidth="50%"
    >
      <Grid container>
        {(isLoading || correctItemQuery.isFetching) && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        {(!isLoading && correctItemQuery?.data) && (
          <>
            {
              [
                <ProductDetails
                  onSelectBatch={(step?: number) => {
                    if (step === 2) {
                      setShowAddCharge(true)
                    }
                    if (typeof step === 'undefined') {
                      setShowAddBatch(true)
                    }
                  }}
                  onCancel={cancel}
                  selectedRows={selectedRows}
                  formik={formik}
                  setRecipeMetiCode={setRecipeMetiCode}
                  editItem={editItem}
                />,
                <SelectBatch
                  onContinue={() => {
                    setShowAddBatch(false)
                  }}
                  onCancel={() => {
                    setShowAddBatch(false)
                    setSelectedRows([])
                  }}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  metiCode={formik.values?.metiCode}
                  recipeMetiCode={recipeMetiCode}
                  formik={formik}
                />,
                <SelectCharge
                  onContinue={() => {
                    setShowAddCharge(false)
                  }}
                  onCancel={cancel}
                  setSelectedRows={setSelectedRows}
                  selectedRows={selectedRows}
                  metiCode={formik.values?.metiCode}
                  formik={formik}
                />
              ][showAddBatch ? 1 : showAddCharge ? 2 : 0]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
