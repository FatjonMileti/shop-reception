import { Box } from '@mui/material'
import s from './Regions.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { Add } from '@mui/icons-material'
import { UsersManagementItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { AddRegion } from './AddRegion'

const columns = [
  {
    title: 'Denumire regiune',
    field: 'name',
    align: 'left'
  },
  {
    title: 'Responsabil',
    field: 'responsible',
    align: 'left'
  },
  {
    title: 'Magazin',
    field: 'stores',
    align: 'left',
    render: row => (
        <Box>
            <MultivalueCell value={row.stores} />
        </Box>
    )
  },
  {
    title: 'Divizie',
    field: 'divisionType',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Status',
    field: 'enable',
    align: 'left',
    type: 'string',
    render: row => (
      <BooleanIcon icon="CheckOutlined" value={row.enable} onSuccess="#33691E" onFailure="E5E5E5" />
    ),
    collapsible: true
  }
]

const Regions = () => {
  const [tableItems, setTableItems] = useState<UsersManagementItem[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const { showNotification } = useNotification()

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openAddModal = (): void => setIsAddModalOpen(true)
  const closeAddModal = (): void => setIsAddModalOpen(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region',
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
      {/* TODO add table search bar after UI redesign */}
      <Box>
        <AddRegion
            isModalOpen={isAddModalOpen}
            closeModal={closeAddModal}
            setShouldRefreshData={setShouldRefreshData}
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
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              onClick: (e, rowId) => selectRow(rowId, 'edit')
            },
          ]}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Adauga',
              icon: <Add />,
              onClick: openAddModal
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default Regions
