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

interface SeriesNumberProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItem?: SeriesNumber
  isEdit?: boolean
}

const SeriesNumberForm: React.FC<SeriesNumberProps> = props => {
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
          type='select'
          onChange={event =>
            formik.setFieldValue('society', (event.target as HTMLInputElement).value)
          }
          label='Societatea'
          variant='outlined'
          style={{ width: '100%' }}
          values={[
            {
              label: 'Selectează societatea',
              value: 'none'
            }
          ]}
          value={'none'}
          error={!!formik.errors.district}
          helperText={formik.errors.district as string}
          required
        />,
        <Input
          type='text'
          value={formik.values.series}
          onChange={event =>
            formik.setFieldValue('series', (event.target as HTMLInputElement).value)
          }
          label='Serie'
          variant='outlined'
          style={{ width: '100%' }}
          error={!!formik.errors.series}
          helperText={formik.errors.series as string}
          required
        />,
        <Input
          type='number'
          onChange={event =>
            formik.setFieldValue('startInterval', (event.target as HTMLInputElement).value)
          }
          value={formik.values.startInterval}
          label='Inceput de interval'
          variant='outlined'
          style={{ width: '100%' }}
          error={!!formik.errors.startInterval}
          helperText={formik.errors.startInterval as string}
          required
        />,
        <Input
          type='number'
          onChange={event =>
            formik.setFieldValue('currentNumber', (event.target as HTMLInputElement).value)
          }
          value={formik.values.currentNumber}
          label='Numar Curent'
          variant='outlined'
          style={{ width: '100%' }}
          error={!!formik.errors.currentNumber}
          helperText={formik.errors.currentNumber as string}
          required
        />,
        <Input
          type='number'
          onChange={event =>
            formik.setFieldValue('year', (event.target as HTMLInputElement).value)
          }
          value={formik.values.year}
          label='An'
          variant='outlined'
          style={{ width: '100%' }}
          error={!!formik.errors.year}
          helperText={formik.errors.year as string}
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

  if(isEdit){
    items.unshift(<FormInfoItems
      items={[
        {
          label: 'Serie:',
          name: editItem?.series
        }
      ]}
    />)
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editare Serie' : 'Adăugare Serie'}
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

export default SeriesNumberForm
