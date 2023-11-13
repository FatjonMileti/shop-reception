
export interface TableFilters {
  "project.name": string
  stage: string
  "project.iibKey": string
  "project.ipbKey": string
}

export interface TableRowModel {
  id: number
  "project.name": string
  stage: string
  "project.iibKey": string
  "project.ipbKey": string
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
