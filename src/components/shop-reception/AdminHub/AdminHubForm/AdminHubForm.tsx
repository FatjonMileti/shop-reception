import { useMemo } from 'react'
import { Button, Input, Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toAdminDepositPayload } from './serializers'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: AdminHub
}

const AdminHubForm: React.FC<NewAdminDepositProps> = props => {
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
        const payload = toAdminDepositPayload(formik.values)

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
      modalTitle={isEdit ? 'Editează hub' : 'Adaugă hub'}
      modalWidth="50%"
    >
      <Grid container spacing={4} justifyContent="flex-end">
        <Grid xs={12} item>
          {isEdit ? (
            <FormInfoItems
              items={[
                {
                  label: 'Nume:',
                  name: editItem?.name
                }
              ]}
            />
          ) : null}
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.hubCode}
            onChange={event =>
              formik.setFieldValue('hubCode', (event.target as HTMLInputElement).value)
            }
            label="Cod HUB"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.hubCode}
            helperText={formik.errors.hubCode as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
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
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.hubType}
            onChange={event =>
              formik.setFieldValue('hubType', (event.target as HTMLInputElement).value)
            }
            label="Tip HUB"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.hubType}
            helperText={formik.errors.hubType as string}
            values={[
              {
                value: "AMBIENT",
                label: "AMBIENT"
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.address}
            onChange={event =>
              formik.setFieldValue('address', (event.target as HTMLInputElement).value)
            }
            label="Adresă"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.address}
            helperText={formik.errors.address as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.users?.value}
            onChange={event =>
              formik.setFieldValue('users', (event.target as HTMLInputElement).value)
            }
            label="Utilizatori asignaţi pe hub"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.users}
            helperText={formik.errors.users as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Checkbox
            checked={formik.values.active}
            defaultChecked={formik.values.active}
            onChange={event =>
              formik.setFieldValue('active', (event.target as HTMLInputElement).value)
            }
            label="Activ"
            color={!!formik.errors.active ? 'primary' : 'secondary'}
          />
        </Grid>
        <Grid xs={12} md={6} item>
        </Grid>
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button
            variant="contained"
            type="submit"
            label="Submit"
            onClick={() => formik.handleSubmit()}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AdminHubForm
