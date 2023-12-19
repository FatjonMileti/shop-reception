import { Box } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './MerchandisersTab.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification, usePermissions } from 'hooks'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { Input } from 'components/core-ui/Input'
import { EmployeeManagementItem, ValueLabelInterface } from 'components/volumetry/interfaces'
import { columns, roles } from './helpers'
import { DeleteMerchandiser } from './DeleteMerchandiser'
import { CreateEditMerchandiser } from './CreateEditMerchandiser'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'
import { useQuery } from 'react-query'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'

const MerchandisersTab = () => {
  const { showNotification } = useNotification()

  // TODO: De actualizat cand primim update cu drepturile fiecarui rol
  const { canCreate, canEdit, canDelete } = usePermissions(roles)

  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [nameFilterValue, setNameFilterValue] = useState<ValueLabelInterface>(null)
  const [positionFilterValue, setPositionFilterValue] = useState<ValueLabelInterface>(null)
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
      setDepartmentFilterValue(resultOptionsDepartment[0])
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
      setNameFilterValue(resultOptionsName[0])
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
      setPositionFilterValue(resultOptionsPosition[0])
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

  const handleNameFilterChange = (value: ValueLabelInterface): void => {
    setNameFilterValue(value)
  }
  const handleDepartmentFilterChange = (value: ValueLabelInterface): void => {
    setDepartmentFilterValue(value)
  }
  const handlePositionFilterChange = (value: ValueLabelInterface): void => {
    setPositionFilterValue(value)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const filters =
        nameFilterValue && positionFilterValue && departmentFilterValue
          ? [
              { name: 'name', value: nameFilterValue.value },
              { name: 'position', value: positionFilterValue.value },
              { name: 'department.name', value: departmentFilterValue.value }
            ]
          : []

      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/merchendiser',
          filters: filters,
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
      filter: (
        <div className={s.autoCompleteStyles}>
          <AsyncAutocomplete
            variant="outlined"
            name="name"
            label="Nume"
            disableClearable
            value={nameFilterValue}
            options={filterOptionsName}
            onChange={handleNameFilterChange}
          />
        </div>
      )
    },
    {
      filter: (
        <div className={s.autoCompleteStyles}>
          <AsyncAutocomplete
            variant="outlined"
            name="department.name"
            label="Departament"
            disableClearable
            value={departmentFilterValue}
            options={filterOptionsDepartment}
            onChange={handleDepartmentFilterChange}
          />
        </div>
      )
    },
    {
      filter: (
        <div className={s.autoCompleteStyles}>
          <AsyncAutocomplete
            variant="outlined"
            name="position"
            label="Position"
            disableClearable
            value={positionFilterValue}
            options={filterOptionsPosition}
            onChange={handlePositionFilterChange}
          />
        </div>
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Box>
        <CreateEditMerchandiser
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <DeleteMerchandiser
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          deleteItem={selectedRow}
          setShouldRefreshData={setShouldRefreshData}
        />
        <CreateEditMerchandiser
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
              onClick: () => (canCreate ? openNewModal() : null)
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default MerchandisersTab
