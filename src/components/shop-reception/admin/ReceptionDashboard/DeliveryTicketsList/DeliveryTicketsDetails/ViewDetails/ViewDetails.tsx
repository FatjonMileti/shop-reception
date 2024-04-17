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

  const [filters, setFilters] = useState([])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setShopCode(tableFilters[0].value.value)
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/shop-reception/deliveryTicket/details/${id}/info`,
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

      const filters = response.list.reduce(
        (acc, current) => {
          return {
            supportCode: [
              ...acc.supportCode.filter(
                obj => obj.value !== current.supportCode || obj.label !== current.supportCode
              ),
              { value: current.supportCode, label: current.supportCode }
            ],
            externalOrderId: [
              ...acc.externalOrderId.filter(
                obj =>
                  obj.value !== current.externalOrderId || obj.label !== current.externalOrderId
              ),
              { value: current.externalOrderId, label: current.externalOrderId }
            ],
            originalOrderId: [
              ...acc.originalOrderId.filter(
                obj =>
                  obj.value !== current.originalOrderId || obj.label !== current.originalOrderId
              ),
              { value: current.originalOrderId, label: current.originalOrderId }
            ],
            productCode: [
              ...acc.productCode.filter(
                obj => obj.value !== current.productCode || obj.label !== current.productCode
              ),
              { value: current.productCode, label: current.productCode }
            ]
          }
        },
        {
          supportCode: [],
          externalOrderId: [],
          originalOrderId: [],
          productCode: []
        }
      )

      setFilters(filters)
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
      const response = await makeCoreGetFileRequest(
        `/shop-reception/deliveryTicket/detailsExport/${id}`,
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

  const { data: shopCodes, isLoading: isShopCodesLoading } = useQuery(
    ['shop-codes'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/shops/codes`)
      return data.list.map(item => ({
        label: item.displayName,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea tipurilor de magazine. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
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
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        filters={drawerFilters(shopCodes, filters)}
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
