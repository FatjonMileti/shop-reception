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
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

const ProductGrowthIndex = () => {
  const { showNotification } = useNotification()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<ProductGrowthIndexItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const familiesQuery = useQuery(
    ['families'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/families')

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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/store/product/growth',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy,
          searchText,
          searchFields: ['productName']
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

  const drawerFilters = [
    {
      name: 'family',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Familie"
          options={familiesQuery.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Familie'
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Grid container>
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
              label: 'Editeaza',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => selectRow(rowId, 'edit')
            }
          ]}
          rowActionsWidth="130px"
          filters={drawerFilters}
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
          filtersLabel="Filtreaza"
          filtersButtonLabel="Filtreaza"
          appliedFiltersLabel="Filtre"
          cancelFiltersButtonLabel="Anuleaza"
          applyFiltersButtonLabel="Aplica"
        />
      </Grid>
    </div>
  )
}

export default ProductGrowthIndex
