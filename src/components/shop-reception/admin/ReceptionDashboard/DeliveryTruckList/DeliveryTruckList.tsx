import { columns, drawerFilters } from './helpers'
import { useMemo, useState } from 'react'
import { toTableRowItems } from './serializers'
import { useNavigate } from 'react-router-dom'
import s from '../../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import {
  getDepositOptions,
  getHubOptions,
  geTruckLocation,
  getShopOptions,
  getStatusOptions,
  getArrivalType
} from '../../api'
import { formatAndDownloadResponse } from 'utils/helpers'
import { DownloadIcon } from 'icons'

const DeliveryTruckList = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const [tableItems, setTableItems] = useState<DeliveryTruck[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { data: shopOptions } = getShopOptions(showNotification)
  const { data: hubOptions } = getHubOptions(showNotification)
  const { data: depositOptions } = getDepositOptions(showNotification)
  const { data: statusOptions } = getStatusOptions(showNotification)
  const { data: truckLocationOptions } = geTruckLocation(showNotification)
  const { data: arrivalTypeOptions } = getArrivalType(showNotification)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/delivery-trucks',
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
      url: '/shop-reception/delivery-trucks/export',
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

  const filters = useMemo(
    () => drawerFilters(shopOptions, hubOptions, depositOptions, statusOptions, truckLocationOptions, arrivalTypeOptions),
    [shopOptions, hubOptions, depositOptions, statusOptions, truckLocationOptions, arrivalTypeOptions]
  )

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
        toolbarActions={
          totalCount < 10000
            ? [
                {
                  label: 'Export',
                  icon: <DownloadIcon />,
                  onClick: exportFile
                }
              ]
            : []
        }
        filters={filters}
        filtersLabel="Filtreaza"
        filtersButtonLabel="Filtreaza"
        appliedFiltersLabel="Filtre"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </div>
  )
}

export default DeliveryTruckList
