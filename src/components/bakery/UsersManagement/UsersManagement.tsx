import { Box } from '@mui/material'
import s from '../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useMemo, useState } from 'react'
import { useNotification } from 'hooks'
import { UsersManagementItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import { toTableRowItems } from './serializers'
import { columns } from './helpers'
import { EditUser } from './EditUser'
import { EditActionIcon } from 'icons'

const UsersManagement = () => {
  const [tableItems, setTableItems] = useState<UsersManagementItem[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const { showNotification } = useNotification()

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/user',
          filters: [],
          searchText,
          searchFields: ["firstName","lastName","storeName","regionName","roles"],
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

  const selectRow = (rowId: number, action: string) => {
    setSelectedRowId(rowId)

    if (action === 'edit') {
      openEditModal()
    }
  }

  return (
    <div className={s.mainContainer}>
      <Box>
        <EditUser 
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editUserId={selectedRowId}
        />
        <Table
          hideCheckbox
          hasSearchInput
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
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
      </Box>
    </div>
  )
}

export default UsersManagement
