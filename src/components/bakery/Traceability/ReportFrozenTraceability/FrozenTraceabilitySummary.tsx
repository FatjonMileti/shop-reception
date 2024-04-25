import { Capsule } from 'components/core-ui/Capsule'
import s from './FrozenTraceability.modules.scss'
import { Grid, Typography } from '@mui/material'
import { formatBakeryPayloadDate } from 'utils/helpers'
import { ImageCell } from '../../../core-ui/ImageCell'
import React from 'react'
import { useLocation } from 'react-router'
import dayjs from 'dayjs'

const FrozenTraceabilitySummary = ({ item }) => {
  const { chargeNumber, dlc, product, productionDate } = item

  const { pathname } = useLocation()
  const isFormator = pathname.includes('/formator')

  const summaryCapsules = [
    ...(isFormator
      ? [
          {
            label: 'Nume magazin',
            value: item?.store?.name || ''
          }
        ]
      : []),
    { label: 'Data productie', value: formatBakeryPayloadDate(productionDate) },
    { label: 'Cod METI', value: product.metiCode },
    { label: 'Familie produs', value: product.familyName },
    { label: 'Subfamilie produs', value: product.subfamily },
    { label: 'Sarja', value: chargeNumber },
    { label: 'Cantitate sarja', value: item?.quantity },
    { label: 'UM', value: product.metricUnit },
    {
      label: 'DLC',
      value: product?.dlcDays
        ? formatBakeryPayloadDate(dayjs(item.productionDate).add(product?.dlcDays, 'days'))
        : ''
    }
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
            {summaryCapsules.map(capsule => (
              <Grid item mt={1} mr={1}>
                <Capsule label={capsule.label} value={capsule.value} valueColor={'#004f9b'} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default FrozenTraceabilitySummary
