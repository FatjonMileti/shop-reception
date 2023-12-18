import s from '../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { CircularProgress, Grid } from '@mui/material'
import { makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns } from './helpers'
import { toTableRowItems } from './serializers'
import { TableItem } from './interfaces'
import { useQuery } from 'react-query'
import { toStoreFilterItems } from 'components/bakery/commonSerializers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { GroupTable } from 'components/core-ui/GroupTable'

const ProductsGrowthCoefficient = () => {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])

  const { data: stores } = useQuery(
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
    ['families'],
    async () => {
      const result = await makeCoreGetRequest(
        '/bakery/store/families',
        {
          params: {
            store: storeFilterValue?.value
          },
          paramsSerializer: { indexes: null }
        }
      )

      return toStoreFilterItems(result) || []
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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    const filters = [
      { name: 'store', value: storeFilterValue?.value },
      { name: 'family', value: familiesFilterValue?.map(val => val.value) },
    ].filter(
      f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
    )
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/product/trainee/growth',
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

      return response
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const handleStoreFilterChange = (value: ValueLabelInterface): void => {
    setStoreFilterValue(value)
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handleFamiliesFilterChange = (value: ValueLabelInterface[]): void => {
    setFamiliesFilterValue(value)
    if (familiesFilterValue === null) return
    setShouldRefreshData(true)
  }

  return (
    <div className={s.mainContainer}>
      <Grid container>
        <Grid xs={12} md={12} spacing={2} container marginBottom={2}>
          <Grid xs={12} md={4} item>
              <AsyncAutocomplete
                variant="outlined"
                name="store"
                label="Magazin"
                value={storeFilterValue}
                options={stores}
                onChange={handleStoreFilterChange}
              />
          </Grid>
          <Grid xs={12} md={4} item>
              <AsyncAutocomplete
                variant="outlined"
                name="family"
                label="Familie"
                value={familiesFilterValue}
                options={familiesQuery.data || []}
                onChange={handleFamiliesFilterChange}
                multiple
              />
          </Grid>
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
          />
        )}
      </Grid>
    </div>
  )
}

export default ProductsGrowthCoefficient
