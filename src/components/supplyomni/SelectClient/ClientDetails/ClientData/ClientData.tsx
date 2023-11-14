import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { Client } from '../interfaces'

interface ClientDataProps {
  client: Client
}
const ClientData: React.FC<ClientDataProps> = props => {
  const { client } = props

  const clientInfo = [
    {
      label: 'COD:',
      name: client.id
    },
    {
      label: 'Telefon:',
      name: client.phone
    },
    {
      label: 'Email:',
      name: client.email
    },
    {
      label: 'Adresa:',
      name: client.address.fullAddress
    }
  ]

  return (
    <Grid item xs={12} md={6}>
      <Paper>
        <Box padding={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <PortraitOutlinedIcon />
          <Typography variant="h6" fontWeight={600} ml={2}>
            Date client
          </Typography>
        </Box>
        <Divider />
        <Box paddingX={4} paddingTop={4}>
          <Typography variant="h5" fontWeight={600}>
            {client.name}
          </Typography>
        </Box>
        <Box padding={4}>
          <FormInfoItems items={clientInfo} />
        </Box>
      </Paper>
    </Grid>
  )
}

export default ClientData
