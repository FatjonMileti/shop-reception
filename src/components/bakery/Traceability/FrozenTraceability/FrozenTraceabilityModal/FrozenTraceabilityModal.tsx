import React, { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useMutation } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { formatBakeryPayloadDate } from 'utils/helpers'
import { makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { ProductDetails } from './ProductDetails'
import { SelectBatch } from './SelectBatch'
import { useFormik } from 'formik'
import { getInitialValues } from './helpers'
import {
  Product,
  SelectOrScanProduct
} from '../../ReceivedProducts/AddReceivedProduct/SelectProduct'

interface FrozenTraceabilityModalProps {
  isModalOpen: boolean
  closeModal: () => void
  editItem?: any
  setEditItem: any
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
  const [step, setStep] = React.useState(0)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | undefined>(undefined)
  const [selectedSupplier, setSelectedSupplier] = React.useState<any | undefined>(undefined)
  const [selectedRows, setSelectedRows] = useState([])

  const submitTask = async values => {
    await makeCorePostRequest(`/bakery/traceability/frozen`, values)
  }

  const { isLoading, mutate } = useMutation(submitTask, {
    onSuccess: res => {
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

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: isEdit ? true : false,
    // TODO: Add validation schema
    initialValues: initialValues,
    onSubmit: async (values: any, { resetForm }) => {
      const payload = {
        ...values,
        // productId: selectedProduct.id,
        productionDate: formatBakeryPayloadDate(values.productionDate)
      }
      mutate(payload)
      resetForm()
      setSelectedRows([])
    }
  })
  const cancel = () => {
    closeModal()
    setSelectedProduct(undefined)
    setSelectedSupplier(undefined)
    setEditItem(null)
    setStep(0)
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
                  selectedProduct={editItem ? { name: '-', metiCode: '-' } : selectedProduct}
                  onSelectBatch={() => setStep(2)}
                  onCancel={cancel}
                  selectedRows={selectedRows}
                  formik={formik}
                  isEdit={isEdit}
                />,
                <SelectBatch
                  onContinue={() => setStep(1)}
                  onCancel={cancel}
                  setSelectedRows={setSelectedRows}
                />
              ][isEdit ? 1 : step]
            }
          </>
        )}
      </Grid>
    </Modal>
  )
}
