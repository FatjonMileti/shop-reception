import { Divider, Grid } from '@mui/material'
import s from '../../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { ProductManagementItem, SubfamilyItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useQuery } from 'react-query'
import { toTableRowItems } from './serializers'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { columns, drawerFilters } from './helpers'
import { toAsyncSelectOptions } from 'components/bakery/commonSerializers'
import { FamilyItem } from 'components/bakery/StoreManagerRole/interfaces'
import { AutoCompleteValue, Filter } from 'components/core-ui/Table/TableDefinitions'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'

const ProductManagementRegion = () => {
  const [tableItems, setTableItems] = useState<ProductManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null);
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])

  const { data: stores } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/region/all')
      const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region/store/products',
          filters: [{ name: 'store', value: storeFilterValue?.value }],
          searchText,
          searchFields: ["name","metiCode","pluCode","familyName"],
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
              options={stores}
              onSelect={handleStoreFilterChange}
              showSearch
            />
          </Grid>
        </Grid>

        <Grid xs={12} item py={2}>
          <Divider />
        </Grid>
        
        { storeFilterValue && 
        <Table
          hideCheckbox
          hasStickyHeader
          hasSearchInput
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          maxHeight="600px"
          stickyRatio={0.3}
          setShouldRefreshData={setShouldRefreshData}
          filters={drawerFilters(familiesQuery, subfamiliesQuery)}
          handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
        />}
      </Grid>
    </div>
  )
}

export default ProductManagementRegion
