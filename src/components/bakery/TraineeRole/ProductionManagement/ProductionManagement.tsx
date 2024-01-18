import { useState } from 'react'
import s from '../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Divider, Grid } from '@mui/material'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns, drawerFilters } from './helpers'
import { IdNameInterface, ValueLabelInterface } from 'components/bakery/interfaces'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DownloadOutlined, PrintOutlined } from '@mui/icons-material'
import { formatAndDownloadResponse, getCurrentDate } from 'utils/helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { FamilyItem, SubfamilyItem, TableItem, TableState } from './interfaces'
import { AutoCompleteValue, Filter } from 'components/core-ui/Table/TableDefinitions'
dayjs.extend(customParseFormat)

const ProductionManagement = () => {
  const { showNotification } = useNotification()

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const currentDate = getCurrentDate()

  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])

  const { data: filterOptions } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/trainee/all')
      const resultOptions = result.map(
        (item: IdNameInterface): ValueLabelInterface => ({ label: item.name, value: item.id })
      )
      return resultOptions || []
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
    ['cadentier-families-store', storeFilterValue?.value],
    async () => {
      const result = await makeCoreGetRequest(
        '/bakery/store/cadentier/families',
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
    ['cadentier-subfamilies', storeFilterValue?.value, liveTableFilters.find(filter => filter.name === 'family')?.value],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'family')
        ?.value || []) as AutoCompleteValue[]
      const result = await makeCoreGetRequest(
        '/bakery/store/cadentier/families/subfamilies',
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
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region/cadentier',
          filters: [{ name: 'store', value: storeFilterValue?.value }],
          page,
          tableFilters,
          rowsPerPage,
          order,
          orderBy,
          searchText,
          searchFields: [
            'productName',
            'productMetiCode',
            'average',
            'calculation',
            'quantityToProduce'
          ]
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
            searchText,
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
        url: '/bakery/report/download/cadentier',
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
      <Grid container>
        <Grid xs={12} md={12} container spacing={5}>
          <Grid xs={12} md={3} item>
            <FilterDataSelect
              name="store"
              defaultSelectedData={storeFilterValue}
              label="Magazin"
              options={filterOptions}
              onSelect={handleStoreFilterChange}
              placeholderButton='Selecteaza'
              showSearch
            />
          </Grid>
        </Grid>

        <Grid xs={12} item py={2}>
          <Divider />
        </Grid>

        {storeFilterValue && (
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
            hasStickyHeader
            maxHeight={'600px'}
            hasSearchInput
            toolbarActions={[
              {
                label: 'Descarca',
                icon: <DownloadOutlined />,
                onClick: () => downloadFileQuery.refetch()
              },
              {
                label: 'Printeaza',
                icon: <PrintOutlined />
              }
            ]}
            showAbbrev
            hasPrintAction
            printUrl={'/bakery/formator/cadentier-formator-print'}
            order={tableState.order}
            orderBy={tableState.orderBy}
            tableFilters={tableState.tableFilters}
            filters={drawerFilters(currentDate, familiesQuery, subfamiliesQuery)}
            handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
            rowsPerPage={25}
            rowsPerPageOptions={[25, 50, 100]}
            filtersLabel="Filtreaza"
            filtersButtonLabel="Filtreaza"
            appliedFiltersLabel="Filtre"
            cancelFiltersButtonLabel="Anuleaza"
            applyFiltersButtonLabel="Aplica"
            />
        )}
      </Grid>
    </div>
  )
}

export default ProductionManagement
