import { Grid } from '../../../../Common/Grid'
import { TitleHeader } from '../../../Common/TitleHeader'
import { Table } from 'components/core-ui/Table'
import { columns } from './helpers'
import { formatErrorMessage } from 'utils/formatting'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { useNotification } from 'hooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const PackagingInventoryHistory = () => {
  const { id } = useParams()
  const [tableItems, setTableItems] = useState<PackagingInventoryHistory[]>([
    {
      id: 1,
      store: "ORADEA",
      supportType: "Palet",
      qualitative: "5",
      defective: "24",
      inventoryManager: "admin",
      inventoryDate: "05/08/2023 16:32"
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/packagingIntory/${id}`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list

      setTableItems(toTableRowItems(responseList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Grid
      hasPaper={true}
      items={[
        <TitleHeader title='Istoric inventar' />,
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={columns}
          items={tableItems}
          fetchData={() => {}}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default PackagingInventoryHistory