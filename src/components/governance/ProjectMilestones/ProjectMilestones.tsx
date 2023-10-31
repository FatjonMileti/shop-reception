import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { toTableRowItems } from './serializer'
import { Input } from 'components/core-ui/Input'
import s from '../ProjectMilestones/ProjectMilestones.modules.scss'
import { ProjectMilestonesResponseModel, TableFilters, TableRowModel } from './models'

const RESOURCE_URI = '/governance/projectMilestones'

const tableColumns = [
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
    title: 'IIBKey',
    field: 'iibKey',
    align: 'left',
    collapsible: true
  },
  {
    title: 'IPBKey',
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

const buildTableFilterInputs = (
  tableFilter: TableFilters,
  setTableFilter: (tableFilters: TableFilters) => void
) => [
  {
    name: 'projectName',
    label: 'Project name',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="projectName"
        label="Project name"
        variant="standard"
        onChange={(value: string) => setTableFilter({ ...tableFilter, projectName: value })}
        value={tableFilter.projectName}
      />
    )
  },
  {
    name: 'stage',
    label: 'Stage',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="stage"
        label="Stage"
        variant="standard"
        onChange={(value: string) => setTableFilter({ ...tableFilter, stage: value })}
        value={tableFilter.stage}
      />
    )
  },
  {
    name: 'iibKey',
    label: 'IIB Key',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="iibKey"
        label="IIB Key"
        variant="standard"
        onChange={(value: string) => setTableFilter({ ...tableFilter, iibKey: value })}
        value={tableFilter.iibKey}
      />
    )
  },
  {
    name: 'ipbKey',
    label: 'IPB Key',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="ipbKey"
        label="IPB Key"
        variant="standard"
        onChange={value => setTableFilter({ ...tableFilter, ipbKey: value })}
        value={tableFilter.ipbKey}
      />
    )
  }
]

const defaultTableFilters: TableFilters = {
  projectName: null,
  stage: null,
  iibKey: null,
  ipbKey: null
}

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
      )) as ProjectMilestonesResponseModel
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
