import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import s from '../../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { formatAndDownloadResponse, formatUIDate } from 'utils/helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'

const MetiFiles = () => {
  const [tableItems, setTableItems] = useState<MetiFile[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const ticketExternalId = searchParams.get('ticketExternalId')

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    const filters = tableFilters.map(filter =>
      filter.name === 'sentFileDate'
        ? { name: filter.name, value: formatUIDate(filter.value) }
        : filter.name === 'receivedFileDate'
        ? { name: filter.name, value: formatUIDate(filter.value) }
        : filter.name === 'ticketExternalId' && ticketExternalId
        ? { name: filter.name, value: filter.value || ticketExternalId }
        : filter
    )
    ticketExternalId && searchParams.delete('ticketExternalId')
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/metiIntegrationFile',
          tableFilters: filters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.metiIntegrationFileList))

      setTotalCount(response.page.totalCount)
      setTotalCount(0)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
      setIsLoading(false)
    }
  }

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

  const { data: statusList, isLoading: isStatusListLoading } = useQuery(
    ['status-list'],
    async () => {
      const data = await makeCoreGetRequest(
        `/shop-reception/metiIntegrationFile/metiFileStatusList`
      )
      return data.map(item => ({
        label: item,
        value: item
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea statusurilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const downloadSentFile = async id => {
    try {
      const response = await makeCoreGetFileRequest(
        `/shop-reception/metiIntegrationFile/export/${id}`,
        {
          responseType: 'blob'
        }
      )
      return formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const downloadSentFileHistory = async id => {
    try {
      const response = await makeCoreGetFileRequest(
        `/shop-reception/metiIntegrationFile/history/${id}`,
        {
          responseType: 'blob'
        }
      )
      return formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const downloadReceivedFile = async id => {
    try {
      const response = await makeCoreGetFileRequest(
        `/shop-reception/metiIntegrationFile/export/${id}?type=receivedFile`,
        {
          responseType: 'blob'
        }
      )
      return formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const downloadReceivedFileHistory = async id => {
    try {
      const response = await makeCoreGetFileRequest(
        `/shop-reception/metiIntegrationFile/history/${id}?type=receivedFile`,
        {
          responseType: 'blob'
        }
      )
      return formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Grid className={s.mainContainer}>
      <Table
        hideCheckbox
        columns={columns(
          downloadSentFile,
          downloadSentFileHistory,
          downloadReceivedFile,
          downloadReceivedFileHistory,
          navigate
        )}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        filters={drawerFilters(shopCodes, statusList, ticketExternalId)}
      />
    </Grid>
  )
}

export default MetiFiles
