import styles from './ReportOwnProductionTraceabilityPrint.modules.scss'
import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'

export const OwnProductionTraceabilityChildren = props => {
  const { child, selectedColumnsBatch, selectedColumnsCharge } = props

  return (
    <>
      <Grid item xs={12} container rowSpacing={'20px'}>
        <Grid item xs={12}>
          <p className={styles.productName}>{child.componentName}</p>
        </Grid>
        <Grid item xs={12} sx={{ padding: '0px 0px 20px !important' }}>
          <BasicTable
            columns={selectedColumnsBatch}
            rows={[child.childTraceability] || []}
            containerProps={{
              className: styles.batchTableContainer
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ padding: '0px 0px 20px !important' }}>
          <BasicTable
            columns={selectedColumnsCharge}
            rows={child.childTraceability.traceabilityProductionList || []}
            containerProps={{
              className: styles.chargeTableContainer
            }}
          />
        </Grid>
      </Grid>
      {child.childTraceability.traceabilityProductionList.map(
        (child, index) =>
          child.childTraceability && (
            <OwnProductionTraceabilityChildren
              child={child}
              selectedColumnsBatch={selectedColumnsBatch}
              selectedColumnsCharge={selectedColumnsCharge}
            />
          )
      )}
    </>
  )
}
