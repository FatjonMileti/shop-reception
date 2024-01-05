import { Input } from 'components/core-ui/Input'
import { TeamCapacityQueryFilter, TeamCapacityTableFilter } from '../interfaces'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { Link } from 'components/core-ui/Link'
import { formatPayloadDate } from 'utils/helpers'

export const buildTableFilterFields = (
  tableFilter: TeamCapacityTableFilter,
  setTableFilter: (tableFilters: TeamCapacityTableFilter) => void
) => [
  {
    name: 'teamMemberName',
    label: 'Person',
    type: 'text',
    filter: <Input type="text" name="teamMemberName" label="Person" variant="outlined" value="" />
  },
  {
    name: 'baseRole',
    label: 'Base Role',
    type: 'text',

    filter: (
      <Input
        type="text"
        name="baseRole"
        label="Base Role"
        variant="outlined"
        onChange={value => setTableFilter({ ...tableFilter, baseRole: value })}
        value={tableFilter.baseRole}
      />
    )
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    value: formatPayloadDate(tableFilter.startDate),
    required: true,

    filter: (
      <DatePicker
        value={tableFilter.startDate}
        onChange={value => setTableFilter({ ...tableFilter, startDate: value })}
        label="Start date"
        variant="outlined"
      />
    )
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    value: formatPayloadDate(tableFilter.endDate),
    required: true,

    filter: (
      <DatePicker
        value={tableFilter.endDate}
        onChange={value => setTableFilter({ ...tableFilter, endDate: value })}
        label="End date"
        variant="outlined"
      />
    )
  }
]

export const buildColumns = ({
  startDate,
  endDate
}: {
  startDate: Date | string
  endDate: Date | string
}) => [
  {
    title: 'Person',
    field: 'teamMemberName',
    align: 'left',
    type: 'string',
    render: (row: any) => (
      <Link
        href={`/governance/projectTeam/individualCapacity/${row.id}?startDate=${startDate}&endDate=${endDate}`}
        style={{ textDecoration: 'inherit' }}
      >
        {row.teamMemberName}
      </Link>
    )
  },
  {
    title: 'Total Effort (MD)',
    field: 'totalEffort',
    align: 'left',
    type: 'number'
  },
  {
    title: 'Total Available (MD)',
    field: 'totalAvailable',
    align: 'left',
    type: 'number'
  },
  {
    title: 'Remaining (MD)',
    field: 'remaining',
    align: 'left',
    type: 'number'
  },
  {
    title: 'Number Of Projects',
    field: 'numberOfProjects',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Base Role',
    field: 'baseRole',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Assigned Roles',
    field: 'assignedRoles',
    align: 'left',
    type: 'string',
    collapsible: true
  }
]

export const mapToTableFilters = (array: Array<TeamCapacityQueryFilter>): TeamCapacityTableFilter =>
  array.reduce((tableFilters, item) => {
    tableFilters[item.name] = item.value
    return tableFilters
  }, {} as TeamCapacityTableFilter)
