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
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'

const GrowthIndexProductsView = () => {
  const [tableItems, setTableItems] = useState<GrowthIndexProductViewItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])

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

  const handleFamiliesChange = (value: ValueLabelInterface[]): void => {
    setFamiliesFilterValue(value)
    if (familiesFilterValue === null) return
    setShouldRefreshData(true)
  }
  
  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
        const filters = [
          { name: 'store', value: id },
          { name: 'family', value: familiesFilterValue?.map(val => val.value) },
        ].filter(
          f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
        )
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/bakery/product/trainee/growth`,
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
      <Grid xs={12} md={12} container>
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
      </Grid>

      <Grid xs={12} item paddingY={2}>
        <Divider />
      </Grid>

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
        />
      </Box>
    </div>
  )
}

export default GrowthIndexProductsView
