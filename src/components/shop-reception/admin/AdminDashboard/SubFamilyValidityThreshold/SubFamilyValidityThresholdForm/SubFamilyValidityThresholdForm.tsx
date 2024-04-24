import { useMemo } from 'react'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { Grid } from '@mui/material'
import { useMutation } from 'react-query'
import { makeCorePutRequest } from 'utils/api'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItem: SubFamilyValidityThreshold
}

const SubFamilyValidityThresholdForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const updateSubfamilyValidity = async (values: any) => {
    await makeCorePutRequest(`/shop-reception/validity-limit/${editItem?.sfaCode}`, values)
  }

  const { isLoading, mutate } = useMutation(updateSubfamilyValidity, {
    onSuccess: res => {
      showNotification({
        message: `Datele au fost modificate cu succes.`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la modificarea datelor. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(values)
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={'Editare prag valabilitate'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            type="text"
            value={editItem?.sfaCode}
            label="Cod subfamilie"
            variant="outlined"
            style={{ width: '100%' }}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            type="text"
            value={editItem?.sfaName}
            label="Subfamilie"
            variant="outlined"
            style={{ width: '100%' }}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            type="text"
            value={editItem?.famCode}
            label="Cod familie"
            variant="outlined"
            style={{ width: '100%' }}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            type="text"
            value={editItem?.famName}
            label="Familie"
            variant="outlined"
            style={{ width: '100%' }}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            type="text"
            value={editItem?.rayCode}
            label="Cod raion"
            variant="outlined"
            style={{ width: '100%' }}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            type="text"
            value={editItem?.rayName}
            label="Raion"
            variant="outlined"
            style={{ width: '100%' }}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            type="number"
            value={formik.values.validityLimit}
            onChange={event =>
              formik.setFieldValue('validityLimit', (event.target as HTMLInputElement).value)
            }
            label="Prag valabilitate"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.validityLimit}
            helperText={formik.errors.validityLimit as string}
            required
          />

          <Grid item xs={12} mt={2} container justifyContent="space-between">
            <Grid>
              <Button
                size="large"
                variant="outlined"
                label="Anuleaza"
                onClick={() => closeModal()}
              />
            </Grid>

            <Grid>
              <Button
                size="large"
                variant="contained"
                label="Salveaza"
                onClick={() => formik.handleSubmit()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default SubFamilyValidityThresholdForm
