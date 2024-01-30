import { useMemo } from 'react'
import { Button, Input, Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../Common/Grid'
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
  editItem?: AdminDeposit
}

const AdminDepositForm: React.FC<NewAdminDepositProps> = props => {
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
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editează depozit' : 'Adaugă depozit'}
      modalWidth='50%'
    >
      <>
        {isEdit ? (
          <Grid
            gridContainerStyle={{ margin: 0 }}
            items={[
              <FormInfoItems
                items={[
                  {
                    label: 'Nume:',
                    name: (editItem as AdminDeposit)?.name
                  }
                ]}
              />
            ]}
            itemsPerRow={1}
          />
        ) : null}
        <Grid
          gridContainerStyle={{ margin: 0 }}
          items={[
            <Input
              type='text'
              value={formik.values.depositCode}
              onChange={event =>
                formik.setFieldValue('depositCode', (event.target as HTMLInputElement).value)
              }
              label='Cod depozit'
              variant='outlined'
              style={{ width: '100%' }}
              error={!!formik.errors.depositCode}
              helperText={formik.errors.depositCode as string}
              required
            />,
            <Input
              type='text'
              value={formik.values.name}
              onChange={event =>
                formik.setFieldValue('name', (event.target as HTMLInputElement).value)
              }
              label='Nume'
              variant='outlined'
              style={{ width: '100%' }}
              error={!!formik.errors.name}
              helperText={formik.errors.name as string}
              required
            />,
            <Input
              type='select'
              value={formik.values.depositType}
              onChange={event =>
                formik.setFieldValue('depositType', (event.target as HTMLInputElement).value)
              }
              label='Tip depozit'
              variant='outlined'
              style={{ width: '100%' }}
              error={!!formik.errors.depositType}
              helperText={formik.errors.depositType as string}
              values={[
                {
                  value: 'AMBIENT',
                  label: 'AMBIENT'
                }
              ]}
              required
            />,
            <Input
              type='text'
              value={formik.values.address}
              onChange={event =>
                formik.setFieldValue('address', (event.target as HTMLInputElement).value)
              }
              label='Adresă'
              variant='outlined'
              style={{ width: '100%' }}
              error={!!formik.errors.address}
              helperText={formik.errors.address as string}
              required
            />,
            <Input
              type='text'
              value={formik.values.validityPercentage}
              onChange={event =>
                formik.setFieldValue('validityPercentage', (event.target as HTMLInputElement).value)
              }
              label='Procent valabilitate'
              variant='outlined'
              style={{ width: '100%' }}
              error={!!formik.errors.validityPercentage}
              helperText={formik.errors.validityPercentage as string}
              required
            />,
            <Input
              type='text'
              value={formik.values.emails}
              onChange={event =>
                formik.setFieldValue('emails', (event.target as HTMLInputElement).value)
              }
              label='Comunicare depozit (emails)'
              variant='outlined'
              style={{ width: '100%' }}
              error={!!formik.errors.emails}
              helperText={formik.errors.emails as string}
              required
            />,
            <Checkbox
              checked={formik.values.active}
              defaultChecked={formik.values.active}
              onChange={event =>
                formik.setFieldValue('active', (event.target as HTMLInputElement).value)
              }
              label='Activ'
              color={!!formik.errors.active ? 'primary' : 'secondary'}
            />
          ]}
          itemsPerRow={2}
        />
        <ModalFormActionButtons
          onCancel={() => closeModal()}
          onSubmit={() => formik.handleSubmit()}
        />
      </>
    </Modal>
  )
}

export default AdminDepositForm
