import { useParams } from 'react-router-dom'
import { tab3Columns } from '../helpers'
import { Table } from '../../../../core-ui/Table'
import { useState } from 'react'

const Tab3 = () => {
  const { id } = useParams()
  const [tableItems, setTableItems] = useState([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  return (
    <Table
      hideCheckbox
      orderBy='role'
      order='asc'
      columns={tab3Columns}
      items={tableItems}
      fetchData={null}
      isLoading={isLoading}
      totalCount={totalCount}
      newButton={null}
      shouldRefreshData={shouldRefreshData}
      setShouldRefreshData={setShouldRefreshData}
      rowActionsWidth='130px'
    />
  )
}

export default Tab3
