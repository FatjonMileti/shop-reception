import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { formatAndDownloadResponse } from 'utils/helpers'
import s from './MySales.modules.scss'
import { RESOURCE_URI, defaultTableFilters, tableColumns } from './constants'
import { MySalesResponseModel, TableFilters, TableRowModel } from './models'
import { toTableRowItems } from './serializer'
import { buildTableFilterInputs } from './utils'
import { DownloadIcon } from 'icons'

export const MySales = () => {
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<TableRowModel[]>([])
  const [tableFilters, setTableFilters] = useState<TableFilters>(defaultTableFilters)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const columnsWithActions = useMemo(() => tableColumns, [])
  const tableFilterInputs = useMemo(() => buildTableFilterInputs(tableFilters, setTableFilters), [])

  const onHandlingFetchResponse = (
    totalCount: number,
    totalPrice: number,
    list: TableRowModel[]
  ) => {
    setTotalCount(totalCount)
    setTableItems(toTableRowItems(list, true))
    setTotalPrice(totalPrice)
    setIsLoading(false)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = (await makeCoreGetRequest(
        toTableGETUrl({
          url: RESOURCE_URI,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )) as MySalesResponseModel
      onHandlingFetchResponse(
        response.page.totalCount,
        response.summary.totalPrice,
        toTableRowItems(response.list, false)
      )
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
      onHandlingFetchResponse(0, 0, [])
    }
  }

  const handleDownload = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/supply-omni/reports/export/csv',
      tableFilters: filters,
      order,
      orderBy
    })

    try {
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `Error while download file. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        columns={columnsWithActions}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        filters={tableFilterInputs}
        toolbarActions={[
          {
            label: 'Download',
            icon: <DownloadIcon />,
            onClick: handleDownload
          }
        ]}
      />
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        className={s.totalContainer}
      >
        <Typography variant="medium" style={{ marginRight: '3rem', fontSize: '1.25rem' }}>
          Total:
        </Typography>
        <Typography variant="medium" style={{ fontSize: '1.25rem', color: 'black' }}>
          {totalPrice}
        </Typography>
      </Grid>
    </div>
  )
}
export default MySales
