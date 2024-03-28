import { useNotification } from 'hooks'
import s from '../../../commonStyles.modules.scss'
import { useState } from 'react'
import { Table } from 'components/core-ui/Table'
import { columns, drawerFilters } from './helpers'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useQuery } from 'react-query'
import { formatAndDownloadResponse } from 'utils/helpers'
import { DownloadIcon } from 'icons'

const DifferencesProducts = () => {
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<DifferencesProduct[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [downloadImageId, setDownloadImageId] = useState(null)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/productWithDifference',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.productWithDifferenceList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      console.log('debug', error)
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: shopCodes } = useQuery(
    ['shop-codes'],
    async () => {
      const result = await makeCoreGetRequest('/shops/codes')

      const resultOptions = result.map(item => ({
        label: item.displayName,
        value: item.code
      }))
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching shop codes dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { refetch: refetchDownloadImage } = useQuery(
    ['download-image'],
    async () => {
      setDownloadImageId(null)
      const url = toTableGETUrl({
        url: `/productWithDifference/downloadArchive/${downloadImageId}`
      })
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      return formatAndDownloadResponse(response)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while downloading file. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: downloadImageId === null ? false : true
    }
  )

  const handleExport = async (tableState) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/productWithDifference/export',
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
        message: `Error while download file. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: metiRayons } = useQuery(
    ['meti-rayons'],
    async () => {
      const data = await makeCoreGetRequest(`/products/meti-rayons`)
      return data.map(item => ({
        label: item.displayValue,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea raioanelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        orderBy="role"
        order="asc"
        columns={columns(setDownloadImageId)}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        toolbarActions={[
          {
            label: 'Export',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <DownloadIcon />,
            onClick: handleExport
          }
        ]}
        rowActionsWidth="130px"
        filters={drawerFilters(shopCodes, metiRayons)}
      />
    </div>
  )
}

export default DifferencesProducts
