import { useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './TaskManagement.modules.scss'
import BooleanIcon from 'components/core-ui/BooleanIcon/BooleanIcon'
import { TaskManagementItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Input } from 'components/core-ui/Input'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Delete, Edit } from '@mui/icons-material'
import { NewTask } from './NewTask'
import { toTableItems } from './serializers'
import { useQuery } from 'react-query'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'

export const columns = [
  {
    title: 'Departament',
    field: 'departments',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume task',
    field: 'taskName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Ora estimata de inceput',
    field: 'estimateStartTime',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Ora estimata de final',
    field: 'estimateEndTime',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Frecventa',
    field: 'frequency',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Valoare standard productivitate',
    field: 'prodStandardValue',
    align: 'left',
    type: 'string'
  },
  {
    title: 'UM standard productivitate',
    field: 'prodStandardUM',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Sursa volum de lucru',
    field: 'workVolumeSource',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Prioritate',
    field: 'priority',
    align: 'left',
    type: 'number'
  },
  {
    title: 'Stare',
    field: 'status',
    align: 'left',
    type: 'string',
    render: row => (
      <BooleanIcon icon="CheckOutlined" value={row.status} onSuccess="#33691E" onFailure="E5E5E5" />
    )
  }
]

const tableFilterFields = [
  {
    name: 'departments',
    label: 'Departament',
    type: 'text',
    filter: <Input type="text" name="departments" label="Departament" variant="standard" value="" />
  },
  {
    name: 'taskName',
    label: 'Nume Task',
    type: 'text',
    filter: <Input type="text" name="taskName" label="Nume" variant="standard" />
  },
  {
    name: 'priority',
    label: 'Prioritate',
    type: 'number',
    filter: <Input type="number" name="priority" label="Prioritate" variant="standard" />
  },
  {
    name: 'state',
    label: 'Stare',
    type: 'boolean',
    filter: <Input type="text" name="state" label="Stare" variant="standard" />
  }
]

const TaskManagement = () => {
  const [tableItems, setTableItems] = useState<TaskManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/task',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const selectRow = (row, action) => {
    setSelectedRowId(row.id)

    if (action === 'edit') {
      openEditModal()
    }

    if (action === 'delete') {
      openDeleteModal()
    }
  }

  const columnsWithActions = useMemo(() => {
    let result = columns

    const actionsRow = {
      title: '',
      field: 'actions',
      align: 'right',
      width: '112px',
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

          <Button onClick={() => selectRow(row, 'delete')} label="">
            <Delete />
          </Button>
        </Box>
      )
    } as any

    result = [...columns, actionsRow]

    return result
  }, [columns])

  return (
    <div className={s.mainContainer}>
      <Box>
        <NewTask
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <NewTask
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editItemId={selectedRowId}
          setShouldRefreshData={setShouldRefreshData}
          isEdit
        />
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          actionUrl="/volumetry/task/:id"
          itemId={selectedRowId}
          content={<Typography>Are you sure you want to delete this entry?</Typography>}
          setShouldRefreshData={setShouldRefreshData}
        />
        <Table
          hideCheckbox
          orderBy="department.name"
          order="desc"
          columns={columnsWithActions}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          newButton={{ onClick: openNewModal }}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          filters={tableFilterFields}
        />
      </Box>
    </div>
  )
}

export default TaskManagement
