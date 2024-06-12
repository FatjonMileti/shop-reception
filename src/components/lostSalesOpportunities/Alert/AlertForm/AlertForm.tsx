import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useFormik } from 'formik'
import { validationSchema } from './helpers'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { handleQueryError } from 'utils/helpers'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { PhotoItem } from './PhotoItem'
import { AlertFormProps } from 'components/lostSalesOpportunities/interfaces'
import { PhotoButtons } from './PhotoButtons'
import { toAlertPayload } from './serializers'

const AlertForm: React.FC<AlertFormProps> = props => {
  const { feedbackReasonsOptions } = props

  const [isPictureChanged, setIsPictureChanged] = useState(false)
  const [showPhotoCapture, setShowPhotoCapture] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPictureChanged) {
        event.preventDefault()
        event.returnValue =
          'Aveti schimbari nesalvate. Sunteti sigur ca vreti sa iesiti din pagina?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isPictureChanged])

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const sendFeedbackReason = async values => {
    await makeCorePostRequest('/lso/alerts-feedback', values)
  }

  const { isLoading, mutate } = useMutation(sendFeedbackReason, {
    onSuccess: res => {
      showNotification({
        message: 'Feedback-ul a fost trimis cu succes.',
        type: 'success'
      })
      formik.resetForm()
      navigate('/lostSalesOpportunities/alerts')
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la trimiterea feedback-ului.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      feedbackReason: '',
      comment: '',
      photo: null
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const postValues = await toAlertPayload(values, id)
      mutate(postValues)
    }
  })

  console.log(formik)

  return (
    <>
      <AsyncAutocomplete
        variant="outlined"
        name="feedbackReasonId"
        label="Motiv predefinit"
        options={feedbackReasonsOptions}
        onChange={value => formik.setFieldValue('feedbackReason', value)}
        value={formik.values.feedbackReason}
        error={!!formik.errors.feedbackReason}
        helperText={formik.errors.feedbackReason as string}
        required
        style={{ marginBottom: '16px' }}
      />
      <Input
        type="textarea"
        name="comment"
        label="Descriere"
        variant="outlined"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          formik.setFieldValue('comment', event.target.value)
        }
        value={formik.values.comment}
        style={{ width: '100%', marginBottom: '16px' }}
        error={!!formik.errors.comment}
        helperText={formik.errors.comment as string}
        rows={3}
      />
      {showPhotoCapture ? (
        <PhotoItem
          photo={formik.values.photo}
          setPhotoValue={value => formik.setFieldValue('photo', value)}
          setIsPictureChanged={setIsPictureChanged}
          errors={formik.errors}
          setShowPhotoCapture={setShowPhotoCapture}
        />
      ) : (
        <PhotoButtons
          setShowPhotoCapture={setShowPhotoCapture}
          setPhoto={file => formik.setFieldValue('photo', file)}
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
      </Box>
    </>
  )
}

export default AlertForm
