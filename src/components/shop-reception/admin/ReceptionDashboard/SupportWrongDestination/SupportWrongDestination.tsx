import { Table } from '../../../../core-ui/Table'
import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { useNavigate } from 'react-router-dom'
import s from '../../../commonStyles.modules.scss'
import { formatAndDownloadResponse } from 'utils/helpers'
import { getDepositOptions, getShopOptions } from '../../api'

const SupportWrongDestination = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<SupportWrongDestination[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { data: depositOptions } = getDepositOptions(showNotification)
  const { data: shopOptions } = getShopOptions(showNotification)
  
  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/wrongDestination',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.deliverySupportList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
      setIsLoading(false)
    }
  }

  const downloadFile = async (id) => {
    try {
      const response = await makeCoreGetFileRequest(`/download/${id}`, {
        responseType: 'blob'
      })
      return formatAndDownloadResponse(response)
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
        columns={columns(navigate, downloadFile)}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        filters={drawerFilters(depositOptions, shopOptions)}
        filtersLabel="Filtreaza"
        filtersButtonLabel="Filtreaza"
        appliedFiltersLabel="Filtre"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </div>
  )
}

export default SupportWrongDestination
