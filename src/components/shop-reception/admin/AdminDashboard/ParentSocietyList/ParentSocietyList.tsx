import { columns } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { DeleteActionIcon, EditActionIcon } from 'icons'
import { Box, Typography } from '@mui/material'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import { useNotification } from 'hooks'
import s from '../../../commonStyles.modules.scss'
import ParentSocietyListModal from './ParentSocietyListModal/ParentSocietyListModal'
import { DeleteConfirmationModal } from 'components/core-ui/DeleteConfirmationModal'

const ParentSocietyList = () => {
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<ParentSociety[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<ParentSociety>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const openNewModal = () => setIsNewModalOpen(true)
  const closeNewModal = () => setIsNewModalOpen(false)

  const openEditModal = () => setIsEditModalOpen(true)
  const closeEditModal = () => setIsEditModalOpen(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const selectRow = (rowId: number | string) => {
    setSelectedRow(tableItems.find(item => item.id === rowId))
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/parentSociety',
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.parentSocietyList))
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
        <ParentSocietyListModal
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <ParentSocietyListModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editItem={selectedRow}
          isEdit
        />
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          actionUrl="/shop-reception/parentSociety/:id/delete"
          itemId={`${selectedRow?.id}`}
          content={<Typography>Esti sigur va vrei sa stergi acest produs?</Typography>}
          setShouldRefreshData={setShouldRefreshData}
          succesMessage="Societatea a fost stearsa cu succes."
          cancelLabel="Anuleaza"
          deleteLabel="Sterge"
        />
        <Table
          hideCheckbox
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Adauga',
              icon: <AddIcon />,
              onClick: () => openNewModal()
            }
          ]}
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => {
                selectRow(rowId)
                openEditModal()
              }
            },
            {
              label: 'Delete',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#e15656',
              desktopIcon: <DeleteActionIcon />,
              onClick: (e, rowId) => {
                selectRow(rowId)
                openDeleteModal()
              }
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default ParentSocietyList
