import { AsyncAutocompleteOption } from 'components/core-ui/AsyncAutocomplete/AsyncAutocompleteDefinitions'

export interface ValueLabelInterface {
  value: string | number
  label: string | number
}

export interface AutocompleteOption {
  label: string
  value: string | number
}

export interface EmployeeManagementItem {
  id?: string | number
  department: string | AutocompleteOption
  fullName: string
  jobTitle: string | AutocompleteOption
  employer: string
  location?: string
}

export interface TaskManagementTableItem {
  id?: string | number
  name: string
  rayonsOrDepartment: string
  recommendedStartHour: string
  recommendedEndHour: string
  frequency: string
  standardProductivityValue: number
  measurementUnit: string
  workVolumeSource: string
  priority: string
  isActive: boolean
  volumetryLocationCategory: string
}

export interface TaskManagementItem {
  id?: string | number
  name: string
  rayonsOrDepartment?: AsyncAutocompleteOption
  recommendedStartHour: string
  recommendedEndHour: string
  frequency: AsyncAutocompleteOption
  standardProductivityValue: number
  measurementUnit: AsyncAutocompleteOption
  workVolumeSource: AsyncAutocompleteOption
  priority: AsyncAutocompleteOption
  isActive: boolean
  volumetryLocationCategory: AsyncAutocompleteOption
  rayons: AsyncAutocompleteOption[]
}

export interface Department {
  id: number
  departmentName: string
  description: string
}

export type CRUDAction = 'create' | 'read' | 'edit' | 'delete'

export interface EvaluationReportSummary {
  departmentTotalExcutedTasks: number
  departmentAppliedVolumetryProcessPercentage: number
  departmentUtilizedVsStandardHours: number
  departmentUtilizedVsStandardFTE: number
}
