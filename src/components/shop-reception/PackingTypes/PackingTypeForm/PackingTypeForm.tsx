import { useMemo } from 'react'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
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
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editează tip ambalaj' : 'Adaugă tip ambalaj'}
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
            value={formik.values.packagingCode}
            onChange={event =>
              formik.setFieldValue('packagingCode', (event.target as HTMLInputElement).value)
            }
            label="Cod ambalaj"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.packagingCode}
            helperText={formik.errors.packagingCode as string}
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
            type="select"
            value={formik.values.main}
            onChange={event =>
              formik.setFieldValue('main', (event.target as HTMLInputElement).value)
            }
            label="Principal/secundar"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.main}
            helperText={formik.errors.main as string}
            values={[]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.generatedBarcode}
            onChange={event =>
              formik.setFieldValue('generatedBarcode', (event.target as HTMLInputElement).value)
            }
            label="Cod de bare"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.generatedBarcode}
            helperText={formik.errors.generatedBarcode as string}
            values={[]}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formik.values.active}
            onChange={event => formik.setFieldValue('active', (event.target as HTMLInputElement).checked)}
            label='Activ'
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formik.values.return}
            onChange={event => formik.setFieldValue('return', (event.target as HTMLInputElement).checked)}
            label='Returnabil'
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formik.values.combination}
            onChange={event => formik.setFieldValue('combination', (event.target as HTMLInputElement).checked)}
            label='Combinaţie'
          />
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

export default PackingTypeForm
