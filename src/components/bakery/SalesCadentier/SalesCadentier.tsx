import { Box, Grid } from '@mui/material'
import s from '../commonStyles.modules.scss'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { StoreItem, ValueLabelInterface } from '../interfaces'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns, drawerFilters } from './helpers'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import { formatAndDownloadResponse, formatPayloadDate, getPreviousDay } from 'utils/helpers'
import { DownloadOutlined } from '@mui/icons-material'
import { GroupTable } from 'components/core-ui/GroupTable'
import { TableState } from '../interfaces'
import { toAsyncSelectOptions } from '../commonSerializers'
import { FamilyItem, SubfamilyItem } from '../StoreManagerRole/interfaces'
import { AutoCompleteValue, Filter } from 'components/core-ui/Table/TableDefinitions'

const SalesCadentier = () => {
  const [tableItems, setTableItems] = useState<StoreItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const [dateFilterValue, setDateFilterValue] = useState(getPreviousDay())
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])

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

  const familiesQuery = useQuery(
    ['families', storeFilterValue?.value, liveTableFilters.find(filter => filter.name === 'subfamily')?.value],
    async () => {
      const subfamilyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'subfamily')
        ?.value || []) as AutoCompleteValue[]
      const result = await makeCoreGetRequest('/bakery/store/cadentier/families', {
        params: {
          store: storeFilterValue?.value,
          subfamily: subfamilyLiveFilterValue.map(({ value }) => value)
        },
        paramsSerializer: { indexes: null }
      })

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

  const subfamiliesQuery = useQuery(
    ['subfamilies', storeFilterValue?.value, liveTableFilters.find(filter => filter.name === 'family')?.value],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'family')
        ?.value || []) as AutoCompleteValue[]
      const result = await makeCoreGetRequest('/bakery/store/cadentier/families/subfamilies', {
        params: {
          store: storeFilterValue?.value,
          family: familyLiveFilterValue.map(({ value }) => value)
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
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/product/sale/cadentier',
          filters: [{ name: 'store', value: storeFilterValue?.value }],
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
        tableFilters
      })

      window.history.replaceState(
        {
          ...window.history.state,
          tableState: {
            page,
            rowsPerPage,
            order,
            orderBy,
            tableFilters
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

  const downloadQuery = useQuery(
    ['sales-cadentier-download'],
    async () => {
      const url = toTableGETUrl({
        url: '/bakery/report/download/sale',
        tableFilters: tableState.tableFilters,
        filters: [
          { name: 'store', value: storeFilterValue?.value },
        ].filter(
          f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
        )
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
      <Grid container spacing={2}>
        <Grid xs={12} md={3} item>
          <FilterDataSelect
            name="store"
            defaultSelectedData={storeFilterValue}
            label="Magazin"
            options={stores}
            onSelect={val => handleStoreFilterChange(val)}
            placeholderButton='Selecteaza'
            showSearch
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
                onClick: () => downloadQuery.refetch()
              }
            ]}
            order={tableState.order}
            orderBy={tableState.orderBy}
            tableFilters={tableState.tableFilters}
            filters={drawerFilters(dateFilterValue ,familiesQuery, subfamiliesQuery)}
            handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
            rowsPerPage={25}
            rowsPerPageOptions={[25, 50, 100]}
            filtersLabel="Filtreaza"
            filtersButtonLabel="Filtreaza"
            appliedFiltersLabel="Filtre"
            cancelFiltersButtonLabel="Anuleaza"
            applyFiltersButtonLabel="Aplica"
          />
        </Box>
      )}
    </div>
  )
}

export default SalesCadentier
