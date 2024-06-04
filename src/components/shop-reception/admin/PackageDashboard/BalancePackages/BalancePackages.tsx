import { useMemo, useState } from 'react'
import { useNotification } from 'hooks'
import { Table } from 'components/core-ui/Table'
import { columns, getFilters } from './helpers'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { DownloadIcon, EditActionIcon } from 'icons'
import { formatAndDownloadResponse } from 'utils/helpers'
import s from '../../../commonStyles.modules.scss'
import {
  getHubOptions,
  getParentSocietyOptions,
  getShopOptions,
  getSupportTypeOptions
} from '../../api'
import { EditBalancePackage } from './EditBalancePackage'
import { History } from '@mui/icons-material'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const BalancePackages = () => {
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const { data: shopOptions } = getShopOptions(showNotification)
  const { data: hubOptions } = getHubOptions(showNotification)
  const { data: supportTypeOptions } = getSupportTypeOptions(showNotification)
  const { data: parentSocietyOptions } = getParentSocietyOptions(showNotification)

  const filters = useMemo(
    () => getFilters({ shopOptions, hubOptions, supportTypeOptions, parentSocietyOptions }),
    [shopOptions, hubOptions, supportTypeOptions, parentSocietyOptions]
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/support-stocks',
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

  const exportFile = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/shop-reception/support-stocks/export',
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
        message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
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

  const displayHistory = (rowId: number) =>
    navigate(URLS.AUTH_BALANCE_PACKAGING_HISTORY.replace(':id', `${rowId}`))

  return (
    <div className={s.mainContainer}>
      <EditBalancePackage
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
          },
          {
            label: 'Date istorice',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#d9534f',
            desktopIcon: <History htmlColor="rgb(9, 112, 230)" />,
            onClick: (_e, rowId: number) => displayHistory(rowId)
          }
        ]}
        toolbarActions={[
          {
            label: 'Export',
            icon: <DownloadIcon />,
            onClick: exportFile
          }
        ]}
        filters={filters}
        filtersButtonLabel="Filtre"
        filtersLabel="Filtre"
        appliedFiltersLabel="Filtre aplicate"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </div>
  )
}

export default BalancePackages
