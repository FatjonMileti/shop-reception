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

interface TransportResponsibleModalProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItem?: TransportResponsible
  isEdit?: boolean
}

const TransportResponsibleModal: React.FC<TransportResponsibleModalProps> = props => {
  const { isModalOpen, closeModal, editItem, isEdit, setShouldRefreshData } = props
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
          type="text"
          value={formik.values.firstName}
          onChange={event =>
            formik.setFieldValue('firstName', (event.target as HTMLInputElement).value)
          }
          label="Prenume"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.firstName}
          helperText={formik.errors.firstName as string}
          required
        />,
        <Input
          type="text"
          value={formik.values.name}
          onChange={event =>
            formik.setFieldValue('name', (event.target as HTMLInputElement).value)
          }
          label="Nume"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.name}
          helperText={formik.errors.name as string}
          required
        />,
        <Input
          type="text"
          value={formik.values.emails}
          onChange={event =>
            formik.setFieldValue('emails', (event.target as HTMLInputElement).value)
          }
          label="Adresa de mail"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.emails}
          helperText={formik.errors.emails as string}
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
      modalTitle={isEdit ? 'Actualizeaza responsabil transport' : 'Adăugați responsabil transport'}
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

export default TransportResponsibleModal
