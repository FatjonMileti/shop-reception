import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Box, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SnoozeAlarm } from './SnoozeAlarm'
import { AlertItem } from 'components/lostSalesOpportunities/interfaces'

interface AlertDetailsProps {
  item: AlertItem
}

const AlertDetails: React.FC<AlertDetailsProps> = ({ item }) => {
  const navigate = useNavigate()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          label="Vezi detalii"
          onClick={() => navigate(`/lostSalesOpportunities/alerts/${item.id}`)}
          style={{ float: 'right', marginRight: '16px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <SnoozeAlarm alertId={item.id} />
      </Grid>
    </Grid>
  )
}

export default AlertDetails
