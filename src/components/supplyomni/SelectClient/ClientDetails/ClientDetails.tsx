import { Box, CircularProgress, Divider, Grid, Paper, Typography, useMediaQuery } from '@mui/material'
import s from './ClientDetails.modules.scss'
// import { useQuery } from 'react-query'
// import { makeCoreGetRequest } from 'utils/api'
// import { useNotification } from 'hooks'
// import { formatErrorMessage } from 'utils/formatting'
import { Tabs } from 'components/core-ui/Tabs'
import { useParams } from 'react-router-dom'
import { ClientData } from './ClientData'
import { PaymentMethod } from './PaymentMethod'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { ShoppingCartStepper } from '../../../core-ui/ShoppingCartStepper'
import { ShoppingCartSummary } from '../../ShoppingCart'
import { useNotification } from 'hooks'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'

const ClientDetails: React.FC = props => {
  const { showNotification } = useNotification()
  const isXs = useMediaQuery('(max-width:624px)');
  const { id } = useParams()

  const { data: products, isLoading: isLoadingGetProducts } = useQuery(
    ['cart-products'],
    async () => {
      const response = await makeCoreGetRequest(`/supply-omni/cart/product`)

      return response
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea listei de produse. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

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

  return  <Box sx={!isXs ? {margin: '24px'} : {margin: '12px'}}>
                  <Grid sx={{mt:1}} container spacing={2}>
                    <Grid item xs={12}>
                        <ShoppingCartStepper activeStep={2} />
                    </Grid>
                    <Grid style={{paddingTop:'16px', marginTop:0, height:'auto', paddingLeft:'30px'}} item xs={12} md={8} >
                        <Paper sx={{pt:0, pb:2, minHeight:'400px'}}>
                          <Box sx={{pl:3, pr:3, pt:0}}>
                          {!isClientLoading ?
                            <PaymentMethod clientId={client?.id || undefined} />
                            :
                            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
                          }
                          </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <ShoppingCartSummary sx={{pl:2, pr:2}} client={client || {}} order={products || {}} />
                    </Grid>
                </Grid>
              </Box>

  
}

export default ClientDetails
