import { Button, Divider, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotification } from 'hooks'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { Grid, Paper } from '@mui/material'
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { URLS } from 'components/shop-reception/mobile/constants'
import { useState } from 'react'

const DeliveryCompleteScanStep1 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const { truckId, ticketId } = location.state

  const [supportCode, setSupportCode] = useState('')

  const { data: ticketSummary, isLoading: isLoadingTicketSummary } = useQuery(
    ['ticket-summary'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/integral/ticket/summary/${truckId}/${ticketId}`, null)
      return response || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const {
    data: scanCode,
    isLoading: isLoadingScanCode,
    refetch: refetchScanCode
  } = useQuery(
    ['truck'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/integral/support/scan/${supportCode}?truckId=${truckId}&ticketId=${ticketId}`, null)
      return response || []
    },
    {
      onSuccess: data => {
        if (data.errorMessage === null) {
          navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_2, {
            state: { truckId, ticketId, supportCode, data: data }
          })
        } else {
          showNotification({
            message: `${data.errorMessage}`,
            type: 'error'
          })
        }
      },
      onError: error => {
        showNotification({
          message: `A aparut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid item xs={10}>
        <TitleHeader title="VALIDARE LIVRARE SCANARE INTEGRALǍ" />
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            SCANARE INTEGRALA
          </Typography>
          <Typography variant="medium" component="p">
            Numar inmatriculare: {ticketSummary?.truckNumber}
          </Typography>
          <Typography variant="medium" component="p">
            BL: {ticketSummary?.ticketNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Suporti verificati: {ticketSummary?.supportCounter}/{ticketSummary?.totalSupportNumber}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={10}>
        <Input
          type="search"
          variant="outlined"
          label="Cod suport"
          autoFocus
          value={supportCode}
          onChange={e => {
            const target = e.target as HTMLInputElement
            setSupportCode(target.value)
          }}
          onSearchIconClick={() => {
            refetchScanCode()
          }}
          width="100%"
        />
      </Grid>

      <Grid item xs={10}>
        <Divider>SAU</Divider>
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Scaneaza suport"
          onClick={() => () => {}}
          style={{ width: '100%' }}
        />
      </Grid>

      <Grid xs={10} mt={4} item>
        <Button
          variant="contained"
          label="Finalizeaza BL"
          onClick={() => () => {}}
          style={{ width: '100%' }}
          disabled
        />
      </Grid>
      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Sumar BL"
          onClick={() => () => {}}
          style={{ width: '100%' }}
        />
      </Grid>
    </Grid>
  )
}
export default DeliveryCompleteScanStep1
