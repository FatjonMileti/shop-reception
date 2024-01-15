import { useState } from 'react'
import s from '../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Divider, Grid } from '@mui/material'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import Table from 'components/core-ui/Table/Table'
import { columns, drawerFilters } from './helpers'
import { TableItem } from './interfaces'
import { ValueLabelInterface } from 'components/governance/interfaces'
import { toTableRowItems } from './serializers'
import { toStoreFilterItems } from 'components/bakery/commonSerializers'
import { FamilyItem, SubfamilyItem } from '../ProductionManagement/interfaces'
import { AutoCompleteValue, Filter } from 'components/core-ui/Table/TableDefinitions'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'

const ProductManagement = () => {
  const { showNotification } = useNotification()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])

  const { data: filterOptions } = useQuery(
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
          url: '/bakery/region/store/products',
          filters: [{ name: 'store', value: storeFilterValue?.value }],
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
              showSearch
            />
          </Grid>
        </Grid>

        <Grid xs={12} item py={2}>
          <Divider />
        </Grid>

        {storeFilterValue && (
          <Table
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
            rowsPerPage={25}
            rowsPerPageOptions={[25, 50, 100]}
            filters={drawerFilters(familiesQuery, subfamiliesQuery)}
            handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
          />
        )}
      </Grid>
    </div>
  )
}

export default ProductManagement
