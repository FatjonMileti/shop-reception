import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { toTableRowItems } from './serializer'

const columns = [
  {
    title: 'Project',
    field: 'projectName',
    align: 'left'
  },
  {
    title: 'Stage',
    field: 'stage',
    align: 'left'
  },
  {
    title: 'iibKey',
    field: 'iibKey',
    align: 'left',
    collapsible: true
  },
  {
    title: 'ipbKey',
    field: 'ipbKey',
    align: 'left',
    collapsible: true
  },
  {
    title: 'StartDate',
    field: 'startDate',
    align: 'left',
    collapsible: true
  },
  {
    title: 'EndDate',
    field: 'endDate',
    align: 'left',
    collapsible: true
  }
]

const ProjectMilestones = () => {
  const [tableItems, setTableItems] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const columnsWithActions = useMemo(() => columns, [])

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/projectMilestones',
          tableFilters,
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
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={columnsWithActions}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          filters={[]}
        />
      )}
    </div>
  )
}

export default ProjectMilestones
