
export interface TableFilters {
  projectName: string
  stage: string
  iibKey: string
  ipbKey: string
}

export interface TableRowModel {
  id: number
  projectName: string
  stage: string
  iibKey: string
  ipbKey: string
  startDate: string
  endDate: string
}

export interface ProjectMilestonesModel  {
  id: number
  stage: string
  project: ProjectModel
  startDate: string
  endDate: string
}

export interface ProjectModel  {
  id: number
  iibKey: string
  ipbKey: string
  name: string
  tshirtSize: string
}
