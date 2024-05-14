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

const EditBalancePackage = ({ isModalOpen, closeModal, editItem, setShouldRefreshData }) => {
  const { showNotification } = useNotification()

  const mutateStock = async values =>
    await makeCorePostRequest(`/shop-reception/support-stocks/${editItem.id}`, values)

  const { isLoading, mutate } = useMutation(mutateStock, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
      showNotification({
        message: 'Soldul a fost actualizat cu succes.',
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la actualizarea soldului', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      stock: editItem?.stock
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Actualizare sold">
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              editItem?.shopName && { label: 'Magazin:', name: editItem?.shopName },
              editItem?.hubName && { label: 'HUB:', name: editItem?.hubName },
              { label: 'Tip suport:', name: editItem?.supportType }
            ]}
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="number"
            name="stock"
            label="Sold"
            fullWidth
            variant="outlined"
            value={formik.values.stock}
            onChange={event => formik.setFieldValue('stock', event.currentTarget.value)}
            error={!!formik.errors.stock}
            helperText={formik.errors.stock as string}
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

export default EditBalancePackage
