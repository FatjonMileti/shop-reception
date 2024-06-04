import { Table } from '../../../../core-ui/Table'
import { columns, drawerFilters } from './helpers'
import { Add as AddIcon, CloudDownload as CloudDownloadIcon } from '@mui/icons-material'
import { useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { PackingTypeForm } from './PackingTypeForm'
import s from '../../../commonStyles.modules.scss'
import { EditActionIcon } from 'icons'
import { useQuery } from 'react-query'
import { formatAndDownloadResponse } from 'utils/helpers'

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
          url: '/shop-reception/support-types',
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

  const handleExport = async tableState => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/shop-reception/support-types/export',
      tableFilters: filters,
      order,
      orderBy
    })

    try {
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea fisierului. ${formatErrorMessage(error)}`,
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
        orderBy="id"
        order="desc"
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
            onClick: handleExport
          },
          {
            label: 'Tip ambalaj',
            icon: <AddIcon />,
            onClick: () => openModal('create')
          }
        ]}
        filters={drawerFilters}
        filtersLabel="Filtreaza"
        filtersButtonLabel="Filtreaza"
        appliedFiltersLabel="Filtre"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </div>
  )
}

export default PackingTypes
