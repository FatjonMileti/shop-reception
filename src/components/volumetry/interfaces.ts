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

export interface TaskManagementItem {
  id?: string | number
  name: string
  rayonsOrDepartment: string | AsyncAutocompleteOption
  recommendedStartHour: string
  recommendedEndHour: string
  frequency: string | AsyncAutocompleteOption
  standardProductivityValue: number
  measurementUnit: string | AsyncAutocompleteOption
  workVolumeSource: string | AsyncAutocompleteOption
  priority: string | AsyncAutocompleteOption
  isActive: boolean
  volumetryLocationCategory: string | AsyncAutocompleteOption
  raion?: string | AsyncAutocompleteOption
}

export interface Department {
  id: number
  name: string
  description: string
}

export type CRUDAction = 'create' | 'read' | 'edit' | 'delete'

export interface EvaluationReportSummary {
  departmentTotalExcutedTasks: number
  departmentAppliedVolumetryProcessPercentage: number
  departmentUtilizedVsStandardHours: number
  departmentUtilizedVsStandardFTE: number
}
