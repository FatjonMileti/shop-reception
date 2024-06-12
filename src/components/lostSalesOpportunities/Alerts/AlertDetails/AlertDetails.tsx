import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SnoozeAlarm } from './SnoozeAlarm'
import { AlertDetailsProps } from 'components/lostSalesOpportunities/interfaces'

const AlertDetails: React.FC<AlertDetailsProps> = props => {
  const { item, setShouldRefreshData } = props
  const navigate = useNavigate()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          label="Vezi detalii"
          onClick={() => navigate(`/lostSalesOpportunities/alerts/${item.id}`)}
          style={{ width: 'calc(100% - 16px)' }}
        />
      </Grid>
      <Grid item xs={12}>
        <SnoozeAlarm alertId={item.id} setShouldRefreshData={setShouldRefreshData} />
      </Grid>
    </Grid>
  )
}

export default AlertDetails
