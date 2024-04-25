import { Paper, Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShoppingCartStepper } from '../../core-ui/ShoppingCartStepper'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const ReceiptInvoiceFinalized: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const clientId = searchParams.get('clientId')
  const orderId = searchParams.get('orderId')
  const isXs = useMediaQuery('(max-width:624px)')
  const isXXs = useMediaQuery('(max-width:450px)')

  // TODO: Move styles external
  return (
    <Box sx={!isXs ? { margin: '24px' } : { margin: '12px' }}>
      <Grid sx={{ mt: 1 }} container spacing={5}>
        <Grid item xs={12} style={{ paddingTop: '16px', paddingBottom: '0' }}>
          <ShoppingCartStepper activeStep={6} />
        </Grid>
        <Grid
          style={{
            paddingTop: '0',
            marginTop: 0,
            height: 'auto',
            paddingLeft: '60px',
            paddingRight: '24px'
          }}
          item
          xs={12}
        >
          <Paper sx={{ pt: 0, pb: 2, minHeight: '400px' }}>
            <Box style={{ minHeight: '400px' }}>
              <Box
                sx={{
                  textAlign: 'center',
                  minHeight: '400px',
                  marginTop: 0,
                  padding: '40px',
                  mt: { xs: 5, md: 14 }
                }}
              >
                <CheckCircleIcon sx={{ fontSize: '100px', color: '#1976d2' }} />
                <br />
                <Typography sx={{ fontSize: '14px', color: '#cecece' }}>
                  Comanda a fost finalizata!
                </Typography>
                <br />
                <Button
                  variant="contained"
                  label="Factura fiscala"
                  // onClick={() =>
                  //   navigate(`/supplyOmni/receiptClientDetails/${clientId}?orderId=${orderId}`)
                  // }
                  disabled
                  onClick={() => console.log('disabled for now')}
                />
                <Button
                  style={isXXs ? { marginTop: '16px' } : { marginLeft: '8px' }}
                  variant="contained"
                  label="Vânzările mele"
                  onClick={() => {
                    navigate(`/supplyOmni/sales`)
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ReceiptInvoiceFinalized
