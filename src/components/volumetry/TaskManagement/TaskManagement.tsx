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
import { Add } from '@mui/icons-material'
import { NewTask } from './NewTask'
import { toTableItems } from './serializers'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'

export const columns = [
  {
    title: 'Departament',
    field: 'department',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume task',
    field: 'taskName',
    align: 'left',
    type: 'string',
    width: '250px'
  },
  {
    title: 'Ora estimata de inceput',
    field: 'estimateStartTime',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Ora estimata de final',
    field: 'estimateEndTime',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Frecventa',
    field: 'frequency',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Valoare standard productivitate',
    field: 'prodStandardValue',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'UM standard productivitate',
    field: 'prodStandardUM',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Sursa volum de lucru',
    field: 'workVolumeSource',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Prioritate',
    field: 'priority',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Stare',
    field: 'status',
    align: 'left',
    type: 'string',
    render: row => (
      <BooleanIcon icon="CheckOutlined" value={row.status} onSuccess="#33691E" onFailure="E5E5E5" />
    ),
    collapsible: true
  }
]

const tableFilterFields = [
  {
    name: 'department',
    label: 'Departament',
    type: 'text',
    filter: <Input type="text" name="department" label="Departament" variant="outlined" value="" />
  },
  {
    name: 'taskName',
    label: 'Nume Task',
    type: 'text',
    filter: <Input type="text" name="taskName" label="Nume" variant="outlined" />
  },
  {
    name: 'priority',
    label: 'Prioritate',
    type: 'number',
    filter: <Input type="number" name="priority" label="Prioritate" variant="outlined" />
  }
  // TODO see what should be used here for boolean
  // {
  //   name: 'state',
  //   label: 'Stare',
  //   type: 'boolean',
  //   filter: <Input type="text" name="state" label="Stare" variant="outlined" />
  // }
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

  const selectRow = (rowId: number, action: string) => {
    setSelectedRowId(rowId)

    if (action === 'edit') {
      openEditModal()
    }

    if (action === 'delete') {
      openDeleteModal()
    }
  }

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
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          filters={tableFilterFields}
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              onClick: (e, rowId) => selectRow(rowId, 'edit')
            },
            {
              label: 'Delete',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#d9534f',
              onClick: (e, rowId) => selectRow(rowId, 'delete')
            }
          ]}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Adauga',
              icon: <Add />,
              onClick: openNewModal
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default TaskManagement
