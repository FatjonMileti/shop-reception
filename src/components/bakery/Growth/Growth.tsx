import { Box } from '@mui/material'
import s from '../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { GrowthItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns } from './helpers'
import { EditGrowth } from './EditGrowth'
import { EditActionIcon } from 'icons'

const Growth = () => {
  const [tableItems, setTableItems] = useState<GrowthItem[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const { showNotification } = useNotification()

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/user/growth',
          filters: [],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setTableItems(response.list)

      setTotalCount(response.page.totalCount)

      setIsLoading(false)
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
        <Box>
          <EditGrowth 
            isModalOpen={isEditModalOpen}
            closeModal={closeEditModal}
            setShouldRefreshData={setShouldRefreshData}
            editGrowthId={selectedRowId}
          />
        <Table
          hideCheckbox
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={[
            {
              label: 'Editeaza',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => selectRow(rowId, 'edit')
            },
          ]}
          rowActionsWidth="130px"
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Box>
    </div>
  )
}

export default Growth
