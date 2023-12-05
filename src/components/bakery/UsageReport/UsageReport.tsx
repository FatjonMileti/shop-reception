import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import s from '../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { UsageReportItem, ValueLabelInterface } from '../interfaces'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { ColumnsComponent, formatAndDownloadResponse } from './helpers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useQuery } from 'react-query'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { toTableRowItems } from './serializers'
import dayjs from 'dayjs'
import { FileDownloadOutlined } from '@mui/icons-material'
import { toAsyncSelectOptions } from '../commonSerializers'

const UsageReport = () => {
  const [tableItems, setTableItems] = useState<UsageReportItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()
  
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface[]>([]);
  const [startDateFilterValue, setStartDateFilterValue] = useState<dayjs.Dayjs>(dayjs())
  const [endDateFilterValue, setEndDateFilterValue] = useState<dayjs.Dayjs>(dayjs())

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/application',
          filters: [
            { name: 'storeName', value: storeFilterValue.map(val => val.value)},
            { name: 'startDate', value: dayjs(startDateFilterValue).format('DD-MM-YYYY') },
            { name: 'endDate', value: dayjs(endDateFilterValue).format('DD-MM-YYYY') },
          ],
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
      const result = await makeCoreGetRequest('/bakery/store/all')
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

  const handleFilterChange = (filter: 'startDate' | 'endDate' | 'store', value: any): void => {
    switch(filter) {
      case 'store': 
        setStoreFilterValue(value)
        setShouldRefreshData(true);
        break
      case 'startDate': 
        setStartDateFilterValue( dayjs(value) )
        setShouldRefreshData(true);
        break
      case 'endDate': 
        setEndDateFilterValue( dayjs(value) )
        setShouldRefreshData(true);
        break
      default: return;
    }
  }

  const handleDownload = async () => {
    const url = toTableGETUrl({
      url: '/bakery/report/download/application',
      filters: [
        { name: 'storeName', value: storeFilterValue[0].value},
        { name: 'startDate', value: dayjs(startDateFilterValue).format('DD-MM-YYYY') },
        { name: 'endDate', value: dayjs(endDateFilterValue).format('DD-MM-YYYY') },
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
        <Grid container spacing={4}>
        <Grid xs={12} md={3} item>
          <DatePicker
            value={startDateFilterValue}
            onChange={(val) => handleFilterChange('startDate', val)}
            label="Data inceput"
            variant="outlined"
            required
          />
        </Grid>

        <Grid xs={12} md={3} item>
          <DatePicker
            value={endDateFilterValue}
            onChange={(val) => handleFilterChange('endDate', val)}
            label="Data sfarsit"
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
              disableClearable
              value={storeFilterValue}
              options={stores}
              onChange={(val) => handleFilterChange('store', val)}
              multiple={true}
            />
          </Grid>
          )
        }
        </Grid>
      </Paper>
      <Box>
        <Table
          hideCheckbox
          columns={ColumnsComponent(startDateFilterValue, endDateFilterValue)}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          stickyRatio={0.45}
          maxHeight="600px"
          hasStickyHeader
          frequency="day"
          toolbarActions={[
            {
              icon: <FileDownloadOutlined />,
              onClick: () => handleDownload()
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default UsageReport
