import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import s from './SalesCadentier.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { StoreItem } from '../interfaces'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { toAsyncSelectOptions, toTableRowItems } from './serializers'
import { columns } from './helpers'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { formatAndDownloadResponse } from 'utils/helpers'
import { FileDownloadOutlined } from '@mui/icons-material'

const SalesCadentier = () => {
  const [tableItems, setTableItems] = useState<StoreItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const [dateFilterValue, setDateFilterValue] = useState(dayjs().subtract(1, 'day'))
  const [storeFilterValue, setStoreFilterValue] = useState(null)
  
  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/product/sale/cadentier',
          filters: [],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: stores, isLoading: isStoresLoading } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/all/stores') //TODO mockoon returns wrong so made a temp api
      const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []
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
    switch(filter) {
      case 'store': 
        setStoreFilterValue(value)
        setShouldRefreshData(true);
        break
      case 'date': 
        setDateFilterValue( dayjs(value) )
        setShouldRefreshData(true);
        break
      default: return;
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
console.log(columns())
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
                <Table
                hideCheckbox
                columns={columns()}
                items={tableItems}
                fetchData={fetchData}
                isLoading={isLoading}
                totalCount={totalCount}
                shouldRefreshData={shouldRefreshData}
                setShouldRefreshData={setShouldRefreshData}
                stickyRatio={0.2}
                groupCount={3}
                frequency='day'
                hasStickyHeader={true}
                maxHeight="600px"
                toolbarActions={[
                    {
                    icon: <FileDownloadOutlined />,
                    onClick: () => handleDownload()
                    }
                ]}
                />
            </Box>
        )}
    </div>
  )
}

export default SalesCadentier
