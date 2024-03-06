import { Capsule } from 'components/core-ui/Capsule'
import s from './FrozenTraceability.modules.scss'
import { Grid, Typography } from '@mui/material'
import { formatBakeryPayloadDate } from 'utils/helpers'
import { ImageCell } from '../../../core-ui/ImageCell'
import React from 'react'

const FrozenTraceabilitySummary = ({item}) => {
  console.log("item: ", item)


  const {
    chargeNumber,
    dlc,
    product,
    productionDate,
  } = item

  const summaryCapsules = [
    { label: 'Data productie', value: formatBakeryPayloadDate(productionDate) },
    { label: 'Cod METI', value: product.metiCode },
    { label: 'Familie', value: product.familyName },
    { label: 'Subfamilie', value: product.subfamily },
    { label: 'Sarja', value: chargeNumber },
    { label: 'UM', value: product.metricUnit },
  ]

  return (
    <Grid container flexDirection="column">
      <Grid item className={s.summary}>
        <ImageCell value={''} imageUrl={item.product?.imageUrl} />

        <div className={s.title}>
          <Typography variant="medium" className="title">
            {product.name}
          </Typography>

          <Grid container>
            {summaryCapsules.map((capsule, index) => (
              <Grid item mt={1} mr={1} key={index}>
                <Capsule label={capsule.label} value={capsule.value} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default FrozenTraceabilitySummary
