import { Grid } from '../../../Common/Grid'
import { Table } from 'components/core-ui/Table'
import { Typography } from '@mui/material'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { EditActionIcon, AddActionIcon, DeleteActionIcon } from 'icons'
import { TransportResponsibleModal } from './TransportResponsibleModal'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'

const TransportResponsible = () => {
  const [tableItems, setTableItems] = useState<TransportResponsible[]>([
    {
      id: 1,
      firstName: "test",
      name: "test",
      emails: "test@example.com"
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<TransportResponsible>()
  const { showNotification } = useNotification()

  const openEditModal = (rowId: number|string): void => {
    selectRow(rowId)
    setIsEditModalOpen(true)
  }
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openDeleteModal = (rowId): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const selectRow = (rowId: number|string) => {
    const row = tableItems.find(item => item.id === rowId)
    if (row) {
      setSelectedRow(row)
    }
  }


  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/packagingIntory',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list

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
    <Grid
      items={[
        <TitleHeader title='Administrare responsabili transport' />,
        <TransportResponsibleModal
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />,
        <TransportResponsibleModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editItem={selectedRow}
          isEdit
        />,
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          actionUrl="/shop-reception/package/transportResponsible/:id"
          itemId={`${selectedRow?.id}`}
          content={<Typography>Esti sigur va vrei sa stergi acest responsabil de transport?</Typography>}
          setShouldRefreshData={setShouldRefreshData}
        />,
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={columns}
          items={tableItems}
          fetchData={() => {}}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          toolbarActions={[
            {
              label: 'Responsabil',
              icon: <AddActionIcon />,
              onClick: openNewModal
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
                openEditModal(rowId)
              }
            },
            {
              label: 'Delete',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#d9534f',
              desktopIcon: <DeleteActionIcon />,
              onClick: (_e, rowId) => openDeleteModal(rowId)
            }
          ]}
          rowActionsWidth='130px'
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default TransportResponsible
