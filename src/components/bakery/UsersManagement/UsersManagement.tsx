import { Box } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './UsersManagement.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useMemo, useState } from 'react'
import { useNotification } from 'hooks'
import { Edit } from '@mui/icons-material'
import { UsersManagementItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { IconCell } from 'components/core-ui/IconCell'
import { UserModal } from 'components/bakery/UsersManagement/UserModal'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import { toTableRowItems } from './serializers'

const columns = [
  {
    title: 'Nume user',
    field: 'lastName',
    align: 'left'
  },
  {
    title: 'Prenume User',
    field: 'firstName',
    align: 'left'
  },
  {
    title: 'Magazin',
    field: 'storeName',
    align: 'left'
  },
  {
    title: 'Regiune',
    field: 'regionName',
    align: 'left',
    collapsible: true
  },
]

const UsersManagement = () => {
  const [selectedRow, setSelectedRow] = useState<UsersManagementItem | null>(null)
  const [tableItems, setTableItems] = useState<UsersManagementItem[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/user',
          filters: [],
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

  const selectRow = (row, action) => {
    setSelectedRow(row)
    action === 'edit' && openEditModal()
  }
  const columnsWithActions = useMemo(() => {
    const roleColumn = {
      title: 'Rol',
      field: 'roles',
      align: 'left',
      width: '140px',
      collapsible: 'true',
      render: row => (
        <Box>
          <MultivalueCell value={row.roles} />
        </Box>
      )
    } as any

    const statusColumn = {
      title: 'Status',
      field: 'enable',
      align: 'left',
      width: '80px',
      collapsible: 'true',
      render: row => (
        <Box>
          <IconCell value={row.enable ? 'active' : 'inactive'} />
        </Box>
      )
    } as any

    let actionsRow = {
      title: '',
      field: 'actions',
      align: 'right',
      width: '70px',
      collapsible: 'true',
      render: row => (
        <Box display="flex">          
            <Button
              onClick={() => selectRow(row, 'edit')}
              style={{ minWidth: '0.7rem', background: 'transparent' }}
              label=""
            >
              <Edit />
            </Button>          
        </Box>
      )
    } as any

    return [...columns, roleColumn, statusColumn, actionsRow]
  }, [columns])

  return (
    <div className={s.mainContainer}>
      {/* TODO add table search bar after UI redesign */}
      <Box>
        <UserModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editedItemId={selectedRow?.id}
          formAction={{ url: `/bakery/user/${selectedRow?.id}` }}
          additionalAction={() => setShouldRefreshData(true)}
          userModal={{
            getAction: '/bakery/user',
            getRolesAction: '/bakery/role',
            getStructuresAction: '/bakery/structure/role',
            putAction: '/bakery/user'
          }}
        />
        <Table
          hideCheckbox
          columns={columnsWithActions}
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

export default UsersManagement
