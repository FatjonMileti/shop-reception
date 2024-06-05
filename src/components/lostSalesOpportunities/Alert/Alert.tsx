import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { Icon_v2 } from 'components/core-ui/Icon_v2'
import s from './Alert.modules.scss'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { InfoBox } from 'components/core-ui/InfoBox'
import { Button, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { ChangeEvent, useMemo } from 'react'
import { AlertDateInfo } from '../common/AlertDateInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { getAlertDetails, getFeedbackReasonsOptions } from '../api'
import { useNotification } from 'hooks'
import { getInfoItems, validationSchema } from './helpers'
import { useFormik } from 'formik'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useMutation } from 'react-query'
import { makeCorePostRequest } from 'utils/api'
import { handleQueryError } from 'utils/helpers'

const Alert = () => {
  const { id } = useParams()

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const { data: alert, isLoading: isAlertLoading } = getAlertDetails(id, showNotification)
  const { data: feedbackReasonsOptions, isLoading: isFeebackReasonsOptionsLoading } =
    getFeedbackReasonsOptions(showNotification)

  const infoItems = useMemo(() => (alert ? getInfoItems(alert) : []), [alert])

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
    <div className={s.mainContainer}>
      {isAlertLoading || isFeebackReasonsOptionsLoading ? (
        <div style={{ display: 'flex' }}>
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        </div>
      ) : (
        <Grid container flexDirection="column">
          <Grid item mb={1}>
            <Typography className={s.productName} fontWeight={700}>
              {alert?.articleName}
            </Typography>
          </Grid>

          <Grid item mb={2}>
            <AlertDateInfo validHour={alert?.interval} />
          </Grid>

          <Grid item mb={2}>
            <FormInfoItems items={infoItems} />
          </Grid>

          <Grid item mb={1}>
            <InfoBox
              title={'Feedback'}
              content={
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
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <IconButton
                      label="Incarca foto"
                      onClick={() => {}}
                      startIcon={<Icon_v2 iconName="Date" iconType="Icon" />}
                      variant="outlined"
                      size="large"
                      sx={{ marginBottom: '16px' }}
                    />
                    <Button variant="contained" label="Salveaza" onClick={() => {}} />
                  </Box>
                </>
              }
            />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Alert
