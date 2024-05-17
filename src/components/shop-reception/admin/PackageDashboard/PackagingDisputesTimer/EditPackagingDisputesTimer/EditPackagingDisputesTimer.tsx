import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { validationSchema } from './helpers'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { handleQueryError } from 'utils/helpers'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { makeCorePostRequest } from 'utils/api'

const EditPackagingDisputesTimer = ({
  isModalOpen,
  closeModal,
  editItem,
  setShouldRefreshData
}) => {
  const { showNotification } = useNotification()

  const mutateTimer = async values =>
    await makeCorePostRequest(
      `/shop-reception/returnLitigationTimer/details/${editItem.id}`,
      values
    )

  const { isLoading, mutate } = useMutation(mutateTimer, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
      showNotification({
        message: 'Timerul a fost actualizat cu succes.',
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la actualizarea timerului.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      timerValue: editItem?.timerValue
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate({
        id: editItem?.id,
        timerValue: +values.timerValue,
        timerType: editItem?.timerType,
        timerDescription: editItem?.timerDescription
      })
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={`Editeaza timer ${editItem?.timerTypeValue} (${editItem?.timerValue})`}
      modalWidth="50%"
    >
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Tip timer:', name: editItem?.timerTypeValue },
              { label: 'Descrirere timer:', name: editItem?.timerDescription }
            ]}
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="number"
            name="timerValue"
            label="Valoare timer"
            fullWidth
            variant="outlined"
            value={formik.values.timerValue}
            onChange={event => formik.setFieldValue('timerValue', event.currentTarget.value)}
            error={!!formik.errors.timerValue}
            helperText={formik.errors.timerValue as string}
            required
          />
        </Grid>
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditPackagingDisputesTimer
