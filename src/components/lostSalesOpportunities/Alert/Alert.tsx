import { CircularProgress, Grid, Typography } from '@mui/material'
import s from './Alert.modules.scss'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { InfoBox } from 'components/core-ui/InfoBox'
import { useEffect, useMemo, useState } from 'react'
import { AlertDateInfo } from '../common/AlertDateInfo'
import { useParams } from 'react-router-dom'
import { getAlertDetails, getFeedbackReasonsOptions } from '../api'
import { useNotification } from 'hooks'
import { getInfoItems } from './helpers'
import { AlertForm } from './AlertForm'

const Alert = () => {
  const { id } = useParams()

  const { showNotification } = useNotification()

  const { data: alert, isLoading: isAlertLoading } = getAlertDetails(id, showNotification)
  const { data: feedbackReasonsOptions, isLoading: isFeebackReasonsOptionsLoading } =
    getFeedbackReasonsOptions(showNotification)

  const infoItems = useMemo(() => (alert ? getInfoItems(alert) : []), [alert])

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
            <AlertDateInfo validHour={alert?.validHour} />
          </Grid>

          <Grid item mb={2}>
            <FormInfoItems items={infoItems} />
          </Grid>

          <Grid item mb={1}>
            <InfoBox
              title={'Feedback'}
              content={<AlertForm feedbackReasonsOptions={feedbackReasonsOptions} />}
            />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Alert
