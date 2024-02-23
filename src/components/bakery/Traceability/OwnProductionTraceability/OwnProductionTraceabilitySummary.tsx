import { Capsule } from 'components/core-ui/Capsule'
import s from './OwnProductionTraceability.modules.scss'
import { Grid, Typography } from '@mui/material'
import { formatBakeryPayloadDate } from 'utils/helpers'

const OwnProductionTraceabilitySummary = item => {
  const {
    chargeNumber,
    dlc,
    product,
    productionDate,
  } = item.item

  const summaryCapsules = [
    { label: 'Data productie', value: formatBakeryPayloadDate(productionDate) },
    { label: 'Cod METI', value: product.metiCode },
    { label: 'Familie', value: product.familyName },
    { label: 'Subfamilie', value: product.subfamily },
    { label: 'Sarja', value: chargeNumber },
    { label: 'UM', value: product.metricUnit },
    { label: 'DLC Prod. Fab.', value: formatBakeryPayloadDate(dlc) },
  ]

  return (
    <Grid container flexDirection="column">
      <Grid item className={s.summary}>
        {/* TODO: Replace src string with product.imageUrl */}
        <img src={'images/default-product-image.svg'} />
        <div className={s.title}>
          <Typography variant="medium" className="title">
            {product.name}
          </Typography>

          <Grid container>
            {summaryCapsules.map(capsule => (
              <Grid item mt={1} mr={1}>
                <Capsule label={capsule.label} value={capsule.value} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default OwnProductionTraceabilitySummary
