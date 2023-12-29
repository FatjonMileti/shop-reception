import { Box } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './CollaboratorsTab.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification, usePermissions } from 'hooks'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { EmployeeManagementItem, ValueLabelInterface } from 'components/volumetry/interfaces'
import { columns, roles } from './helpers'
import { DeleteCollaborator } from './DeleteCollaborator'
import { CreateEditCollaborator } from './CreateEditCollaborator'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'
import { useQuery } from 'react-query'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

const CollaboratorsTab = () => {
  const { showNotification } = useNotification()

  // TODO: De actualizat cand primim update cu drepturile fiecarui rol
  const { canCreate, canEdit, canDelete } = usePermissions(roles)

  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<EmployeeManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<EmployeeManagementItem | number>(0)

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const selectRowId = (rowId, action) => {
    const item = tableItems.find(item => item.id === rowId)
    setSelectedRow(item)
    action === 'edit' ? openEditModal() : openDeleteModal()
  }

  const { data: filterOptionsDepartment } = useQuery(
    ['department'],
    async () => {
      const resultDepartment = await makeCoreGetRequest('/volumetry/department')

      const resultOptionsDepartment = resultDepartment.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )
      return resultOptionsDepartment || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: filterOptionsName } = useQuery(
    ['employee'],
    async () => {
      const resultName = await makeCoreGetRequest('/volumetry/employee')

      const resultOptionsName = resultName.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )
      return resultOptionsName || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: filterOptionsPosition } = useQuery(
    ['position'],
    async () => {
      const resultPosition = await makeCoreGetRequest('/volumetry/position')

      const resultOptionsPosition = resultPosition.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )
      return resultOptionsPosition || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/merchendiser',
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

  const tableFilterFields = [
    {
      name: 'name',
      label: 'Nume',
      type: 'autocomplete',
      value: '',
      filter: <Autocomplete variant="outlined" label="Nume" options={filterOptionsName} />
    },
    {
      name: 'department',
      label: 'Departament',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete variant="outlined" label="Departament" options={filterOptionsDepartment} />
      )
    },
    {
      name: 'position',
      label: 'Position',
      type: 'autocomplete',
      value: '',
      filter: <Autocomplete variant="outlined" label="Position" options={filterOptionsPosition} />
    }
  ]
  return (
    <div className={s.mainContainer}>
      <Box>
        <CreateEditCollaborator
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <DeleteCollaborator
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          deleteItem={selectedRow}
          setShouldRefreshData={setShouldRefreshData}
        />
        <CreateEditCollaborator
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editItem={selectedRow}
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
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => selectRowId(rowId, 'edit')
            },
            {
              label: 'Delete',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#d9534f',
              desktopIcon: <DeleteActionIcon />,
              onClick: (e, rowId) => selectRowId(rowId, 'delete')
            }
          ]}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Add',
              icon: <AddActionIcon />,
              onClick: () => (canCreate ? openNewModal() : null) // TODO: To verify permissions with the BE
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default CollaboratorsTab
