import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import s from '../commonStyles.modules.scss'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { StoreItem, ValueLabelInterface } from '../interfaces'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns } from './helpers'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { formatAndDownloadResponse, formatPayloadDate, getPreviousDay } from 'utils/helpers'
import { DownloadOutlined } from '@mui/icons-material'
import { GroupTable } from 'components/core-ui/GroupTable'
import { TableState } from '../interfaces'
import { toAsyncSelectOptions } from '../commonSerializers'

const SalesCadentier = () => {
  const [tableItems, setTableItems] = useState<StoreItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const [dateFilterValue, setDateFilterValue] = useState(getPreviousDay())
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  
  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

  const { data: stores, isLoading: isStoresLoading } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/all')
      const resultOptions = toAsyncSelectOptions(result, 'id', 'name')
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching stores dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
    }
  )

  const handleFilterChange = (filter: 'date' | 'store', value: any): void => {
    const filters = [
      { name: 'date', value: formatPayloadDate(dateFilterValue) },
      { name: 'store', value: storeFilterValue?.value },
    ];

    switch(filter) {
      case 'store': 
        setStoreFilterValue(value)
        if (storeFilterValue === null) return
        setTableState({
          ...tableState,
          tableFilters: filters 
        })
        setShouldRefreshData(true);
        break
      case 'date': 
        setDateFilterValue( dayjs(value) )
        setShouldRefreshData(true);
        break
      default: return;
    }
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const filters = [
        { name: 'date', value: formatPayloadDate(dateFilterValue) },
        { name: 'store', value: storeFilterValue?.value },
      ]
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/product/sale/cadentier',
          filters,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setTableItems(response.list)
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
      setTableState({
        order,
        orderBy,
        tableFilters: filters
      })

      window.history.replaceState(
        {
          ...window.history.state,
          tableState: {
            page,
            rowsPerPage: 25,
            order,
            orderBy,
            filters
          }
        },
        document.title
      )

      return response
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const handleDownload = async () => {
    const url = toTableGETUrl({
      url: '/bakery/report/download/sale',
      filters: [
        { name: 'store', value: storeFilterValue.value},
        { name: 'date', value: dayjs(dateFilterValue).format('DD-MM-YYYY') },
      ]
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
        <Paper className={s.filtersContainer}>
            <Grid container spacing={2}>
                <Grid xs={12} md={3} item>
                <DatePicker
                    value={dateFilterValue}
                    onChange={(val) => handleFilterChange('date', val)}
                    label="Planificare pentru"
                    variant="outlined"
                    required
                />
                </Grid>
                {isStoresLoading ? (
                    <div style={{ display: 'flex' }}>
                        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
                    </div>
                ) : (
                <Grid xs={12} md={3} item>
                    <AsyncAutocomplete
                    variant="outlined"
                    name="store"
                    label="Magazin"
                    value={storeFilterValue}
                    options={stores}
                    onChange={(val) => handleFilterChange('store', val)}
                    />
                </Grid>
                )}
            </Grid>
        </Paper>
        {storeFilterValue && (
            <Box>
                 <GroupTable
                  hideCheckbox
                  columns={columns}
                  items={tableItems}
                  fetchData={fetchData}
                  isLoading={isLoading}
                  totalCount={totalCount}
                  shouldRefreshData={shouldRefreshData}
                  setShouldRefreshData={setShouldRefreshData}
                  stickyRatio={0.2}
                  groupCount={3}
                  frequency='day'
                  hasStickyHeader
                  maxHeight={'600px'}
                  hasSearchInput
                  toolbarActions={[
                    {
                      label: 'Descarca',
                      icon: <DownloadOutlined />,
                      onClick: () => handleDownload()
                    }
                  ]}
                  order={tableState.order}
                  orderBy={tableState.orderBy}
                  tableFilters={tableState.tableFilters}
                  filters={tableState.tableFilters}
                />
            </Box>
        )}
    </div>
  )
}

export default SalesCadentier
