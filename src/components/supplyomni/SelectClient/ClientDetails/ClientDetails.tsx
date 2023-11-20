import { Box, CircularProgress, Divider, Grid, Paper, Typography } from '@mui/material'
import s from './ClientDetails.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useParams } from 'react-router-dom'
import { ClientData } from './ClientData'
import { PaymentMethod } from './PaymentMethod'

const ClientDetails: React.FC = props => {
  const { showNotification } = useNotification()
  const { id } = useParams()

  const { data: client, isLoading: isClientLoading } = useQuery(
    ['client-info'],
    async () => {
      return await makeCoreGetRequest(`/supply-omni/client/${id}`)
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la căutarea produsului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )
  return (
    <div className={s.mainContainer}>
      {isClientLoading ? (
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      ) : (
        <Grid container spacing={4}>
          <ClientData client={client} />
          <PaymentMethod clientId={client.id} />
        </Grid>
      )}
    </div>
  )
}

export default ClientDetails
