import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useFormik } from 'formik'
import { validationSchema } from './helpers'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { useNavigate } from 'react-router-dom'
import { handleQueryError } from 'utils/helpers'
import { Button, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import ImageIcon from '@mui/icons-material/Image'
import { PhotoItem } from './PhotoItem'
import { AlertFormProps } from 'components/lostSalesOpportunities/interfaces'

const AlertForm: React.FC<AlertFormProps> = props => {
  const { feedbackReasonsOptions } = props

  const [isPictureChanged, setIsPictureChanged] = useState(false)
  const [showPhotoCapture, setShowPhotoCapture] = useState(false)

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
    await makeCorePostRequest('/lso/alerts-feedback/', values)
  }

  const { isLoading, mutate } = useMutation(sendFeedbackReason, {
    onSuccess: res => {
      showNotification({
        message: 'Feedback-ul a fost trimis cu succes.',
        type: 'success'
      })
      navigate('/lostSalesOpportunities/alerts')
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la trimiterea feedback-ului.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      feedbackReasonId: '',
      comment: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(values)
      formik.resetForm()
    }
  })

  return (
    <>
      <AsyncAutocomplete
        variant="outlined"
        name="feedbackReasonId"
        label="Motiv predefinit"
        options={feedbackReasonsOptions}
        onChange={value => formik.setFieldValue('feedbackReasonId', value)}
        value={formik.values.feedbackReasonId}
        error={!!formik.errors.feedbackReasonId}
        helperText={formik.errors.feedbackReasonId as string}
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
          errors={formik.errors.photo}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <IconButton
            label="Incarca foto"
            onClick={() => setShowPhotoCapture(true)}
            startIcon={<ImageIcon />}
            variant="outlined"
            sx={{ marginBottom: '16px' }}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" label="Salveaza" onClick={() => {}} />
      </Box>
    </>
  )
}

export default AlertForm
