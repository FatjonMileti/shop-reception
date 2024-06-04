import { useState } from 'react'
import { useNotification } from 'hooks'
import { Table } from 'components/core-ui/Table'
import { columns } from './helpers'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { EditActionIcon } from 'icons'
import { formatAndDownloadResponse } from 'utils/helpers'
import s from '../../../commonStyles.modules.scss'
import { EditPackagingDisputesTimer } from './EditPackagingDisputesTimer'

const PackagingDisputesTimer = () => {
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/returnLitigationTimer',
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
        message: `A aparut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const openModal = () => setIsEditModalOpen(true)
  const closeModal = () => setIsEditModalOpen(false)

  const selectRow = (rowId: number) => {
    const row = tableItems.find(item => item.id === rowId)
    setSelectedRow(row)
    openModal()
  }

  return (
    <div className={s.mainContainer}>
      <EditPackagingDisputesTimer
        isModalOpen={isEditModalOpen}
        closeModal={closeModal}
        editItem={selectedRow}
        setShouldRefreshData={setShouldRefreshData}
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
        rowActions={[
          {
            label: 'Editeaza',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <EditActionIcon />,
            onClick: (_e, rowId: number) => selectRow(rowId)
          }
        ]}
        rowActionsWidth="130px"
      />
    </div>
  )
}

export default PackagingDisputesTimer
