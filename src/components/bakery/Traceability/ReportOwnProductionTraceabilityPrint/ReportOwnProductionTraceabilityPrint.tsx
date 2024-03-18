import { useLocation, useSearchParams } from 'react-router-dom'
import styles from './ReportOwnProductionTraceabilityPrint.modules.scss'
import s from '../../commonStyles.modules.scss'
import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import React, { useRef } from 'react'
import { batchPrintColumns, chargePrintColumns, productPrintColumns } from './helpers'
import { useQuery } from 'react-query'
import { CircularProgress, Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PrintOutlined } from '@mui/icons-material'
import { useReactToPrint } from 'react-to-print'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Icon_v2 } from 'components/core-ui/Icon_v2'

export const ReportOwnProductionTraceabilityPrint = () => {
  let [searchParams] = useSearchParams()
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const printColumns = search.get('columns').split(',')
  const filterBy = search.get('filterBy')
  const order = search.get('order')
  const orderBy = search.get('orderBy')
  const filterValue = search.get('filterValue')

  const { showNotification } = useNotification()

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const tableFilters = React.useMemo(() => {
    return filterBy?.split('|').map((name, i) => ({ name, value: filterValue.split('|')[i] })) || []
  }, [])

  const reportDataQuery = useQuery(
    ['report-traceability-production'],
    async () => {
      return await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/traceability/production/report',
          tableFilters
        })
      )
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching report. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const selectedColumnsProduct = productPrintColumns.filter(column =>
    printColumns.includes(column.field)
  )

  const selectedColumnsBatch = batchPrintColumns.filter(column => {
    return printColumns.includes(column.field)
  })

  const selectedColumnsCharge = chargePrintColumns.filter(column => {
    return printColumns.includes(column.field)
  })

  if (reportDataQuery.isLoading) {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <div className={s.mainContainer} ref={componentRef}>
      <Grid container rowGap="24px">
        <Grid
          className={styles.reportHeader}
          container
          justifyContent="space-between"
          rowGap="12px"
        >
          <Grid item xs={4}>
            <Icon_v2 iconName={'CarrefourLogoBlack'} iconType="Icon" />
          </Grid>

          <Grid
            item
            xs={4}
            justifyContent="center"
            container
            rowGap="8px"
            textAlign="center"
            flexDirection="column"
            className={styles.middleColumn}
          >
            <p className={styles.title}>
              <b>RAPORT DE PRODUCTIE</b>
            </p>
            <p className={styles.subtitle}>
              <b>Produse elaborate Cod: RP-05_23.1 </b>
            </p>
          </Grid>

          <Grid
            item
            xs={4}
            container
            justifySelf="stretch"
            textAlign="right"
            className={styles.rightColumn}
          >
            <p>
              <b>PRP 05:</b> Prelucrare tehnologica, control productie si comercializare de produse
              alimentare
            </p>
          </Grid>
        </Grid>

        <Grid container justifyContent="flex-end">
          <PrintButton onClick={handlePrint} />
        </Grid>

        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <p className={styles.productName}>{reportDataQuery?.data?.list[0].product.name}</p>
          </Grid>
                <Grid item xs={12} sx={{padding: '0px 0px 20px !important'}}>
            <BasicTable
              columns={selectedColumnsProduct}
              rows={[reportDataQuery?.data?.list[0]] || []}
              containerProps={{
                className: styles.productTableContainer
              }}
            />
          </Grid>

          {reportDataQuery?.data?.list.map((product, tpIndex) => {
            return (
              <Grid item xs={12} container rowSpacing={'20px'} className={styles.itemWrapper}>
                <Grid item xs={12}>
                  <p className={styles.productName}>{product.product.name}</p>
                </Grid>

                <Grid item xs={12} sx={{padding: '0px 0px 20px !important'}}>
                  <BasicTable
                    columns={selectedColumnsBatch}
                    rows={[product] || []}
                    containerProps={{
                      className: styles.batchTableContainer
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{padding: '0px 0px 20px !important'}}>
                  <BasicTable
                    columns={selectedColumnsCharge}
                    rows={product.traceabilityProductionList || []}
                    containerProps={{
                      className: styles.chargeTableContainer
                    }}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </div>
  )
}

const PrintButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        padding: { xs: '4px 12px', sm: '4px 16px' },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: { xs: '24px', sm: '24px' },
        border: { xs: '1px solid #0970E6', sm: '1px solid #0970E6' },
        fontSize: '14px'
      }}
    >
      <IconButton
        sx={{
          padding: '0px',
          color: '#0970E6',
          borderRadius: 'none',
          '&:hover': {
            backgroundColor: 'white'
          }
        }}
        size="small"
        onClick={onClick}
      >
        <Box sx={{ display: { xs: 'none', sm: 'inherit' } }}>
          <Typography
            sx={{
              fontSize: '14px',
              marginRight: '8px'
            }}
            variant="medium"
          >
            Print
          </Typography>
        </Box>
        <PrintOutlined />
      </IconButton>
    </Box>
  )
}
