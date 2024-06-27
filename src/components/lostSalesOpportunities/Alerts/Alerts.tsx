import { useState } from 'react'
import { ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './Alerts.modules.scss'
import { toListTableRows } from './serializers'
import { useNotification } from 'hooks'
import { handleQueryError } from 'utils/helpers'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { AlertDateInfo } from '../common/AlertDateInfo'
import { Typography } from '@mui/material'

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
      {totalCount !== 0 ? (
        <>
          <AlertDateInfo validHour={validHour} />
          <ListTable
            rows={rows}
            handleRemoteData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
            setShouldRefreshData={setShouldRefreshData}
            shouldRefreshData={shouldRefreshData}
          />
        </>
      ) : (
        <Typography variant="regular">Nu exista date de afisat.</Typography>
      )}
    </div>
  )
}

export default Alerts
