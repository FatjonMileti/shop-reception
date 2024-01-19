import { Box, Divider, Grid, Paper } from '@mui/material'
import s from '../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { UsageReportItem, ValueLabelInterface } from '../interfaces'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { ColumnsComponent, formatAndDownloadResponse } from './helpers'
import { useQuery } from 'react-query'
import { DatePicker, FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { toTableRowItems } from './serializers'
import dayjs from 'dayjs'
import { FileDownloadOutlined } from '@mui/icons-material'
import { toAsyncSelectOptions } from '../commonSerializers'
import { formatPayloadDate, getCurrentDate, getPreviousDay } from 'utils/helpers'

const UsageReport = () => {
  const [tableItems, setTableItems] = useState<UsageReportItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()
  
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface[]>([]);
  const [startDateFilterValue, setStartDateFilterValue] = useState<dayjs.Dayjs>(dayjs(getPreviousDay()))
  const [endDateFilterValue, setEndDateFilterValue] = useState<dayjs.Dayjs>(dayjs(getCurrentDate()))

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    const filters = [
      { name: 'startDate', value: formatPayloadDate(startDateFilterValue) },
      { name: 'endDate', value: formatPayloadDate(endDateFilterValue) },
      ...(storeFilterValue && storeFilterValue.length > 0
        ? [{ name: 'store', value: storeFilterValue.map(val => val.value) }]
        : []),
    ];

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/application',
          filters: filters,
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

  const { data: stores } = useQuery(
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

  const downloadFileQuery = useQuery(
    ['download'],
    async () => {
      const filters = [
        { name: 'startDate', value: formatPayloadDate(startDateFilterValue) },
        { name: 'endDate', value: formatPayloadDate(endDateFilterValue) },
        { name: 'store', value: storeFilterValue[0]?.value },
      ].filter(
        f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
        )

      const url = toTableGETUrl({
        url: '/bakery/report/download/application',
        filters: filters
      })
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      return formatAndDownloadResponse(response)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching file. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

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
          <Grid xs={12} md={3} item>
            <FilterDataSelect
              name="store"
              defaultSelectedData={storeFilterValue}
              label="Magazin"
              options={stores}
              onSelect={val => handleFilterChange('store', val)}
              placeholderButton="Selecteaza"
              multiSelect={true}
              showSearch
            />
          </Grid>          
        </Grid>
      </Paper>

      <Grid xs={12} item>
        <Divider />
      </Grid>
      
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
              label: 'Descarca',
              icon: <FileDownloadOutlined />,
              onClick: () => downloadFileQuery.refetch()
            }
          ]}
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Box>
    </div>
  )
}

export default UsageReport
