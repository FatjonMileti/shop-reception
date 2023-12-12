import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Paper, CircularProgress, Grid, useMediaQuery } from '@mui/material'
import { PdfViewer } from './PdfViewer'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import s from './ProformaView.modules.scss'
import { formatErrorMessage } from 'utils/formatting'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ShoppingCartStepper } from '../../core-ui/ShoppingCartStepper'
import { ShoppingCartSummary } from '../ShoppingCart'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'

const ProformaView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [proform, setProform] = useState(null)
  const isXs = useMediaQuery('(max-width:624px)')
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams, _] = useSearchParams()

  const { showNotification } = useNotification()

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
      return await makeCoreGetRequest(`/supply-omni/client/${searchParams.get('clientId')}`)
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la căutarea clientului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <Box sx={!isXs ? { margin: '24px' } : { margin: '12px' }}>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <ShoppingCartStepper activeStep={3} />
        </Grid>
        <Grid
          style={{ paddingTop: '16px', marginTop: 0, height: 'auto', paddingLeft: '30px' }}
          item
          xs={12}
          md={8}
        >
          <Paper sx={{ pt: 0, pb: 2, minHeight: '400px' }}>
            <Box sx={{ pt: 0, overflow: 'hidden' }}>
              {isLoading ? (
                <div style={{ display: 'flex' }}>
                  <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
                </div>
              ) : (
                <PdfViewer
                  proform={proform}
                  isLoading={isLoading}
                  actions={{
                    downloadAction: { url: '/supply-omni/order/proforma/pdf', type: 'GET' },
                    printAction: { url: '/supply-omni/order/proforma/print', type: 'POST' },
                    scanReceiptAction: { href: `/supplyOmni/scanReceipt?clientId=${searchParams.get('clientId')}`, label: 'Scaneaza bon' },
                    printersAction: { url: '/supply-omni/printer', type: 'GET' }
                  }}
                />
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {isLoadingGetProducts || isClientLoading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          ) : (
            <ShoppingCartSummary
              sx={{ pl: 2, pr: 2, mb: 3 }}
              order={products || {}}
              client={client || {}}
              deliveryPayment={
                proform
                  ? { paymentMethod: proform?.paymentMethod, deliveryType: proform?.deliveryType }
                  : {}
              }
            />
          )}
          {!proform?.paid && (
            <IconButton
              onClick={ev => navigate(`/supplyOmni/scanReceipt/${id}?clientId=${proform.clientId}`)}
              label={'Scaneaza bon'}
              variant="contained"
              sx={{ width: '100%' }}
              endIcon={<Icon iconName="QrCodeScannerOutlined" tiny={true} fill="white" />}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProformaView
