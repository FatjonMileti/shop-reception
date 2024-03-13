import { Capsule } from 'components/core-ui/Capsule'
import s from './OwnProductionTraceability.modules.scss'
import { Grid, Typography } from '@mui/material'
import { formatBakeryPayloadDate } from 'utils/helpers'
import { ImageCell } from '../../../core-ui/ImageCell'
import React from 'react'
import { useLocation } from 'react-router'
import dayjs from 'dayjs'

const OwnProductionTraceabilitySummary = ({ item }) => {
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
    { label: 'Familie', value: product.familyName },
    { label: 'Subfamilie', value: product.subfamily },
    { label: 'Sarja', value: chargeNumber },
    { label: 'Cant.fab', value: item.quantity },
    { label: 'UM', value: product.metricUnit },
    {
      label: 'DLC Prod. Fab.',
      value: product?.dlcDays
        ? formatBakeryPayloadDate(dayjs(item.productionDate).add(product?.dlcDays, 'days'))
        : ''
    }
  ]

  return (
    <Grid container flexDirection="column">
      <Grid item className={s.summary}>
        <ImageCell value={''} imageUrl={product?.imageUrl} />
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

export default OwnProductionTraceabilitySummary
