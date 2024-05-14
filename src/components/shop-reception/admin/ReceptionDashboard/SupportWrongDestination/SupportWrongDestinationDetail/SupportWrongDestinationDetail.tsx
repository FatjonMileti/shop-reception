import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { FileUpload } from '../../../../../core-ui/FileUpload'
import { ChangeEvent } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toFormDataPayload } from 'utils/serializers'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import s from '../../../../commonStyles.modules.scss'
import { useParams } from 'react-router'
import { Grid } from '@mui/material'

const SupportWrongDestinationDetail = () => {
  const { showNotification } = useNotification()
  const { id } = useParams()

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    formik.setFieldValue('file', file)
  }

  const updateDetails = async (values: any) => {
    await makeCorePostRequest(`/shop-reception/wrongDestination/form/${id}`, values)
  }

  const { isLoading, mutate } = useMutation(updateDetails, {
    onSuccess: res => {
      showNotification({
        message: `Modificarile au fost salvate cu succes.`,
        type: 'success'
      })
      formik.resetForm()
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la salvarea datelor. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      comment: null,
      file: null
    },
    validationSchema: Yup.object().shape({
      comment: Yup.string().required(),
      file: Yup.mixed().required()
    }),
    onSubmit: async (values: any) => {
      const payload = toFormDataPayload(values)
      mutate(payload)
    }
  })

  return (
    <div className={s.mainContainer}>
      <Grid container display="flex" flexDirection={'column'} pt={2}>
        <Input
          type="textarea"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            formik.setFieldValue('comment', e.target.value)
          }
          label="Comentariu"
          variant="outlined"
          style={{ width: '100%' }}
          value={formik.values.comment}
          rows={2}
        />
        <Grid item>
          <FileUpload
            value={null}
            fileInputProps={{
              displayImage: ''
            }}
            onChange={onFileUpload}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            type="submit"
            label="Salvează"
            onClick={() => formik.handleSubmit()}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default SupportWrongDestinationDetail
