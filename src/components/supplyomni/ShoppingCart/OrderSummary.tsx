import { Box, Typography, Grid, Divider } from '@mui/material'
import s from './OrderSummary.modules.scss'

const OrderSummary = ({ order }) => {
  const orderSummaryPrice = [
    { label: 'Produse comandate', value: order?.summary?.totalItems || 'N/A' },
    { label: 'Cost produse', value: `${order?.summary?.totalPrice || 'N/A'}  lei` },
    { label: 'Discount total', value: '- lei' },
    { label: 'Total TVA', value: '- lei' }
  ]

  return (
    <>
      <Typography sx={{ fontSize: '1.1rem', color: '#052351' }}>Sumar comanda</Typography>
      <Divider sx={{ color: '#cecece', mt: 1, mb: 1 }} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          {orderSummaryPrice.map(price => (
            <Box className={s.summaryValue} textAlign={'left'}>
              {price.label}
            </Box>
          ))}
        </Grid>
        <Grid item xs={6}>
          {orderSummaryPrice.map(price => (
            <Box className={s.summaryValue} textAlign={'right'}>
              {price.value}
            </Box>
          ))}
        </Grid>
      </Grid>
      <Divider sx={{ color: '#cecece', mt: 1, mb: 1 }} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={s.summaryLabel} textAlign={'left'}>
            Total de plata:
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={s.summaryLabel} textAlign={'right'}>
            {order?.summary?.totalPrice || 'N/A'} RON
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderSummary
