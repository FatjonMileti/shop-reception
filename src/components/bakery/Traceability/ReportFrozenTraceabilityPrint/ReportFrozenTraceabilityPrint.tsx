import { useLocation, useSearchParams } from 'react-router-dom'
import styles from './ReportFrozenTraceabilityPrint.modules.scss'
import s from '../../commonStyles.modules.scss'
import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { makeCoreGetRequest } from '../../../../utils/api'
import { toTableGETUrl } from '../../../core-ui/Table/serializers'
import { batchPrintColumns, productPrintColumns } from './helpers'
import { useQuery } from 'react-query'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TracedProduct } from './interfaces'
import { Grid, Typography } from '@mui/material'


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

  console.log('printColumns: ', printColumns)

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
          searchFields: ['productName']
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

  console.log('reportDataQuery.data: ', reportDataQuery.data)

  const selectedColumnsProduct = productPrintColumns.filter(column =>
    printColumns.includes(column.field)
  )

  const selectedColumnsBatch = batchPrintColumns.filter(column =>
    printColumns.includes(column.field)
  )

  return (
    <div className={s.mainContainer}>
      <Grid container rowSpacing={3}>
        {reportDataQuery?.data?.list.map((tp, tpIndex) => {
          return (
            <Grid item xs={12} container rowSpacing={2}>
              <Grid item xs={12}>
                <p className={styles.productName}>{tp.product.name}</p>
                <BasicTable
                  columns={selectedColumnsProduct}
                  rows={[tp] || []}
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
              <hr />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
