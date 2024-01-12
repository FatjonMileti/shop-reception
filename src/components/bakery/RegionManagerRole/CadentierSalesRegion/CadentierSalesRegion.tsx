import { Box, Divider, Grid } from '@mui/material'
import s from '../../commonStyles.modules.scss'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { StoreItem, ValueLabelInterface } from '../../interfaces'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns, drawerFilters } from './helpers'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import { formatAndDownloadResponse, getPreviousDay } from 'utils/helpers'
import { DownloadOutlined } from '@mui/icons-material'
import { GroupTable } from 'components/core-ui/GroupTable'
import { TableState } from '../../interfaces'
import { toAsyncSelectOptions } from 'components/bakery/commonSerializers'
import { SubfamilyItem } from '../interfaces'
import { FamilyItem } from 'components/bakery/StoreManagerRole/interfaces'
import { AutoCompleteValue, Filter } from 'components/core-ui/Table/TableDefinitions'

const CadentierSalesRegion = () => {
  const [tableItems, setTableItems] = useState<StoreItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])
  const prevDay = getPreviousDay()
  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

  const { data: stores } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/region/all')
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

  const subfamiliesQuery = useQuery(
    ['subfamilies', storeFilterValue?.value, liveTableFilters.find(filter => filter.name === 'family')?.value],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'family')
        ?.value || []) as AutoCompleteValue[]
      const result = await makeCoreGetRequest(
        '/bakery/store/families/subfamilies',
        {
          params: {
            store: storeFilterValue?.value,
            family: familyLiveFilterValue.map(({ value }) => value)
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
    setShouldRefreshData(true);
}

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region/sale/cadentier',
          tableFilters,
          filters: [{ name: 'store', value: storeFilterValue?.value }],
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

  const downloadFileQuery = useQuery(
    ['download'],
    async () => {
      const url = toTableGETUrl({
        url: '/bakery/report/download/sale',
        tableFilters: tableState.tableFilters,
        filters:[{ name: 'store', value: storeFilterValue?.value }]
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
              onSelect={handleStoreFilterChange}
              placeholderButton="Selecteaza"
              showSearch
            />
          </Grid>
        </Grid>

      <Grid xs={12} item py={2}>
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
                      onClick: () => downloadFileQuery.refetch()
                  }
              ]}
              order={tableState.order}
              orderBy={tableState.orderBy}
              tableFilters={tableState.tableFilters}
              filters={drawerFilters(prevDay, familiesQuery, subfamiliesQuery)}
              handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
              rowsPerPage={25}
              rowsPerPageOptions={[25, 50, 100]}
              filtersLabel='Filtreaza'
              filtersButtonLabel="Filtreaza"
              appliedFiltersLabel="Filtre"
              cancelFiltersButtonLabel="Anuleaza"
              applyFiltersButtonLabel='Aplica'
          />
        </Box>
      )}
    </div>
  )
}

export default CadentierSalesRegion
