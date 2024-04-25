import { columns } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { AdminHubForm } from './AdminHubForm'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import s from '../../../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { EditActionIcon } from 'icons'
import HubsIntervalModal from './HubsIntervalModal/HubsIntervalModal'

const AdminHub = () => {
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<AdminHub[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<AdminHub>()

  const [modal, setModal] = useState(null)
  const openModal = (action): void => setModal(action)
  const closeModal = () => setModal(null)

  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    row && setSelectedRow(row)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/hubs',
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

  return (
    <div className={s.mainContainer}>
      <AdminHubForm
        isOpen={modal === 'create'}
        closeModal={closeModal}
        setShouldRefreshData={setShouldRefreshData}
      />
      <AdminHubForm
        isOpen={modal === 'update'}
        closeModal={closeModal}
        setShouldRefreshData={setShouldRefreshData}
        editItem={selectedRow}
        isEdit
      />
      <HubsIntervalModal isOpen={modal === 'interval'} closeModal={closeModal} item={selectedRow} />
      <Table
        hideCheckbox
        orderBy="created"
        order="asc"
        columns={columns(setModal, selectRow)}
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
            onClick: (_, rowId) => {
              selectRow(rowId)
              setModal('update')
            }
          }
        ]}
        rowActionsWidth="130px"
        toolbarActions={[
          {
            label: 'Hub',
            icon: <AddIcon />,
            onClick: () => openModal('create')
          }
        ]}
        filtersButtonLabel="Filtre"
        filtersLabel="Filtre"
        appliedFiltersLabel="Filtre aplicate"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </div>
  )
}

export default AdminHub
