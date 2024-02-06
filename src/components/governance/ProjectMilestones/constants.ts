import { TableFilters } from './models'

export const RESOURCE_URI = '/governance/projectMilestones'

export const tableColumns = [
  {
    title: 'Project',
    field: 'project.name',
    align: 'left'
  },
  {
    title: 'Stage',
    field: 'stage',
    align: 'left'
  },
  {
    title: 'IIBKey',
    field: 'project.iibKey',
    align: 'left',
    collapsible: true
  },
  {
    title: 'IPBKey',
    field: 'project.ipbKey',
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
  "project.name": null,
  stage: null,
  "project.iibKey": null,
  "project.ipbKey": null
}
