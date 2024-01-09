import { Box, Grid } from '@mui/material'
import s from '../commonStyles.modules.scss'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { StoreItem, ValueLabelInterface } from '../interfaces'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns } from './helpers'
import { Autocomplete, DatePicker, FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
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
      }
    }
  )

  const { data: familyOptions } = useQuery(
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
      const result = await makeCoreGetRequest('/bakery/store/families/subfamilies', {
        params: {
          store: storeFilterValue?.value,
          family: familiesFilterValue.map(({ value }) => value)
        },
        paramsSerializer: { indexes: null }
      })

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

  const handleStoreFilterChange = (value: any): void => {
    setStoreFilterValue(value)
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const filters = [
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
            rowsPerPage,
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
        { name: 'date', value: formatPayloadDate(dateFilterValue) },
        { name: 'store', value: storeFilterValue?.value },
        { name: 'family', value: familiesFilterValue?.map(val => val.value) },
        { name: 'subfamily', value: subfamiliesFilterValue?.map(val => val.value) }
      ].filter(
        f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
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

  const tableFilterFields = [
    {
      name: 'date',
      label: 'Planificare pentru',
      type: 'date',
      value: formatPayloadDate(dateFilterValue),
      filter: (
        <DatePicker
          value={formatPayloadDate(dateFilterValue)}
          onChange={() => {}}
          label="Planificare pentru"
          variant="outlined"
          required
        />
      )
    },
    {
      name: 'family',
      label: 'Familie',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Familie"
          value={familiesFilterValue}
          options={familyOptions || []}
          multiple
        />
      )
    },
    {
      name: 'subfamily',
      label: 'Subfamilie',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Subfamilie"
          value={subfamiliesFilterValue}
          options={subfamiliesOptions || []}
          multiple
        />
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Grid container spacing={2}>
        <Grid xs={12} md={3} item>
          <FilterDataSelect
            name="store"
            defaultSelectedData={storeFilterValue}
            label="Magazin"
            options={stores}
            onSelect={val => handleStoreFilterChange(val)}
          />
        </Grid>
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
            stickyRatio={0.2}
            groupCount={3}
            frequency="day"
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
            filters={tableFilterFields}
            rowsPerPage={25}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Box>
      )}
    </div>
  )
}

export default SalesCadentier
