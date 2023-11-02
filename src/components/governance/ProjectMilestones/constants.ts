import { TableFilters } from './models'

export const RESOURCE_URI = '/governance/projectMilestones'

export const tableColumns = [
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

export const defaultTableFilters: TableFilters = {
  projectName: null,
  stage: null,
  iibKey: null,
  ipbKey: null
}
