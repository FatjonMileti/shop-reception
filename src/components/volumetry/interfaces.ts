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
  genericDepartment: string | AutocompleteOption
  fullName: string
  jobTitle: string | AutocompleteOption
  employer: string
  location?: string
}

export interface TaskManagementTableItem {
  id?: string | number
  name: string
  departmentAlias: string
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
  recommendedStartHour: string
  recommendedEndHour: string
  frequency: AsyncAutocompleteOption[]
  // defaultWorkload: number
  standardProductivityValue: number
  measurementUnit: AsyncAutocompleteOption
  workVolumeSource: AsyncAutocompleteOption
  priority: AsyncAutocompleteOption
  volumetryLocationCategory: AsyncAutocompleteOption
  departmentAlias: AsyncAutocompleteOption
}

export interface Department {
  id: number
  departmentName: string
  description: string
}

export interface DepartmentAlias {
  id: number
  alias: string
}

export type CRUDAction = 'create' | 'read' | 'edit' | 'delete'

export interface EvaluationReportSummary {
  departmentTotalExcutedTasks: number
  departmentAppliedVolumetryProcessPercentage: number
  departmentUtilizedVsStandardHours: number
  departmentUtilizedVsStandardFTE: number
}

export interface AttendanceModalProps {
  isModalOpen: boolean
  closeModal: Function
  departmentId: number | string
}

export interface EmployeeAttendanceProps {
  isEmployeesLoading: boolean
  employees: any[]
  toggleEmployee: Function
  updateEmployeeTime: Function
  closeModal: Function
  handleSubmit: Function
  increaseStep: Function
  isXs: boolean
}

export interface AllocationListProps {
  employees: any[]
  toggleEmployee: Function
  closeModal: Function
  allocateEmployees: Function
  allocateEmployeesAllSelected: boolean
  setAllocateEmployeesAllSelected: Function
}

export interface LocationManagementTableItem {
  id: string | number
  locationName: string
  locationCategory: string
  locationType: string
}

export interface LocationItem {
  id: string | number
  name: string
  regionId: string | number
  regionName: string
  categoryId: string | number
  categoryName: string
}

export interface LocationItemForm {
  category: AsyncAutocompleteOption
}

export interface LocationItemPayload {
  volumetryLocationCategoryId: string | number
}

export interface EditLocationProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItemId: string | number
}

export interface Region {
  id: number | string
  name: string
}

export interface LocationCategoryManagementTableItem {
  id: string | number
  category: string
  description: string
  locationType: string
}

export interface CreateEditLocationCategoryProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: LocationCategoryManagementTableItem
}

export interface DeleteLocationCategoryProps {
  itemId: string | number
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
}
