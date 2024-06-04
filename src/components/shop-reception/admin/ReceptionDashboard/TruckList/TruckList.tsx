import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { useNavigate } from 'react-router-dom'
import s from '../../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import { getDepositOptions, getHubOptions, getLocation, getShopOptions, getStatusOptions } from '../../api'
import { formatAndDownloadResponse } from 'utils/helpers'
import { DownloadIcon } from 'icons'

const TruckList = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const [tableItems, setTableItems] = useState<TruckItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { data: shopOptions } = getShopOptions(showNotification)
  const { data: hubOptions } = getHubOptions(showNotification)
  const { data: depositOptions } = getDepositOptions(showNotification)
  const { data: statusOptions } = getStatusOptions(showNotification)
  const { data: locationOptions } = getLocation(showNotification)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/truck',
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
      url: '/shop-reception/truck/export',
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

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        columns={columns(navigate)}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        toolbarActions={[
          {
            label: 'Export',
            icon: <DownloadIcon />,
            onClick: exportFile
          }
        ]}
        filters={drawerFilters(shopOptions, hubOptions, depositOptions, statusOptions, locationOptions)}
        filtersLabel="Filtreaza"
        filtersButtonLabel="Filtreaza"
        appliedFiltersLabel="Filtre"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </div>
  )
}

export default TruckList
