import { Box, CircularProgress, Divider, Grid } from '@mui/material'
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
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { columns, scheduleProductValues } from './helpers'
import { toAsyncSelectOptions } from 'components/bakery/commonSerializers'
import { FamilyItem } from 'components/bakery/StoreManagerRole/interfaces'
import { StaticAutocomplete } from 'components/core-ui/StaticAutocomplete'

const ProductManagementRegion = () => {
  const [tableItems, setTableItems] = useState<ProductManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null);
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [scheduleProductFilterValue, setScheduleProductFilterValue] = useState<ValueLabelInterface>(null)

  const { data: stores, isLoading: isStoresLoading } = useQuery(
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
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: subfamiliesOptions, isLoading: isSubfamilierOptionsLoading } = useQuery(
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
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: storeFilterValue !== null
    }
  )

  const handleFamiliesChange = (value: ValueLabelInterface[]): void => {
    setFamiliesFilterValue(value)
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handleSubfamiliesChange = (value: ValueLabelInterface[]): void => {
    setSubfamiliesFilterValue(value)
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handleScheduleProductChange = (value: ValueLabelInterface): void => {
    setScheduleProductFilterValue(value)
    if (scheduleProductFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handleStoreFilterChange = (value: ValueLabelInterface): void => {
      setStoreFilterValue(value)
      if (storeFilterValue === null) return
      setShouldRefreshData(true);
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)

    try {
      const filters = [
        { name: 'store', value: storeFilterValue?.value },
        { name: 'family', value: familiesFilterValue?.map(val => val.value) },
        { name: 'subfamily', value: subfamiliesFilterValue?.map(val => val.value) },
        { name: 'scheduleProduct', value: scheduleProductFilterValue?.value }
      ].filter(
        f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
      )
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region/store/products',
          filters: filters,
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
            <AsyncAutocomplete
              variant="outlined"
              name="store"
              label="Magazin"
              value={storeFilterValue}
              options={stores}
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
          <Grid xs={12} md={3} item>
            <StaticAutocomplete
              variant="outlined"
              name="scheduleProduct"
              label="Produs cadentier"
              value={scheduleProductFilterValue}
              options={scheduleProductValues}
              onChange={handleScheduleProductChange}
            />
          </Grid>
        </Grid>

        <Grid xs={12} item paddingTop={2}>
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
        />}
      </Grid>
    </div>
  )
}

export default ProductManagementRegion
