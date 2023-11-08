import { Box } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './Zones.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useMemo, useState } from 'react'
import { columns } from './helpers'
import { useNotification } from 'hooks'
import { Edit } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import { ZoneItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import { EditZone } from './EditZone'
import { AddZone } from './AddZone'

const Zones = () => {
  const [selectedRow, setSelectedRow] = useState<ZoneItem | null>(null)
  const [tableItems, setTableItems] = useState<ZoneItem[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
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

  const selectRow = (row, action) => {
    setSelectedRow(row)
    action === 'edit' && openEditModal()
  }

  const columnsWithActions = useMemo(() => {
    let result = columns

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

    result = [...columns, storesColumn, divisionTypeColumn, statusColumn, actionsRow]
    return result
  }, [columns])

  return (
    <div className={s.mainContainer}>
      <Box className={s.addZoneContainer}>
          <Button
              onClick={() => openAddModal()}
              style={{ minWidth: '0.7rem', background: 'transparent' }}
              label=""
          >
              <AddIcon />
          </Button>  
          <AddZone
            isModalOpen={isAddModalOpen}
            closeModal={closeAddModal}
            setShouldRefreshData={setShouldRefreshData}
          />  
      </Box>
      <Box>
        <EditZone
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editItem={selectedRow}
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
        />
      </Box>
    </div>
  )
}

export default Zones
