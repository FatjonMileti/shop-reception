import { ProjectMilestonesModel, TableRowModel } from './models'

export const toTableRowItems = (items: ProjectMilestonesModel[]): TableRowModel[] =>
  items.map(item => ({
    id: item.id,
    "project.name": item.project.name ?? '',
    stage: item.stage ?? '',
    "project.iibKey": item.project.iibKey ?? '',
    "project.ipbKey": item.project.ipbKey ?? '',
    startDate: item.startDate ?? '',
    endDate: item.endDate ?? ''
  }))
