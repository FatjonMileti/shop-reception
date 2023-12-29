import { AsyncAutocompleteOption } from 'components/core-ui/AsyncAutocomplete/AsyncAutocompleteDefinitions'

export interface ValueLabelInterface {
  value: string
  label: string
}

export interface EmployeeManagementItem {
  id: string | number
  departmentName: string
  name: string
  position: string
  employer: string
}

export interface TaskManagementItem {
  id?: string | number
  department: string
  taskName: string
  estimateStartTime: string
  estimateEndTime: string
  frequency: string
  prodStandardValue: string
  prodStandardUM: string
  workVolumeSource: string
  priority: number
  status: boolean
}

export interface TaskManagementEditItem {
  taskName: string
  estimateStartTime: Date
  estimateEndTime: Date
  department: AsyncAutocompleteOption | number
  category: AsyncAutocompleteOption | number
  raion: AsyncAutocompleteOption[] | number[]
  frequency: AsyncAutocompleteOption
  prodStandardValue: number
  prodStandardUM: AsyncAutocompleteOption
  workVolumeSource: AsyncAutocompleteOption
  priority: number
  status: boolean
}
