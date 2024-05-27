import { useMemo, useState } from 'react'
import { useNotification } from 'hooks'
import { Table } from 'components/core-ui/Table'
import { getColumns, getFilters } from './helpers'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { DownloadIcon } from 'icons'
import { formatAndDownloadResponse } from 'utils/helpers'
import s from '../../../commonStyles.modules.scss'
import {
  getDepositOptions,
  getParentSocietyOptions,
  getShopOptions,
  getNonCompliantReasonOptions
} from '../../api'

const PackagingCompliance = () => {
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const { data: shopOptions } = getShopOptions(showNotification)
  const { data: despositsOptions } = getDepositOptions(showNotification)
  const { data: parentSocietyOptions } = getParentSocietyOptions(showNotification)
  const { data: nonCompliantReasonOptions } = getNonCompliantReasonOptions(showNotification)

  const filters = useMemo(
    () =>
      getFilters({
        shopOptions,
        despositsOptions,
        parentSocietyOptions,
        nonCompliantReasonOptions
      }),
    [shopOptions, despositsOptions, parentSocietyOptions, nonCompliantReasonOptions]
  )

  const downloadImage = async id => {
    try {
      const response = await makeCoreGetFileRequest(`/shop-reception/pictures/export/${id}`, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la descarcarea imaginilor. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const columns = useMemo(() => getColumns(downloadImage), [])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/delivery-support-packages',
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
      url: '/shop-reception/support-inventories/export',
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
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        rowActionsWidth="130px"
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

export default PackagingCompliance
