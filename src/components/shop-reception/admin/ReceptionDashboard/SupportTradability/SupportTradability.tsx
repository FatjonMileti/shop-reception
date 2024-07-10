import { Table } from '../../../../core-ui/Table'
import { columns, drawerFilters } from './helpers'
import { useMemo, useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import s from '../../../commonStyles.modules.scss'
import {
  getDepositOptions,
  getHubOptions,
  getLocation,
  getParentSocietyOptions,
  getShopOptions
} from '../../api'
import { DownloadIcon } from 'icons'
import { formatAndDownloadResponse } from 'utils/helpers'

const SupportTradability = () => {
  const [tableItems, setTableItems] = useState<SupportTradability[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/supportTraceability',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.supportTraceabilityList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea datelor. ${formatErrorMessage(error)}`,
        type: 'error'
      })
      setIsLoading(false)
    }
  }

  const { data: shopOptions } = getShopOptions(showNotification)
  const { data: depositOptions } = getDepositOptions(showNotification)
  const { data: hubOptions } = getHubOptions(showNotification)
  const { data: societyOptions } = getParentSocietyOptions(showNotification)
  const { data: locationOptions } = getLocation(showNotification)

  const filters = useMemo(
    () => drawerFilters(shopOptions, depositOptions, hubOptions, societyOptions, locationOptions),
    [shopOptions, depositOptions, hubOptions, societyOptions, locationOptions]
  )

  const exportFile = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/shop-reception/supportTraceability/export',
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
        order="desc"
        orderBy="id"
        hideCheckbox
        columns={columns}
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
        rowActionsWidth="130px"
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

export default SupportTradability
