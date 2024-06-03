import { Grid, Typography } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'
import s from '../Alerts.modules.scss'
import { AlertItem } from 'components/lostSalesOpportunities/interfaces'

interface AlertSummaryProps {
  item: AlertItem
}

const AlertSummary: React.FC<AlertSummaryProps> = props => {
  const { item } = props

  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Typography className={s.productName} fontWeight={700}>
          {item.articleName}
        </Typography>
      </Grid>
      <Grid container>
        <Grid item mt={1} mr={1}>
          <Capsule label="Cod" value={item.articleId} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Cantitate LSO" value={item.lsoQuantity} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Stoc" value={item.realTimeStock} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AlertSummary
