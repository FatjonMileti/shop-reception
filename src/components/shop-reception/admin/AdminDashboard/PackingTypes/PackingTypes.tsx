import { Table } from '../../../../core-ui/Table'
import { columns, drawerFilters } from './helpers'
import { Add as AddIcon, CloudDownload as CloudDownloadIcon } from '@mui/icons-material'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { PackingTypeForm } from './PackingTypeForm'
import s from '../../../commonStyles.modules.scss'
import { EditActionIcon } from 'icons'

const PackingTypes = () => {
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<PackingType[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [selectedRow, setSelectedRow] = useState<PackingType>()
  const [modal, setModal] = useState(null)
  const openModal = (action): void => setModal(action)
  const closeModal = () => setModal(null)

  const selectRow = (rowId: number | string) => {
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
          url: '/support-types',
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
      console.log('debug ', error)
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <PackingTypeForm
        isModalOpen={modal === 'create'}
        closeModal={closeModal}
        setShouldRefreshData={setShouldRefreshData}
      />
      <PackingTypeForm
        isModalOpen={modal === 'update'}
        closeModal={closeModal}
        setShouldRefreshData={setShouldRefreshData}
        editItem={selectedRow}
        isEdit
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
            label: 'Export',
            icon: <CloudDownloadIcon />,
            onClick: null
          },
          {
            label: 'Tip ambalaj',
            icon: <AddIcon />,
            onClick: () => openModal('create')
          }
        ]}
        filters={drawerFilters}
      />
    </div>
  )
}

export default PackingTypes
