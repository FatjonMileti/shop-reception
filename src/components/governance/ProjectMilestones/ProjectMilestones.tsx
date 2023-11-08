import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from '../ProjectMilestones/ProjectMilestones.modules.scss'
import { ProjectMilestonesModel, TableFilters, TableRowModel } from './models'
import { toTableRowItems } from './serializer'
import { buildTableFilterInputs } from './utils'
import { RESOURCE_URI, defaultTableFilters, tableColumns } from './constants'
import { BasePageResponseModel } from 'shared/models'

const ProjectMilestones = () => {
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState([])
  const [tableFilter, setTableFilter] = useState<TableFilters>(defaultTableFilters)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const columnsWithActions = useMemo(() => tableColumns, [])
  const tableFilterInputs = useMemo(() => buildTableFilterInputs(tableFilter, setTableFilter), [])

  const onHandlingFetchResponse = (totalCount: number, list: TableRowModel[]) => {
    setTotalCount(totalCount)
    setTableItems(list)
    setIsLoading(false)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = (await makeCoreGetRequest(
        toTableGETUrl({
          url: RESOURCE_URI,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )) as BasePageResponseModel<ProjectMilestonesModel>
      onHandlingFetchResponse(response.page.totalCount, toTableRowItems(response.list))
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
      onHandlingFetchResponse(0, [])
    }
  }

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        order="desc"
        orderBy="endDate"
        columns={columnsWithActions}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        filters={tableFilterInputs}
      />
    </div>
  )
}

export default ProjectMilestones
