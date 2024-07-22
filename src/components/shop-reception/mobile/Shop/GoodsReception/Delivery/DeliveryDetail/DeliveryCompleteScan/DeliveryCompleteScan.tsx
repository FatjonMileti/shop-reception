import { useLocation, useNavigate } from 'react-router-dom'
import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from 'components/shop-reception/mobile/constants'
import { useState } from "react";

const DeliveryCompleteScan = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const [hasTickets, setHasTickets] = useState(false)

  const truckId = location.state?.id

  const { data: truck, isLoading: isLoadingTruck } = useQuery(
    ['truck'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/integral/truck/delivery-tickets/${truckId}`, null)

      const ticketsAvailable = response.deliveryTicketList.some(dt => dt.validated !== true);
      setHasTickets(ticketsAvailable)

      if (!ticketsAvailable)  navigate(URLS.AUTH_DELIVERY_DETAIL, { state: truckId })

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

  if (isLoadingTruck) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink/>;
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid item xs={10} my={2}>
        <TitleHeader title="VALIDARE LIVRARE SCANARE INTEGRALǍ" />
      </Grid>

      <Grid item xs={10}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            SCANARE INTEGRALA
          </Typography>
          <Typography variant="medium" component="p">
            Numar inmatriculare: {truck?.truckNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Suporti verificati: {truck?.supportCounter}/{truck?.totalSupportNumber}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={10}>
        {hasTickets && truck?.deliveryTicketList?.map((ticket) => (
          <Button
            key={ticket.externalTicketId}
            variant="outlined"
            onClick={() =>
              navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_1, {
                state: { truckId, ticketId: ticket.id }
              })
            }
            style={{ width: '100%' }}
           label=''
          >
            {`BL: ${ticket.externalTicketId}`}
          </Button>
        ))}
      </Grid>
    </Grid>
  )
}

export default DeliveryCompleteScan
