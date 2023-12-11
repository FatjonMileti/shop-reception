import { Box, Typography, Grid, Divider } from '@mui/material'
import s from './OrderSummary.modules.scss'

const ClientSummary = ({ client }) => {
  const clientSummaryPrice = [
    { label: 'Nume', value: client?.name || 'N/A' },
    { label: 'CUI', value: client?.cif || 'N/A' },
    { label: 'Adresa', value: client?.address?.fullAddress || 'N/A' },
    { label: 'Email', value: client?.email || 'N/A' },
    { label: 'Telefon', value: client?.phone || 'N/A' }
  ]

  return (
    <Box style={{ paddingTop: '24px' }}>
      <Typography sx={{ fontSize: '1.1rem', color: '#052351' }}>Detalii client</Typography>
      <Divider sx={{ color: '#cecece', mt: 1, mb: 1 }} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          {clientSummaryPrice.map(clientDetails => (
            <Box className={s.summaryValue} textAlign={'left'}>
              {clientDetails.label}
            </Box>
          ))}
        </Grid>
        <Grid item xs={6}>
          {clientSummaryPrice.map(clientDetails => (
            <Box className={s.summaryValue} textAlign={'right'}>
              {clientDetails.value}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClientSummary
