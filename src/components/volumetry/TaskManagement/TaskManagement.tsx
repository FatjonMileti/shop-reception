import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './TaskManagement.modules.scss'
import { CRUDAction, TaskManagementTableItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'

import { handleQueryError } from 'utils/helpers'
import { CreateEditTask } from './CreateEditTask'
import { VOLUMETRY_TASKS_URL } from './constants'
import { buildTableFilterFields, columns, toTableRowItems } from './helpers'
import {
  getCategoriesOptions,
  getDepartmentAliasesOptions,
  getFrequencyOptions,
  getPrioritiesOptions,
  getWorkVolumesOptions
} from '../api'
import { useNotification } from 'hooks'
import { DeleteConfirmationModal } from 'components/core-ui/DeleteConfirmationModal'

const TaskManagement = () => {
  const [tableItems, setTableItems] = useState<TaskManagementTableItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(null)

  const { showNotification } = useNotification()

  const { data: categoryOptions } = getCategoriesOptions(showNotification)
  const { data: departmentOptions } = getDepartmentAliasesOptions(showNotification, null, {
    filterBy: 'all',
    filterValue: true
  })
  const { data: priorityOprions } = getPrioritiesOptions(showNotification)
  const { data: frequencyOptions } = getFrequencyOptions(showNotification)
  const { data: workVolumeOptions } = getWorkVolumesOptions(showNotification)

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

      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      handleQueryError(
        error,
        'A aparut o eroare la obtinerea datelor pentru tabel.',
        showNotification
      )
    }
  }

  const [modal, setModal] = useState<CRUDAction>(null)
  const openModal = (action: CRUDAction) => setModal(action)
  const closeModal = () => setModal(null)

  const selectRow = (rowId: number, action: CRUDAction) => {
    setSelectedRowId(rowId)
    openModal(action)
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
        <DeleteConfirmationModal
          isModalOpen={modal === 'delete'}
          closeModal={closeModal}
          actionUrl={`${VOLUMETRY_TASKS_URL}/:id`}
          itemId={selectedRowId}
          content={<Typography>Sunteti sigur ca vreti sa stergeti acest template?</Typography>}
          setShouldRefreshData={setShouldRefreshData}
          title="Sterge template"
          deleteLabel="Sterge"
        />
        <Table
          hideCheckbox
          orderBy="name"
          order="asc"
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          filters={buildTableFilterFields(
            departmentOptions || [],
            categoryOptions || [],
            priorityOprions || [],
            frequencyOptions || [],
            workVolumeOptions || []
          )}
          filtersLabel="Filtreaza"
          appliedFiltersLabel="Filtre"
          applyFiltersButtonLabel="Aplica filtre"
          filtersButtonLabel="Filtreaza"
          cancelFiltersButtonLabel="Renunta"
          labelRowsPerPage="Randuri pe pagina:"
          rowActions={[
            {
              label: 'Editeaza',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (_e, rowId: number) => selectRow(rowId, 'edit')
            },
            {
              label: 'Sterge',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#d9534f',
              desktopIcon: <DeleteActionIcon />,
              onClick: (_e, rowId: number) => selectRow(rowId, 'delete')
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
