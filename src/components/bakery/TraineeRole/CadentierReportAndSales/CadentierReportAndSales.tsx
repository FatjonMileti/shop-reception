import s from '../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { Box, CircularProgress, Divider, Grid, Paper } from '@mui/material'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { TableItem } from './interfaces'
import { DownloadOutlined } from '@mui/icons-material'
import { useQuery } from 'react-query'
import { toStoreFilterItems } from 'components/bakery/commonSerializers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import dayjs from 'dayjs'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { formatAndDownloadResponse } from 'components/bakery/UsageReport/helpers'
import { formatBakeryPayloadDate } from 'utils/helpers'
import { columns } from './helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { toTableRowItems } from './serializers'
import { FamilyItem, SubfamilyItem } from '../ProductionManagement/interfaces'

const CadentierReportAndSales = () => {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [planningDateFilterValue, setPlanningDateFilterValue] = useState<dayjs.Dayjs>(dayjs())
  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])

  const { data: storesFilterOptions } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/all')

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

  const familiesQuery = useQuery(
    ['families', storeFilterValue?.value],
    async () => {
      const result = await makeCoreGetRequest(
        '/bakery/store/families',
        {
          params: {
            store: storeFilterValue?.value,
          },
          paramsSerializer: { indexes: null }
        }
      )

      const resultOptions = result.map(
        (item: FamilyItem): ValueLabelInterface => ({
          label: item.name,
          value: item.id
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching families dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: subfamiliesOptions } = useQuery(
    ['subfamilies', storeFilterValue?.value, familiesFilterValue.map(({ value }) => value)],
    async () => {
      const result = await makeCoreGetRequest(
        '/bakery/store/families/subfamilies',
        {
          params: {
            store: storeFilterValue?.value,
            family: familiesFilterValue.map(({ value }) => value)
          },
          paramsSerializer: { indexes: null }
        }
      )

      const resultOptions = result.map(
        (item: SubfamilyItem): ValueLabelInterface => ({
          label: item.subFamily,
          value: item.subFamily
        })
      )

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching subfamilies dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: storeFilterValue !== null
    }
  )

  const handleStoreFilterChange = (value: ValueLabelInterface): void => {
    setStoreFilterValue(value)
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handlePlanningDateFilterChange = (value: string): void => {
    setPlanningDateFilterValue(dayjs(value))
    setShouldRefreshData(true)
  }

  const handleFamiliesChange = (value: ValueLabelInterface[]): void => {
    setFamiliesFilterValue(value)
    if (familiesFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handleSubfamiliesChange = (value: ValueLabelInterface[]): void => {
    setSubfamiliesFilterValue(value)
    if (subfamiliesFilterValue === null) return
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const filters = [
        { name: 'date', value: formatBakeryPayloadDate(planningDateFilterValue) },
        { name: 'store', value: storeFilterValue.value },
        { name: 'family', value: familiesFilterValue?.map(val => val.value) },
        { name: 'subfamily', value: subfamiliesFilterValue?.map(val => val.value) }
      ].filter(
        f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
      )
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/product/sale/cadentier',
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

  const handleDownload = async () => {
    const url = toTableGETUrl({
      url: '/bakery/report/download/sale',
      filters: [
        { name: 'store', value: storeFilterValue?.value },
        { name: 'startDate', value: formatBakeryPayloadDate(planningDateFilterValue) }
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
        <Paper className={s.filtersContainer}>
          <Grid container spacing={4}>
            <Grid xs={12} md={3} item>
              <DatePicker
                label="Planificare pentru"
                value={planningDateFilterValue}
                variant="outlined"
                required
                onChange={handlePlanningDateFilterChange}
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <AsyncAutocomplete
                variant="outlined"
                name="store.id"
                label="Magazin"
                value={storeFilterValue}
                options={storesFilterOptions}
                onChange={handleStoreFilterChange}
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <AsyncAutocomplete
                variant="outlined"
                name="family"
                label="Familie"
                value={familiesFilterValue}
                options={familiesQuery.data || []}
                onChange={handleFamiliesChange}
                multiple
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <AsyncAutocomplete
                variant="outlined"
                name="subfamilies"
                label="Subfamilie"
                value={subfamiliesFilterValue}
                options={subfamiliesOptions || []}
                onChange={handleSubfamiliesChange}
                multiple
              />
            </Grid>
          </Grid>
        </Paper>

        <Grid xs={12} item>
          <Divider />
        </Grid>

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
              stickyRatio={0.3}
              groupCount={2}
              hasStickyHeader
              frequency="day"
              maxHeight={'600px'}
              toolbarActions={[
                {
                  label: 'Descarca',
                  icon: <DownloadOutlined />,
                  onClick: () => handleDownload()
                }
              ]}
              rowsPerPage={25}
              rowsPerPageOptions={[25, 50, 100]}
            />
          </Box>
        )}
    </div>
  )
}

export default CadentierReportAndSales
