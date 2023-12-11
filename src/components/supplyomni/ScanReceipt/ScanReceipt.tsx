import s from './ScanReceipt.modules.scss'
import { ReceiptBarcodeScanner } from 'components/core-ui/ReceiptBarcodeScanner'
import { useState, useEffect } from 'react'

import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress
} from '@mui/material'
import { useQuery } from 'react-query'
import { ShoppingCartStepper } from '../../core-ui/ShoppingCartStepper'
import { ShoppingCartSummary } from '../ShoppingCart'
import { makeCoreGetRequest } from 'utils/api'

const ScanReceipt = () => {
  const [isLoading, setIsLoading] = useState(true)
  const isXs = useMediaQuery('(max-width:624px)')
  const { showNotification } = useNotification()
  const { id } = useParams()
  const [proform, setProform] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (id == undefined) return

      try {
        setIsLoading(true)
        const proformResult = await makeCoreGetRequest(`/supply-omni/order/proforma/${id}`)
        setProform(proformResult)
        setIsLoading(false)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [id])

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

  return (
    <Box sx={!isXs ? { margin: '24px' } : { margin: '12px' }}>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <ShoppingCartStepper activeStep={4} />
        </Grid>
        <Grid
          style={{ paddingTop: '16px', marginTop: 0, height: 'auto', paddingLeft: '30px' }}
          item
          xs={12}
          md={8}
        >
          <Paper sx={{ pt: 0, pb: 2, minHeight: '400px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 3, pr: 3, pt: 3 }}>
              <Typography fontWeight={600}>Verificare bon</Typography>
            </Box>
            <Divider sx={{ margin: '16px 24px' }} />
            <Box sx={{ pl: 3, pr: 3, pb: 3 }}>
              <ReceiptBarcodeScanner
                action={{
                  url: `/supply-omni/order/confirmation`,
                  type: 'PUT',
                  href: 'receiptInvoiceFinalized',
                  variable: 'orderId'
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {isClientLoading || isLoadingGetProducts || isLoading ? (
            <CircularProgress color="primary" disableShrink style={{ marginRight: '16px' }} />
          ) : (
            <ShoppingCartSummary
              sx={{ pl: 2, pr: 2 }}
              client={client || {}}
              order={products || {}}
              deliveryPayment={
                proform
                  ? { paymentMethod: proform?.paymentMethod, deliveryType: proform?.deliveryType }
                  : {}
              }
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ScanReceipt
