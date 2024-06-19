import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid, Paper } from '@mui/material'
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { URLS } from 'components/shop-reception/mobile/constants'
import { useNotification } from 'hooks'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'

const DeliverySensitiveProducts = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const location = useLocation()

  const { id: truckId, truck } = location.state

  const { data: supports, isLoading } = useQuery(
    ['supports-truckId'],
    async () => {
      const result = await makeCoreGetRequest(
        `/shop-reception-mobile/sensitive/supports/${truckId}`
      )

      return result || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea datelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid container justifyContent={'center'} rowSpacing={2}>
      <Grid item xs={10}>
        <TitleHeader title="" />
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            PRODUSE SENSIBILE
          </Typography>
          <Typography variant="medium" component="p">
            Numar inmatriculare: {truck?.truckNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Suporti verificati: {truck?.supportCounter}/{truck?.totalSupportNumber}
          </Typography>
        </Paper>
      </Grid>

      {supports.map(support => (
        <Grid
          item
          xs={10}
          mb={2}
          onClick={() =>
            navigate(URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS_CONFIRM, {
              state: { truck, support }
            })
          }
        >
          <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
            <Typography variant="medium" component="h5">
              Eticheta suport:
            </Typography>
            <Typography variant="medium" component="p">
              {support?.supportCode}
            </Typography>
            <Typography variant="medium" component="p">
              Numar suport: {support?.supportNumber}
            </Typography>
            <Typography variant="medium" component="p">
              BL: {support?.supportNumber}
            </Typography>
            <Typography variant="medium" component="p">
              {support?.arrivalDate}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default DeliverySensitiveProducts
