import { Box, CircularProgress, Divider, Grid } from '@mui/material'
import s from './ProductManagementRegion.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { Add } from '@mui/icons-material'
import { ProductManagementItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useQuery } from 'react-query'
import { toAsyncSelectOptions, toTableRowItems } from './serializers'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { columns } from './helpers'

const ProductManagementRegion = () => {
  const [tableItems, setTableItems] = useState<ProductManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null);

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region/store/products',
          filters: [],
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

  const handleFilterChange = (value: any): void => {
      setStoreFilterValue(value)
      setShouldRefreshData(true);
  }

  return (
    <div className={s.mainContainer}>
      <Box>
          {isStoresLoading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          ) : (
          <Grid xs={12} md={3} item>
            <AsyncAutocomplete
              variant="outlined"
              name="store"
              label="Magazin"
              disableClearable
              value={storeFilterValue}
              options={stores}
              onChange={handleFilterChange}
            />
          </Grid>
          )
        }

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
      </Box>
    </div>
  )
}

export default ProductManagementRegion
