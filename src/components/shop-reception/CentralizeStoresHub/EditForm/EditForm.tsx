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
  editItem?: CentralizeStoresHub
}

const EditForm: React.FC<NewAdminDepositProps> = props => {
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
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={'Editează matrice magazin'}
      modalWidth="50%"
    >
      <Grid container spacing={4} justifyContent="flex-end">
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              {
                label: 'Magazine:',
                name: editItem?.store
              }
            ]}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.deposit}
            onChange={event =>
              formik.setFieldValue('deposit', (event.target as HTMLInputElement).value)
            }
            label="Depozite"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.deposit}
            helperText={formik.errors.deposit as string}
            values={[
              {
                value: "v2",
                label: "6 Selected"
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.hubs}
            onChange={event =>
              formik.setFieldValue('hubs', (event.target as HTMLInputElement).value)
            }
            label="Huburi"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.hubs}
            helperText={formik.errors.hubs as string}
            values={[
              {
                value: "hub",
                label: "hub"
              }
            ]}
            required
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

export default EditForm
