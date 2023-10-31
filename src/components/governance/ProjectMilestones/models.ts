import { GovernanceResponseModel } from '../shared/models'

export type TableFilters = {
  projectName: string
  stage: string
  iibKey: string
  ipbKey: string
}

export type TableRowModel = {
  id: number
  projectName: string
  stage: string
  iibKey: string
  ipbKey: string
  startDate: string
  endDate: string
}

export type ProjectMilestonesResponseModel = GovernanceResponseModel<ProjectMilestonesModel>

export type ProjectMilestonesModel = {
  id: number
  stage: string
  project: ProjectModel
  startDate: string
  endDate: string
}

export type ProjectModel = {
  id: number
  iibKey: string
  ipbKey: string
  name: string
  tshirtSize: string
}
