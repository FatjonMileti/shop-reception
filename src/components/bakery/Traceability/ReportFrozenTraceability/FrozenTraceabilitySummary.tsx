import { Capsule } from 'components/core-ui/Capsule'
import s from './FrozenTraceability.modules.scss'
import { Grid, Typography } from '@mui/material'
import { formatBakeryPayloadDate } from 'utils/helpers'
import { ImageCell } from '../../../core-ui/ImageCell'
import React from 'react'

const FrozenTraceabilitySummary = item => {
  const {
    chargeNumber,
    conform,
    dlc,
    nonComplianceReason,
    product,
    productDestination,
    productionDate,
    productionOperator,
    quantity,
    thermalCondition,
    verified,
    verifiedBy,
    verifiedDate
  } = item.item

  const summaryCapsules = [
    { label: 'Data productie', value: formatBakeryPayloadDate(productionDate) },
    { label: 'Cod METI', value: product.metiCode },
    { label: 'Familie produs', value: product.familyName },
    { label: 'Subfamilie produs', value: product.subfamily },
    { label: 'Sarja', value: chargeNumber },
    { label: 'UM', value: product.metricUnit },
    { label: 'DLC Prod. Fab.', value: formatBakeryPayloadDate(dlc) },


    // { label: 'Cod Plu', value: product.pluCode },
    // { label: 'Cant. sarja', value: quantity },
    // { label: 'Stare termica', value: thermalCondition },
    // { label: 'Conform', value: conform ? 'Da' : 'Nu' },
    // { label: 'Motiv neconformitate', value: nonComplianceReason },
    // { label: 'Destinatia produsului neconform', value: productDestination },
    // { label: 'Operator productie', value: productionOperator },
    // { label: 'Verificare de catre validator trasabilitate', value: verified ? 'Da' : 'Nu' },
    // { label: 'Validator trasabilitate', value: verifiedBy },
    // { label: 'Data verificare trasabilitate', value: formatBakeryPayloadDate(verifiedDate) }
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
