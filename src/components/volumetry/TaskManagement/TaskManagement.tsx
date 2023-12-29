import { Box } from '@mui/material'

import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import {
  VOLUMETRY_CATEGORIES_URL,
  VOLUMETRY_DEPARTMENTS_URL,
  VOLUMETRY_FREQUENCIES_URL,
  VOLUMETRY_TASKS_URL,
  columns
} from 'components/volumetry/TaskManagement/constants'
import { useNotification } from 'hooks'
import { AddActionIcon, EditActionIcon } from 'icons'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { TaskManagementItem } from '../interfaces'
import { NewTask } from './NewTask'
import s from './TaskManagement.modules.scss'
import { toTableItems } from './serializers'
import { buildTableFilterFields, mapToValueLabel } from './utils'

const TaskManagement = () => {
  const [tableItems, setTableItems] = useState<TaskManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)

  const { showNotification } = useNotification()

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
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: departmentFilterOptions, isLoading: isDepartmentOptionsLoading } = useQuery(
    ['departmentOptions'],
    async () => {
      const result = await makeCoreGetRequest(VOLUMETRY_DEPARTMENTS_URL)
      const options = mapToValueLabel(result.list) || []
      return options
    },
    {
      onError: error => {
        showNotification({
          message: `Eroare la primire optiuni filtre pentru departamente. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const { data: frequencyFilterOptions, isLoading: isFrequencyOptionsLoading } = useQuery(
    ['frequencyOptions'],
    async () => {
      const result = await makeCoreGetRequest(VOLUMETRY_FREQUENCIES_URL)
      const options = mapToValueLabel(result) || []
      return options
    },
    {
      onError: error => {
        showNotification({
          message: `Eroare la primire optiuni filtre pentru frecventa. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const { data: categoryFilterOptions, isLoading: isCategoryOptionsLoading } = useQuery(
    ['categoryOptions'],
    async () => {
      const result = await makeCoreGetRequest(VOLUMETRY_CATEGORIES_URL)
      const options = mapToValueLabel(result.list) || []
      return options
    },
    {
      onError: error => {
        showNotification({
          message: `Eroare la primire optiuni filtre pentru categorie. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number) => {
    setSelectedRowId(rowId)
    openEditModal()
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
          filters={buildTableFilterFields(
            departmentFilterOptions || [],
            frequencyFilterOptions || [],
            categoryFilterOptions || []
          )}
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => selectRow(rowId)
            }
          ]}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Adauga',
              icon: <AddActionIcon />,
              onClick: openNewModal
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default TaskManagement
