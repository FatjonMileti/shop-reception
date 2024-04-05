import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { Table } from 'components/core-ui/Table'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { toTableRowItems } from './serializers'
import { DownloadIcon } from 'icons'
import { DeliveryTicketDetails } from '../../interfaces'
import { useQuery } from 'react-query'
import { formatAndDownloadResponse } from 'utils/helpers'
import { columns, drawerFilters } from './helpers'

const ViewDetails = () => {
  const { showNotification } = useNotification()
  const { id } = useParams()
  const [tableItems, setTableItems] = useState<DeliveryTicketDetails[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [infoData, setInfoData] = useState(null)
  const [shopCode, setShopCode] = useState<string>(null)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setShopCode(tableFilters[0].value.value)
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/shop-reception/deliveryTicket/${id}/info`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const {
        depositName,
        expectedDeliveryDate,
        transportCode,
        numberOfSupports,
        validatedSupports
      } = response

      setInfoData({
        depositName,
        expectedDeliveryDate,
        transportCode,
        numberOfSupports,
        validatedSupports
      })

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

  const { refetch: downloadMetiFiles } = useQuery(
    ['downloadMetiFiles'],
    async () => {
      if (typeof shopCode === 'undefined') {
        showNotification({
          message: `Selecteaza un magazin mai intai.`,
          type: 'error'
        })

        return
      }

      const response = await makeCoreGetFileRequest(
        `/shop-reception/deliveryTicket/sentToMeti/${id}/${shopCode}`,
        {
          responseType: 'blob'
        }
      )
      return formatAndDownloadResponse(response)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching file. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  const { refetch: exportFiles } = useQuery(
    ['exportFiles'],
    async () => {
      const response = await makeCoreGetFileRequest(`/shop-reception/deliveryTicket/detailsExport/${id}`, {
        responseType: 'blob'
      })
      return formatAndDownloadResponse(response)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching file. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  return (
    <>
      <FormInfoItems
        items={[
          { label: 'Depozit sursa:', name: infoData?.depositName },
          { label: 'Data estimata de livrare:', name: infoData?.expectedDeliveryDate },
          { label: 'Cod sursa:', name: infoData?.transportCode },
          { label: 'Numarul de suporti asteptati:', name: infoData?.numberOfSupports },
          { label: 'Numarul de suporti ajungi la destinatie:', name: infoData?.validatedSupports }
        ]}
      />
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
        toolbarActions={[
          {
            label: 'Export',
            icon: <DownloadIcon />,
            onClick: () => exportFiles()
          },

          {
            label: 'Fisiere METI',
            icon: <DownloadIcon />,
            onClick: () => downloadMetiFiles()
          }
        ]}
      />
    </>
  )
}

export default ViewDetails
