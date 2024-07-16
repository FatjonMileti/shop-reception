import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from '../../../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { getColumns } from './helpers'
import { toTableRowItems } from './serializers'

const BalancePackageHistory = () => {
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isForShop, setIsForShop] = useState<boolean>(false)

  const { id } = useParams()

  const { showNotification } = useNotification()

  const columns = useMemo(() => getColumns(isForShop), [isForShop])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/shop-reception/support-stocks/${id}/history`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)

      if (response.list.length && response.list[0].forShop) {
        setIsForShop(true)
      }

      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
      />
    </div>
  )
}

export default BalancePackageHistory
