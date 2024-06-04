import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { Table } from 'components/core-ui/Table'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns } from './helpers'
import { toTableRowItems } from './serializers'

const ReceptionStatus = () => {
  const { showNotification } = useNotification()
  const { id } = useParams()
  const [tableItems, setTableItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)


  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/shop-reception/deliveryTicket/details/${id}?tab=traceability_reception`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.traceabilityScanInProcessModelsList))
      setTotalCount(response.page)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <>
      <Table
        hideCheckbox
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        disableSorting
        disablePagination
      />
    </>
  )
}

export default ReceptionStatus
