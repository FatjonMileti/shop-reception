import { useLocation, useSearchParams } from 'react-router-dom'
import styles from './ReportFrozenTraceabilityPrint.modules.scss'
import s from '../../commonStyles.modules.scss'
import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import React, { useRef } from 'react'
import { makeCoreGetRequest } from '../../../../utils/api'
import { toTableGETUrl } from '../../../core-ui/Table/serializers'
import { batchPrintColumns, productPrintColumns } from './helpers'
import { useQuery } from 'react-query'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TracedProduct } from './interfaces'
import { Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PrintOutlined } from '@mui/icons-material'
import { useReactToPrint } from 'react-to-print'
import { Icon_v2 } from '../../../core-ui/Icon_v2'

export const ReportFrozenTraceabilityPrint = () => {
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

  const reportDataQuery = useQuery<{ list: TracedProduct[] }>(
    ['report-traceability-frozen'],
    async () => {
      return await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/traceability/frozen/report',
          // tableFilters,
          // page,
          // rowsPerPage,
          // searchText,
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

  const selectedColumnsBatch = batchPrintColumns.filter(column =>
    printColumns.includes(column.field)
  )

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
            className={styles.middleColumn}
          >
            <p className={styles.title}>
              <b>Raport TRASABILITATE CONGELATE</b>
            </p>
            <p className={styles.subtitle}>
              <b>Brutarie Patiserie Produse elaborate COD: RP-05_32.01 </b>
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

          <Grid item xs={12} className={styles.dateColumn}>
            <p>
              <b>Data:</b> 25.12.2023 - 27.12.2023
            </p>
          </Grid>
        </Grid>

        <Grid container justifyContent="flex-end">
          <PrintButton onClick={handlePrint} />
        </Grid>

        <Grid container rowSpacing={3}>
          {reportDataQuery?.data?.list.map((tp, tpIndex) => {
            return (
              <Grid item xs={12} container rowSpacing={'20px'} className={styles.itemWrapper}>
                <Grid item xs={12}>
                  <p className={styles.productName}>{tp.product.name}</p>
                </Grid>

                <Grid item xs={12}>
                  <BasicTable
                    columns={selectedColumnsProduct}
                    rows={[tp] || []}
                    // tableProps={{
                    //   size: 'small'
                    // }}
                    containerProps={{
                      className: styles.productTableContainer
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <BasicTable
                    columns={selectedColumnsBatch}
                    rows={tp?.traceabilityFrozenList || []}
                    containerProps={{
                      className: styles.batchTableContainer
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
