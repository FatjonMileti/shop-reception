import { Box, Grid, Paper } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './UsersManagement.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useMemo, useState } from 'react'
import { columns, roles } from './helpers'
import { useNotification, usePermissions } from 'hooks'
import { Edit } from '@mui/icons-material'
import { UsersManagementItem } from '../interfaces'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { toTableRowItems } from './serializers'
import { IconCell } from 'components/core-ui/IconCell'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { EditUser } from './EditUser'
import { UserModal } from 'components/core-ui/UserModal'

const UsersManagement = () => {
  const { canEdit } = usePermissions(roles)
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

  const handleFilterChange = value => {
    // setDomainFilterValue(value)
    setShouldRefreshData(true)
  }

  const selectRow = (row, action) => {
    setSelectedRow(row)
    action === 'edit' && openEditModal()
  }
  const columnsWithActions = useMemo(() => {
    let result = columns

    const statusColumn = {
      title: 'Status',
      field: 'enable',
      align: 'left',
      width: '80px',
      collapsible: 'true',
      render: row => (
        <Box>
          {/* <IconCell value={'active'} /> */}
          <IconCell value={row.status ? 'active' : 'inactive'} />
        </Box>
      )
    } as any

    if (canEdit) {
      const actionsRow = {
        title: '',
        field: 'actions',
        align: 'right',
        width: '70px',
        collapsible: 'true',
        render: row => (
          <Box display="flex">
            {canEdit && (
              <Button
                onClick={() => selectRow(row, 'edit')}
                style={{ minWidth: '0.7rem', background: 'transparent' }}
                label=""
              >
                <Edit />
              </Button>
            )}
          </Box>
        )
      } as any

      result = [...columns, statusColumn, actionsRow]
    }
    return result
  }, [columns, canEdit])

  return (
    <div className={s.mainContainer}>
      <Box>
        {/* <EditUser
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editItem={selectedRow}
          setShouldRefreshData={setShouldRefreshData}
        /> */}
        <UserModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editedItemId={selectedRow?.id}
          // additionalAction={}
          // formAction={}
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
