import { useMemo } from 'react'
import { Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../Common/Grid'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toPayload } from './serializers'
import { ModalFormActionButtons } from '../../../Common/ModalFormActionButtons'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: PackingType
}

const PackingTypeForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props
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

        if (isEdit) {
        } else {
        }

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
          type='text'
          value={formik.values.packagingCode}
          onChange={event =>
            formik.setFieldValue('packagingCode', (event.target as HTMLInputElement).value)
          }
          label='Cod ambalaj'
          variant='outlined'
          style={{ width: '100%' }}
          error={!!formik.errors.packagingCode}
          helperText={formik.errors.packagingCode as string}
          required
        />,
        <Input
          type='text'
          value={formik.values.name}
          onChange={event =>
            formik.setFieldValue('name', (event.target as HTMLInputElement).value)
          }
          label='Denumire'
          variant='outlined'
          style={{ width: '100%' }}
          error={!!formik.errors.name}
          helperText={formik.errors.name as string}
          required
        />,
        <Input
          type='select'
          value={formik.values.main}
          onChange={event =>
            formik.setFieldValue('main', (event.target as HTMLInputElement).value)
          }
          label='Principal/secundar'
          variant='outlined'
          style={{ width: '100%' }}
          error={!!formik.errors.main}
          helperText={formik.errors.main as string}
          values={[]}
          required
        />,
        <Input
          type='select'
          value={formik.values.generatedBarcode}
          onChange={event =>
            formik.setFieldValue('generatedBarcode', (event.target as HTMLInputElement).value)
          }
          label='Cod de bare'
          variant='outlined'
          style={{ width: '100%' }}
          error={!!formik.errors.generatedBarcode}
          helperText={formik.errors.generatedBarcode as string}
          values={[]}
          required
        />,
        <Checkbox
          checked={formik.values.active}
          onChange={event => formik.setFieldValue('active', (event.target as HTMLInputElement).checked)}
          label='Activ'
        />,
        <Checkbox
          checked={formik.values.return}
          onChange={event => formik.setFieldValue('return', (event.target as HTMLInputElement).checked)}
          label='Returnabil'
        />,
        <Checkbox
          checked={formik.values.combination}
          onChange={event => formik.setFieldValue('combination', (event.target as HTMLInputElement).checked)}
          label='Combinaţie'
        />
      ]}
      itemsPerRow={2}
    />,
    <ModalFormActionButtons
      onCancel={() => closeModal()}
      onSubmit={() => formik.handleSubmit()}
    />
  ]

  if (isEdit) {
    items.unshift(<FormInfoItems
      items={[
        {
          label: 'Denumire:',
          name: editItem?.name
        }
      ]}
    />)
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editează tip ambalaj' : 'Adaugă tip ambalaj'}
      modalWidth='50%'
    >
      <Grid
        gridContainerStyle={{ margin: 0 }}
        items={items}
        itemsPerRow={1}
      />
    </Modal>
  )
}

export default PackingTypeForm
