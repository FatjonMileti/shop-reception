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
  editItem?: AdminStore
}

const AdminStoreForm: React.FC<NewAdminDepositProps> = props => {
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
      modalTitle={isEdit ? 'Editează magazin' : 'Adaugă magazin'}
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
          <Input
            type="select"
            value={formik.values.METIVersion}
            onChange={event =>
              formik.setFieldValue('METIVersion', (event.target as HTMLInputElement).value)
            }
            label="Versiune METI"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.METIVersion}
            helperText={formik.errors.METIVersion as string}
            values={[
              {
                value: "v2",
                label: "V2"
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.adCode}
            onChange={event =>
              formik.setFieldValue('adCode', (event.target as HTMLInputElement).value)
            }
            label="Cod AD"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.adCode}
            helperText={formik.errors.adCode as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.grams}
            onChange={event =>
              formik.setFieldValue('grams', (event.target as HTMLInputElement).value)
            }
            label="Abatere recepţie produse (grame)"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.grams}
            helperText={formik.errors.grams as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.ip}
            onChange={event =>
              formik.setFieldValue('ip', (event.target as HTMLInputElement).value)
            }
            label="IP SFTP"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.ip}
            helperText={formik.errors.ip as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.way}
            onChange={event =>
              formik.setFieldValue('way', (event.target as HTMLInputElement).value)
            }
            label="Cale SFTP"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.way}
            helperText={formik.errors.way as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Checkbox
            checked={formik.values.quantities}
            defaultChecked={formik.values.quantities}
            onChange={event =>
              formik.setFieldValue('quantities', (event.target as HTMLInputElement).value)
            }
            label="Permite editare cantităţi recepţionate"
            color={!!formik.errors.active ? 'primary' : 'secondary'}
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

export default AdminStoreForm
