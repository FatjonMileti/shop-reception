import { Box } from '@mui/material'
import s from './Zones.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useMemo, useState } from 'react'
import { columns } from './helpers'
import { useNotification } from 'hooks'
import { Add } from '@mui/icons-material'
import { ZoneItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import { EditZone } from './EditZone'
import { AddZone } from './AddZone'

const Zones = () => {
  const [tableItems, setTableItems] = useState<ZoneItem[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
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
          url: '/bakery/zone',
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

  const columnsWithActions = useMemo(() => {
    const storesColumn = {
      title: 'Magazin',
      field: 'stores',
      align: 'left',
      width: '140px',
      collapsible: 'true',
      render: row => (
        <Box>
          <MultivalueCell value={row.stores} />
        </Box>
      )
    } as any

    const divisionTypeColumn = {
      title: 'Divizie',
      field: 'divisionType',
      align: 'left',
      collapsible: true,
      render: row => (
        <Box>
          {row.divisionType}
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

    return [...columns, storesColumn, divisionTypeColumn, statusColumn]
  }, [columns])

  return (
    <div className={s.mainContainer}>
      {/* TODO add search bar after redesigns */}
      <Box>
        <AddZone
          isModalOpen={isAddModalOpen}
          closeModal={closeAddModal}
          setShouldRefreshData={setShouldRefreshData}
        />  
        <EditZone
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editItemId={selectedRowId}
          setShouldRefreshData={setShouldRefreshData}
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
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              onClick: (e, rowId) => selectRow(rowId, 'edit')
            }
          ]}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Adauga Zona',
              icon: <Add />,
              onClick: openAddModal
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default Zones
