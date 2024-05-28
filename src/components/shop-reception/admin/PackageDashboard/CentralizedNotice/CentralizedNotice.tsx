import { useMemo, useState } from 'react'
import { ListTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { formatAndDownloadResponse, handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { debounce } from '@mui/material'
import { getFilters } from './helpers'
import { getDepositOptions, getHubOptions, getShopOptions } from '../../api'
import { formatErrorMessage } from 'utils/formatting'
import { DownloadIcon } from 'icons'
import s from '../../../commonStyles.modules.scss'

const CentralizedNotice = () => {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableState, setTableState] = useState(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: 5
    }
  )
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshsData] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const { data: shopOptions } = getShopOptions(showNotification)
  const { data: hubOptions } = getHubOptions(showNotification)
  const { data: depositOptions } = getDepositOptions(showNotification)

  const filters = useMemo(
    () => getFilters({ shopOptions, hubOptions, depositOptions }),
    [shopOptions, hubOptions, depositOptions]
  )

  const fetchData = async (page, rowsPerPage, tableFilters) => {
    setIsLoading(true)
    setTableState({ page, rowsPerPage })

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/return-truck-notices',
          filters: tableFilters,
          page,
          rowsPerPage
        })
      )

      setRows(toListTableRows(response.list, response.tableHead))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea datelor pentru tabel.',
          showNotification
        )
    }
  }

  const exportFile = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/shop-reception/return-truck-notices/export',
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
      <ListTable
        rows={rows}
        handleRemoteData={debounce(fetchData, 500)}
        isLoading={isLoading}
        totalCount={totalCount}
        filters={filters}
        shouldRefreshedSelectedRowDetails={shouldRefreshData}
        toolbarActions={[
          {
            label: 'Export',
            icon: <DownloadIcon />,
            onClick: exportFile
          }
        ]}
      />
    </div>
  )
}

export default CentralizedNotice
