import { PermissionRoles } from 'utils/enums'

export const columns = [
  {
    title: 'Person',
    field: 'teamMemberName',
    align: 'left'
  },
  {
    title: 'Day-Off Type',
    field: 'dayOffType',
    align: 'left'
  },
  {
    title: 'Start Date',
    field: 'startDate',
    align: 'left',
    collapsible: true
  },
  {
    title: 'End Date',
    field: 'endDate',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Hours',
    field: 'numberOfHours',
    align: 'left',
    collapsible: true,
    disableSorting: true
  }
]