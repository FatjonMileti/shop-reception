import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { toTableRowItems } from './serializer'
import { Input } from 'components/core-ui/Input'
import s from '../ProjectMilestones/ProjectMilestones.modules.scss'

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

  const [tableFilter, setTableFilter] = useState({
    projectName: null,
    stage: null,
    iibKey: null,
    ipbKey: null
  })

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

  const tableFilterFields = [
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
          onChange={value => setTableFilter({ ...tableFilter, projectName: value })}
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
          onChange={value => setTableFilter({ ...tableFilter, stage: value })}
          value={tableFilter.projectName}
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
          onChange={value => setTableFilter({ ...tableFilter, iibKey: value })}
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

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        order="asc"
        columns={columnsWithActions}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        filters={tableFilterFields}
      />
    </div>
  )
}

export default ProjectMilestones
