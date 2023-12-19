import { useState } from 'react'
import s from '../../commonStyles.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Grid } from '@mui/material'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns } from './helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { FamilyItem, ProductGrowthIndexItem } from '../interfaces'
import { EditActionIcon } from 'icons'
import { toTableRowItems } from './serializers'
import { EditProductGrowthIndex } from './EditProductGrowthIndex'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { useQuery } from 'react-query'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'

const ProductGrowthIndex = () => {
  const { showNotification } = useNotification()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<ProductGrowthIndexItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const familiesQuery = useQuery(
    ['families'],
    async () => {
      const result = await makeCoreGetRequest(
        '/bakery/store/families',
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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, searchText }) => {
    setIsLoading(true)
    try {
      const filters = [
        { name: 'family', value: familiesFilterValue?.map(val => val.value) },
      ].filter(
        f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
      )
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/store/product/growth',
          filters: filters,
          page,
          rowsPerPage,
          order,
          orderBy,
          searchText,
          searchFields: [ 'productName' ]
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

  const selectRow = (rowId: number, action: string) => {
    setSelectedRowId(rowId)

    if (action === 'edit') {
      openEditModal()
    }
  }

  return (
    <div className={s.mainContainer}>
      <Grid container>
        <Grid xs={12} md={12} container spacing={5}>
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
        
        <EditProductGrowthIndex 
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editProductGrowthIndexId={selectedRowId}
          setShouldRefreshData={setShouldRefreshData}
        />
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
          dynamicColumn="growth"
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => selectRow(rowId, 'edit')
            }
          ]}
          rowActionsWidth="130px"
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Grid>
    </div>
  )
}

export default ProductGrowthIndex
