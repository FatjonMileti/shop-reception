import { Box, Divider, Grid } from '@mui/material'
import s from '../../../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { GrowthIndexProductViewItem } from '../../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { toTableRowItems } from './serializers'
import { columns } from './helpers'
import {useSearchParams } from 'react-router-dom'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { FamilyItem } from 'components/bakery/StoreManagerRole/interfaces'
import { useQuery } from 'react-query'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Filter } from 'components/core-ui/Table/TableDefinitions'

const GrowthIndexProductsView = () => {
  const [tableItems, setTableItems] = useState<GrowthIndexProductViewItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])

  const { showNotification } = useNotification()
  
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const familiesQuery = useQuery(
    ['families', id],
    async () => {
      const result = await makeCoreGetRequest(
        '/bakery/store/families',
        {
          params: {
            store: id,
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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/bakery/product/trainee/growth`,
          filters: [{ name: 'store', value: id },],
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

  const drawerFilters = [
    {
      name: 'family',
      value: undefined,
      filter: (
        <Autocomplete
          variant="outlined"
          label="Familie"
          options={familiesQuery.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Familie',
      clearFiltersOnChange: ['subfamily']
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Box>
        <Table
          hideCheckbox
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
          filters={drawerFilters}
          handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
        />
      </Box>
    </div>
  )
}

export default GrowthIndexProductsView
