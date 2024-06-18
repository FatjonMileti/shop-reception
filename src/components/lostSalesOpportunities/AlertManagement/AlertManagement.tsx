import { useState } from 'react'
import { Table } from 'components/core-ui/Table'
import s from './AlertManagement.modules.scss'
import { columns } from './helpers'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'

const AlertManagement = () => {
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [shouldResetPage, setShouldResetPage] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/lso/alerts-configuration',
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      handleQueryError(
        error,
        'A aparut o eroare la obtinerea datelor pentru tabel.',
        showNotification
      )
    }
  }

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        orderBy="articleName"
        order="asc"
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        shouldResetPage={shouldResetPage}
        setShouldResetPage={setShouldResetPage}
        labelRowsPerPage="Randuri pe pagina:"
      />
    </div>
  )
}

export default AlertManagement
