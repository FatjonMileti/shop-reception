import { Add, CalendarMonth } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { BasePageResponseModel } from 'shared/interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from './MyTimeOff.modules.scss'
import { NewTimeOff } from './NewTimeOff'
import { columns } from './helpers'
import { TableRowModel, TimeOffModel } from './interfaces'
import { toTableRowItems } from './serializers'
import { DeleteActionHome, EditActionHome } from 'icons'
import { PublicHolidays } from '../PublicHolidays'

const MyTimeOff = () => {
  const [tableItems, setTableItems] = useState<TableRowModel[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isPublicHolidaysModalOpen, setIsPublicHolidaysModalOpen] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<TableRowModel>()

  const { showNotification } = useNotification()

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const openPublicHolidaysModal = (): void => setIsPublicHolidaysModalOpen(true)
  const closePublicHolidaysModal = (): void => setIsPublicHolidaysModalOpen(false)

  const rowActions = useMemo(() => {
    const selectRow = (rowId: number, action: string) => {
      const item = tableItems.find(item => item.id === rowId)
      setSelectedRow(item)
      action === 'edit' ? openEditModal() : openDeleteModal()
    }
    let actions = [
      {
        label: 'Edit',
        labelColor: 'white',
        typographyVariant: 'medium',
        backgroundColor: '#0970E6',
        desktopIcon: <EditActionHome />,
        onClick: (e, rowId) => selectRow(rowId, 'edit')
      },
      {
        label: 'Delete',
        labelColor: 'white',
        typographyVariant: 'medium',
        backgroundColor: '#CC4010',
        desktopIcon: <DeleteActionHome />,
        onClick: (e, rowId) => selectRow(rowId, 'delete')
      }
    ]

    return actions
  }, [columns, tableItems])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = (await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/myTimeOff',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )) as BasePageResponseModel<TimeOffModel>
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

  return (
    <div className={s.mainContainer}>
      <Box>
        <PublicHolidays
          isModalOpen={isPublicHolidaysModalOpen}
          closeModal={closePublicHolidaysModal}
        />
        <NewTimeOff
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <NewTimeOff
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editItem={selectedRow}
          setShouldRefreshData={setShouldRefreshData}
          isEdit
        />
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          actionUrl="/governance/teamTimeOff/:id"
          itemId={`${selectedRow?.id}`}
          content={<Typography>Are you sure you want to delete this entry?</Typography>}
          setShouldRefreshData={setShouldRefreshData}
        />
        <Table
          hideCheckbox
          orderBy="startDate"
          order="asc"
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          newButton={{ onClick: openNewModal }}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={rowActions}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Holidays',
              icon: <CalendarMonth />,
              onClick: () => openPublicHolidaysModal()
            },
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

export default MyTimeOff
