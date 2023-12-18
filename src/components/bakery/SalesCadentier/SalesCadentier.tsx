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
import { FamilyItem, SubfamilyItem } from '../StoreManagerRole/interfaces'

const SalesCadentier = () => {
  const [tableItems, setTableItems] = useState<StoreItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const [dateFilterValue, setDateFilterValue] = useState(getPreviousDay())
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  
  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

  const { data: stores } = useQuery(
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

  const familiesQuery = useQuery(
    ['families', storeFilterValue?.value],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/families')

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

  const handleFilterChange = (filter: 'date' | 'store' | 'families' | 'subfamilies', value: any): void => {
    switch(filter) {
      case 'store': 
        setStoreFilterValue(value)
        if (storeFilterValue === null) return
        setShouldRefreshData(true);
        break
      case 'date': 
        setDateFilterValue( dayjs(value) )
        setShouldRefreshData(true);
        break
      case 'families':
        setFamiliesFilterValue(value)
        if (familiesFilterValue === null) return
        setShouldRefreshData(true)
        break
      case 'subfamilies': 
        setSubfamiliesFilterValue(value)
        if (subfamiliesFilterValue === null) return
        setShouldRefreshData(true)
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
        { name: 'store', value: storeFilterValue?.value },
          { name: 'family', value: familiesFilterValue?.map(val => val.value) },
          { name: 'subfamily', value: subfamiliesFilterValue?.map(val => val.value) }
        ].filter(
          f =>
            (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
        )
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
          <Grid xs={12} md={3} item>
            <AsyncAutocomplete
              variant="outlined"
              name="family"
              label="Familie"
              value={familiesFilterValue}
              options={familiesQuery.data || []}
              onChange={(val) => handleFilterChange('families', val)}
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
              onChange={(val) => handleFilterChange('subfamilies', val)}
              multiple
            />
          </Grid>
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
