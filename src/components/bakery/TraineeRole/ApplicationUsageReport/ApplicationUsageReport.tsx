import s from '../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { Box, CircularProgress, Divider, Grid, Paper } from '@mui/material'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import Table from 'components/core-ui/Table/Table'
import { toTableRowItems } from './serializers'
import { TableItem } from './interfaces'
import { DownloadOutlined } from '@mui/icons-material'
import { useQuery } from 'react-query'
import { toStoreFilterItems } from 'components/bakery/commonSerializers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import dayjs from 'dayjs'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { ColumnsComponent, formatAndDownloadResponse } from 'components/bakery/UsageReport/helpers'

const ApplicationUsageReport = () => {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface[]>([])
  const [startDateFilterValue, setStartDateFilterValue] = useState<dayjs.Dayjs>(dayjs())
  const [endDateFilterValue, setEndDateFilterValue] = useState<dayjs.Dayjs>(dayjs())

  const { data: storesFilterOptions } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/trainee/all')

      return toStoreFilterItems(result) || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching store dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    const filters = [
      { name: 'startDate', value: dayjs(startDateFilterValue).format('DD-MM-YYYY') },
      { name: 'endDate', value: dayjs(endDateFilterValue).format('DD-MM-YYYY') },
      ...(storeFilterValue && storeFilterValue.length > 0
        ? [{ name: 'store', value: storeFilterValue.map(val => val.value) }]
        : []),
    ];

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/trainee/application',
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

      return response
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const handleFilterChange = (filter: 'startDate' | 'endDate' | 'store', value: any): void => {
    switch (filter) {
      case 'store':
        setStoreFilterValue(value)
        setShouldRefreshData(true)
        break
      case 'startDate':
        setStartDateFilterValue(dayjs(value))
        setShouldRefreshData(true)
        break
      case 'endDate':
        setEndDateFilterValue(dayjs(value))
        setShouldRefreshData(true)
        break
      default:
        return
    }
  }

  const handleDownload = async () => {
    const filters = [
      { name: 'startDate', value: dayjs(startDateFilterValue).format('DD-MM-YYYY') },
      { name: 'endDate', value: dayjs(endDateFilterValue).format('DD-MM-YYYY') },
      { name: 'store', value: storeFilterValue[0]?.value },
    ].filter(
      f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
    )

    const url = toTableGETUrl({
      url: '/bakery/report/download/application',
      filters: filters
    })
    try {
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `Error while downloading file. ${formatErrorMessage(error)}`,
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
              label="Data inceput"
              value={startDateFilterValue}
              variant="outlined"
              required
              onChange={val => handleFilterChange('startDate', val)}
            />
          </Grid>

          <Grid xs={12} md={3} item>
            <DatePicker
              label="Data sfarsit"
              value={endDateFilterValue}
              variant="outlined"
              required
              onChange={val => handleFilterChange('endDate', val)}
            />
          </Grid>
          <Grid xs={12} md={3} item>
            <AsyncAutocomplete
              variant="outlined"
              name="store.id"
              label="Magazin"
              value={storeFilterValue}
              options={storesFilterOptions}
              onChange={val => handleFilterChange('store', val)}
              multiple={true}
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
          hasStickyHeader
          maxHeight={'600px'}
          frequency="day"
          toolbarActions={[
            {
              label: 'Descarca',
              icon: <DownloadOutlined />,
              onClick: () => handleDownload()
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default ApplicationUsageReport
