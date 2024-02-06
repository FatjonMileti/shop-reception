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
import { toPayload } from './serializers'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: AdminRegion
}

const AdminRegionForm: React.FC<NewAdminDepositProps> = props => {
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
      modalTitle={isEdit ? 'Editează regiune' : 'Adaugă regiune'}
      modalWidth="50%"
    >
      <Grid container spacing={4} justifyContent="flex-end">
        <Grid xs={12} item>
          {isEdit ? (
            <FormInfoItems
              items={[
                {
                  label: 'Denumire:',
                  name: editItem?.name
                }
              ]}
            />
          ) : null}
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.regionCode}
            onChange={event =>
              formik.setFieldValue('regionCode', (event.target as HTMLInputElement).value)
            }
            label="Cod regiune"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.regionCode}
            helperText={formik.errors.regionCode as string}
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
            label="Denumire"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.regionManager}
            onChange={event =>
              formik.setFieldValue('regionManager', (event.target as HTMLInputElement).value)
            }
            label="Responsabil regiune"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.regionManager}
            helperText={formik.errors.regionManager as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.store?.value}
            onChange={event =>
              formik.setFieldValue('store', (event.target as HTMLInputElement).value)
            }
            label="Magazin"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.store}
            helperText={formik.errors.store as string}
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
        <Grid xs={12} md={6} item />
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

export default AdminRegionForm
