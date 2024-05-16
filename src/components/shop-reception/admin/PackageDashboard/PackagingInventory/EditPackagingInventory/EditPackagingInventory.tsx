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
import { FileUpload } from 'components/core-ui/FileUpload'
import { ChangeEvent } from 'react'
import { toBlobFormDataPayload, toFormDataPayload } from 'utils/serializers'

const EditPackagingInventory = ({ isModalOpen, closeModal, editItem, setShouldRefreshData }) => {
  const { showNotification } = useNotification()

  const uploadImage = async (values: any) => {
    await makeCorePostRequest(
      `/shop-reception/support-inventories/inventory/${editItem.id}`,
      values,
      {
        headers: {
          'Content-Type': 'multipart/form-data' // Ensure correct content type
          // 'Content-Type': 'application/json'
        }
      }
    )
  }

  const { isLoading, mutate } = useMutation(uploadImage, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
      showNotification({
        message: 'Inventarul a fost actualizat cu succes.',
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la actualizarea inventarului.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      intact: editItem?.intactNumber,
      defect: editItem?.brokenNumber,
      file: null
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const payload = toBlobFormDataPayload(values)
      // const payload = toFormDataPayload(values)
      mutate(payload)
      formik.resetForm()
    }
  })

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    formik.setFieldValue('file', file)
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Actualizare inventar">
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
            name="intact"
            label="Calitativ"
            fullWidth
            variant="outlined"
            value={formik.values.intact}
            onChange={event => formik.setFieldValue('intact', event.currentTarget.value)}
            error={!!formik.errors.intact}
            helperText={formik.errors.intact as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="number"
            name="defect"
            label="Defect"
            fullWidth
            variant="outlined"
            value={formik.values.defect}
            onChange={event => formik.setFieldValue('defect', event.currentTarget.value)}
            error={!!formik.errors.defect}
            helperText={formik.errors.defect as string}
            required
          />
        </Grid>
        {formik.values.defect !== editItem?.brokenNumber && (
          <Grid item xs={12}>
            <div style={{ width: '300px' }}>
              <FileUpload
                value={null}
                fileInputProps={{
                  displayImage: ''
                }}
                onChange={onFileUpload}
              />
            </div>
          </Grid>
        )}
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditPackagingInventory
