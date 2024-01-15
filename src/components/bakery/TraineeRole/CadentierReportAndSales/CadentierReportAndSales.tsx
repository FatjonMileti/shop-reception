import s from '../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { Box, Divider, Grid } from '@mui/material'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { TableItem } from './interfaces'
import { DownloadOutlined } from '@mui/icons-material'
import { useQuery } from 'react-query'
import { toStoreFilterItems } from 'components/bakery/commonSerializers'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { TableState, ValueLabelInterface } from 'components/bakery/interfaces'
import { formatAndDownloadResponse } from 'components/bakery/UsageReport/helpers'
import { getPreviousDay } from 'utils/helpers'
import { columns, drawerFilters } from './helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { toTableRowItems } from './serializers'
import { FamilyItem, SubfamilyItem } from '../ProductionManagement/interfaces'
import { AutoCompleteValue, Filter } from 'components/core-ui/Table/TableDefinitions'

const CadentierReportAndSales = () => {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const prevDay = getPreviousDay()
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])
  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

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
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/product/sale/cadentier',
          filters: [{ name: 'store', value: storeFilterValue.value }],
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
        filters: [
          { name: 'store', value: storeFilterValue?.value },
        ]
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
        <Grid xs={12} md={3} item>
          <FilterDataSelect
            name="store"
            defaultSelectedData={storeFilterValue}
            label="Magazin"
            options={storesFilterOptions}
            onSelect={handleStoreFilterChange}
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
            stickyRatio={0.3}
            groupCount={2}
            hasStickyHeader
            frequency="day"
            maxHeight={'600px'}
            toolbarActions={[
              {
                label: 'Descarca',
                icon: <DownloadOutlined />,
                onClick: () => downloadFileQuery.refetch()
              }
            ]}
            filters={drawerFilters(prevDay, familiesQuery, subfamiliesQuery)}
            handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
            rowsPerPage={25}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Box>
      )}
    </div>
  )
}

export default CadentierReportAndSales
