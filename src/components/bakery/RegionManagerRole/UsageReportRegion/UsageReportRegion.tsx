import s from '../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { CircularProgress, Divider, Grid } from '@mui/material'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import Table from 'components/core-ui/Table/Table'
import { toTableRowItems } from './serializers'
import { UsageReportTableItem } from '../interfaces'
import { DownloadOutlined } from '@mui/icons-material'
import { useQuery } from 'react-query'
import { toStoreFilterItems } from 'components/bakery/commonSerializers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import dayjs from 'dayjs'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { ColumnsComponent, formatAndDownloadResponse } from 'components/bakery/UsageReport/helpers'
import { formatBakeryPayloadDate } from 'utils/helpers'

const UsageReportRegion = () => {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<UsageReportTableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface[]>([])
  const [startDateFilterValue, setStartDateFilterValue] = useState<dayjs.Dayjs>(dayjs())
  const [endDateFilterValue, setEndDateFilterValue] = useState<dayjs.Dayjs>(dayjs())

  const { data: storesFilterOptions, isLoading: isStoresFilterOptionsLoading } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/region/all')

      return toStoreFilterItems(result) || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region/application',
          filters: [
            { name: 'storeName', value: storeFilterValue.map(val => val.value) },
            { name: 'startDate', value: dayjs(startDateFilterValue).format('DD-MM-YYYY') },
            { name: 'endDate', value: dayjs(endDateFilterValue).format('DD-MM-YYYY') }
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
    const url = toTableGETUrl({
      url: '/bakery/region/download/application',
      filters: [
        { name: 'storeName', value: storeFilterValue[0]?.value },
        { name: 'startDate', value: formatBakeryPayloadDate(startDateFilterValue) },
        { name: 'endDate', value: formatBakeryPayloadDate(endDateFilterValue) }
      ]
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
      <Grid container>
        <>
          <Grid xs={12} md={12} container justifyContent={'space-between'}>
            <Grid xs={12} md={3} item>
              <DatePicker
                label="Data inceput"
                value={startDateFilterValue}
                variant="standard"
                required
                onChange={val => handleFilterChange('startDate', val)}
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <DatePicker
                label="Data sfarsit"
                value={endDateFilterValue}
                variant="standard"
                required
                onChange={val => handleFilterChange('endDate', val)}
              />
            </Grid>

            {isStoresFilterOptionsLoading ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : (
              <Grid xs={12} md={3} item>
                <AsyncAutocomplete
                  variant="standard"
                  applyCustomStyle
                  name="store.id"
                  label="Selecteaza magazin"
                  disableClearable
                  value={storeFilterValue}
                  options={storesFilterOptions}
                  onChange={val => handleFilterChange('store', val)}
                  multiple={true}
                />
              </Grid>
            )}
          </Grid>

          <Grid xs={12} item>
            <Divider />
          </Grid>

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
        </>
      </Grid>
    </div>
  )
}

export default UsageReportRegion
