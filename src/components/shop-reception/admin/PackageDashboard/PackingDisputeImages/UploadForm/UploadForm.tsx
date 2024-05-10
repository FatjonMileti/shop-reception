import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { useFormik } from 'formik'
import { ChangeEvent } from 'react'
import { validationSchema } from './helpers'
import { toFormDataPayload } from 'utils/serializers'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { FileUpload } from 'components/core-ui/FileUpload'

const UploadForm = ({ id, refetchImages, uploadModel }) => {
  const { showNotification } = useNotification()

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    formik.setFieldValue('file', file)
  }

  const uploadImage = async (values: any) => {
    await makeCorePostRequest(
      `/shop-reception/return-litigation/details/supports/${id}/images`,
      values
    )
  }

  const { mutate } = useMutation(uploadImage, {
    onSuccess: res => {
      showNotification({
        message: 'Imagine adaugata cu succes',
        type: 'success'
      })
      refetchImages()
    },
    onError: res => {
      showNotification({
        message: `Error while trying to update destination, ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      comment: uploadModel.comment,
      file: null
    },
    validationSchema,
    onSubmit: async (values: any) => {
      const payload = toFormDataPayload(values)
      mutate(payload)
      formik.resetForm()
    }
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Input
          type="textarea"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            formik.setFieldValue('comment', e.target.value)
          }
          label="Comentariu"
          variant="outlined"
          style={{ width: '70%' }}
          value={formik.values.comment}
          rows={2}
        />
      </Grid>
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

      <Grid item xs={12}>
        <Button
          variant="contained"
          type="submit"
          label="Salvează"
          onClick={() => formik.handleSubmit()}
        />
      </Grid>
    </Grid>
  )
}

export default UploadForm
