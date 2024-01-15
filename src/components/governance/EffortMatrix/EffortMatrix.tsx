import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import s from './EffortMatrix.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification, usePermissions } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { Table } from 'components/core-ui/Table'
import { toTableRowItems } from './serializers'
import { columns } from './helpers'
import { roles } from './helpers'
import { EffortMatrix } from '../interfaces'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'
import EffortMatrixFormModal from './NewEffortMatrix/EffortMatrixFormModal'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'

const EffortMatrix = () => {
  const [tableItems, setTableItems] = useState<EffortMatrix[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<EffortMatrix>()

  const { showNotification } = useNotification()

  const { canCreate, canEdit, canDelete } = usePermissions(roles)

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const selectRow = (rowId, action) => {
    const row = tableItems.find(item => item.id === rowId)
    if (row) {
      setSelectedRow(row)
      action === 'edit' ? openEditModal() : openDeleteModal()
    }
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/effortMatrix',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list.map(item =>
        typeof item.numberOfHours === 'undefined' || item.numberOfHours === null
          ? { ...item, numberOfHours: '' }
          : item
      )

      setTableItems(toTableRowItems(responseList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <Box>
        <EffortMatrixFormModal
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <EffortMatrixFormModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editItem={selectedRow}
          isEdit
        />
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          actionUrl="/governance/effortMatrix/:id"
          itemId={`${selectedRow?.id}`}
          content={<Typography>Are you sure you want to delete this entry?</Typography>}
          setShouldRefreshData={setShouldRefreshData}
        />
        <Table
          hideCheckbox
          orderBy="role"
          order="asc"
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={canCreate ? { onClick: openNewModal } : null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={[
            canEdit && {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,

              onClick: (_e, rowId) => selectRow(rowId, 'edit')
            },
            canDelete && {
              label: 'Delete',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#d9534f',
              desktopIcon: <DeleteActionIcon />,

              onClick: (_e, rowId) => selectRow(rowId, 'delete')
            }
          ]}
          rowActionsWidth="130px"
          toolbarActions={
            canCreate
              ? [
                  {
                    label: 'Add',
                    icon: <AddActionIcon />,
                    onClick: openNewModal
                  }
                ]
              : []
          }
          rowsPerPageOptions={[20, 50, 100]}
          rowsPerPage={50}
        />
      </Box>
    </div>
  )
}

export default EffortMatrix
