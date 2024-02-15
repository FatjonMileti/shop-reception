import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { Table } from 'components/core-ui/Table'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns, drawerFilters } from './helpers'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { toTableRowItems } from './serializers'
import { DownloadIcon } from 'icons'

const EditDetails = () => {
  const { showNotification } = useNotification()
  const { id } = useParams()
  const [tableItems, setTableItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [infoData, setInfoData] = useState(null)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/deliveryTicket/${id}/edit`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setInfoData(response)

      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <>

      <Table
        hideCheckbox
        orderBy="shopCode"
        order="asc"
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        filters={drawerFilters}
        disableSorting
        disablePagination
      />
    </>
  )
}

export default EditDetails
