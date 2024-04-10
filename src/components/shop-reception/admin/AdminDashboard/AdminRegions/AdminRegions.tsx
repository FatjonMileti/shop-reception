import { columns } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { AdminRegionForm } from './AdminRegionForm'
import s from '../../../commonStyles.modules.scss'
import { AddActionIcon, EditActionIcon } from 'icons'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'

const AdminRegions = () => {
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<AdminRegion[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<AdminRegion>()

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (rowId: number | string): void => {
    selectRow(rowId)
    setIsEditModalOpen(true)
  }
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    if (row) setSelectedRow(row)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/regions',
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
    <div className={s.mainContainer}>
      <AdminRegionForm
        isModalOpen={isNewModalOpen}
        closeModal={closeNewModal}
        setShouldRefreshData={setShouldRefreshData}
      />
      <AdminRegionForm
        isModalOpen={isEditModalOpen}
        closeModal={closeEditModal}
        setShouldRefreshData={setShouldRefreshData}
        editItem={selectedRow}
        isEdit
      />
      <Table
        hideCheckbox
        orderBy="code"
        order="asc"
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        rowActions={[
          {
            label: 'Edit',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <EditActionIcon />,
            onClick: (e, rowId) => openEditModal(rowId)
          }
        ]}
        rowActionsWidth="130px"
        toolbarActions={[
          {
            label: 'Regiune',
            icon: <AddActionIcon />,
            onClick: openNewModal
          }
        ]}
      />
    </div>
  )
}

export default AdminRegions
