import { useMemo } from 'react'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../Common/Grid'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toPayload } from './serializers'
import { ModalFormActionButtons } from '../../../Common/ModalFormActionButtons'

interface PackagingInventoryUpdateModalProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItem?: PackagingInventory
}

const PackagingInventoryUpdateModal: React.FC<PackagingInventoryUpdateModalProps> = props => {
  const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = toPayload(formik.values)

        setShouldRefreshData(true)
        closeModal()
        formik.resetForm()
      } catch (error) {
        showNotification({
          message: `Error while data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  let items = [
    <Grid
      gridContainerStyle={{ margin: 0 }}
      items={[
        <Input
          type="number"
          value={formik.values.qualitative}
          onChange={event =>
            formik.setFieldValue('qualitative', (event.target as HTMLInputElement).value)
          }
          label="Calitativ"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.qualitative}
          helperText={formik.errors.qualitative as string}
          required
        />,
        <Input
          type="number"
          value={formik.values.defective}
          onChange={event =>
            formik.setFieldValue('defective', (event.target as HTMLInputElement).value)
          }
          label="Defect"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.defective}
          helperText={formik.errors.defective as string}
          required
        />,
      ]}
      itemsPerRow={2}
    />,
    <ModalFormActionButtons
      onCancel={() => closeModal()}
      onSubmit={() => formik.handleSubmit()}
    />
  ]
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle='Actualizare inventar'
      modalWidth="50%"
    >
      <Grid
        gridContainerStyle={{ margin: 0 }}
        items={items}
        itemsPerRow={1}
      />
    </Modal>
  )
}

export default PackagingInventoryUpdateModal
