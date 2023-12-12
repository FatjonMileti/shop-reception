import { useState } from 'react'
import s from '../../commonStyles.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Grid } from '@mui/material'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns } from './helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { ProductGrowthIndexItem } from '../interfaces'
import { EditActionHome } from 'icons'
import { toTableRowItems } from './serializers'
import { EditProductGrowthIndex } from './EditProductGrowthIndex'

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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, searchText }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/store/product/growth',
          filters: [],
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
        <Grid xs={12} md={12} container justifyContent={'space-between'}>
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
                desktopIcon: <EditActionHome />,
                onClick: (e, rowId) => selectRow(rowId, 'edit')
              }
            ]}
            rowActionsWidth="130px"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductGrowthIndex
