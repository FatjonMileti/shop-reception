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
  editItem?: ScanType
}

const ScanTypeForm: React.FC<NewAdminDepositProps> = props => {
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
      modalTitle={isEdit ? 'Editează regulă de scanare' : 'Adăugare regulă de scanare'}
      modalWidth="50%"
    >
      <Grid container spacing={4} justifyContent="flex-end">
        <Grid xs={12} item>
          {isEdit ? (
            <FormInfoItems
              items={[
                {
                  label: 'Magazine:',
                  name: editItem?.storeName
                }
              ]}
            />
          ) : null}
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.region?.value}
            onChange={event =>
              formik.setFieldValue('region', (event.target as HTMLInputElement).value)
            }
            label="Tip regulă"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.region}
            helperText={formik.errors.region as string}
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
            type="select"
            value={formik.values.scanType?.value}
            onChange={event =>
              formik.setFieldValue('scanType', (event.target as HTMLInputElement).value)
            }
            label="Tip scanare"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.scanType}
            helperText={formik.errors.scanType as string}
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
            value={formik.values.startDate}
            onChange={event =>
              formik.setFieldValue('startDate', (event.target as HTMLInputElement).value)
            }
            label="Dată start"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.startDate}
            helperText={formik.errors.startDate as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.lastDate}
            onChange={event =>
              formik.setFieldValue('lastDate', (event.target as HTMLInputElement).value)
            }
            label="Dată start"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.lastDate}
            helperText={formik.errors.lastDate as string}
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

export default ScanTypeForm
