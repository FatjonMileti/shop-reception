import { useState } from 'react'
import { Box } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './TaskManagement.modules.scss'
import { CRUDAction, TaskManagementItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableItems } from './serializers'
import { AddActionIcon, EditActionIcon } from 'icons'
import { IconCell } from 'components/core-ui/IconCell'
import { DescriptionText } from 'components/core-ui/DescriptionText'
import { handleQueryError } from '../utils'
import { CreateEditTask } from './CreateEditTask'
import { VOLUMETRY_TASKS_URL } from './constants'
import { buildTableFilterFields } from './utils'
import { getCategoriesOptions, getDepartmentsOptions } from '../api'
import { useNotification } from 'hooks'

export const columns = [
  {
    title: 'Departament / Raioane',
    field: 'rayonsOrDepartment',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume task',
    field: 'name',
    align: 'left',
    type: 'string',
    width: '250px'
  },
  {
    title: 'Ora recomandata de inceput',
    field: 'recommendedStartHour',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Ora recomandata de final',
    field: 'recommendedEndHour',
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
    title: 'Productivitate',
    field: 'standardProductivityValue',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Sursa volum de lucru',
    field: 'workVolumeSource',
    align: 'left',
    type: 'string',
    collapsible: true,
    minWidth: '200px',
    render: row => <DescriptionText value={row.workVolumeSource} />
  },
  {
    title: 'Prioritate',
    field: 'priority',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Categorie',
    field: 'volumetryLocationCategory',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Activ',
    field: 'isActive',
    align: 'left',
    type: 'string',
    collapsible: true,
    render: row => (
      <Box>
        <IconCell value={row.isActive ? 'active' : 'inactive'} />
      </Box>
    )
  }
]

const TaskManagement = () => {
  const [tableItems, setTableItems] = useState<TaskManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(null)

  const { showNotification } = useNotification()

  const { data: categoryOptions } = getCategoriesOptions(showNotification)
  const { data: departmentOptions } = getDepartmentsOptions(showNotification)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: VOLUMETRY_TASKS_URL,
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
      handleQueryError(error, 'Error while fetching table data', showNotification)
    }
  }

  const [modal, setModal] = useState<CRUDAction>(null)
  const openModal = (action: CRUDAction) => setModal(action)
  const closeModal = () => setModal(null)

  const selectRow = (rowId: number) => {
    setSelectedRowId(rowId)
    openModal('edit')
  }

  return (
    <div className={s.mainContainer}>
      <Box>
        <CreateEditTask
          isModalOpen={modal === 'create'}
          closeModal={closeModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <CreateEditTask
          isModalOpen={modal === 'edit'}
          closeModal={closeModal}
          editItemId={selectedRowId}
          setShouldRefreshData={setShouldRefreshData}
          isEdit
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
          filters={buildTableFilterFields(departmentOptions || [], categoryOptions || [])}
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (_e, rowId: number) => selectRow(rowId)
            }
          ]}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Adauga',
              icon: <AddActionIcon />,
              onClick: () => openModal('create')
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default TaskManagement
