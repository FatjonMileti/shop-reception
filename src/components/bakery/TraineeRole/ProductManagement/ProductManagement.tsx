import { useState } from 'react'
import s from '../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Divider, Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import Table from 'components/core-ui/Table/Table'
import { columns, scheduleProductValues } from './helpers'
import { TableItem } from './interfaces'
import { ValueLabelInterface } from 'components/governance/interfaces'
import { toTableRowItems } from './serializers'
import { toStoreFilterItems } from 'components/bakery/commonSerializers'
import { FamilyItem, SubfamilyItem } from '../ProductionManagement/interfaces'
import { StaticAutocomplete } from 'components/core-ui/StaticAutocomplete'

const ProductManagement = () => {
  const { showNotification } = useNotification()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [scheduleProductFilterValue, setScheduleProductFilterValue] = useState<ValueLabelInterface>(null)
  
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

  const handleScheduleProductChange = (value: ValueLabelInterface): void => {
    setScheduleProductFilterValue(value)
    if (scheduleProductFilterValue === null) return
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
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
              options={filterOptions}
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
          />
        )}
      </Grid>
    </div>
  )
}

export default ProductManagement
