import { Grid, Typography } from '@mui/material'
import s from '../Alerts.modules.scss'

interface AlertSummaryProps {
  item: any
}

const AlertSummary: React.FC<AlertSummaryProps> = ({ item }) => {
  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Typography className={s.productName} fontWeight={700}>
          {item.articleName}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default AlertSummary
