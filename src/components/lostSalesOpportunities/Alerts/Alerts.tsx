import { useState } from 'react'
import { ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './Alerts.modules.scss'
import { Box } from '@mui/material'
import { toListTableRows } from './serializers'
import { useNotification } from 'hooks'
import { getCurrentDate, handleQueryError } from 'utils/helpers'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { AlertDateInfo } from '../common/AlertDateInfo'

const Alerts = () => {
  const [totalCount, setTotalCount] = useState<number>(null)
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validHour, setValidHour] = useState<string>('')
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const fetchData = async (page: number, rowsPerPage: number) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/lso/alerts',
          page,
          rowsPerPage
        })
      )

      setRows(toListTableRows(response.list, setShouldRefreshData))
      setTotalCount(response.page.totalCount)
      setValidHour(response.list[0]?.validHour)
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

  return (
    <div className={s.mainContainer}>
      <AlertDateInfo validHour={validHour} />
      <ListTable
        rows={rows}
        handleRemoteData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        rowActionsWidth="90px"
        setShouldRefreshData={setShouldRefreshData}
        shouldRefreshData={shouldRefreshData}
      />
    </div>
  )
}

export default Alerts
