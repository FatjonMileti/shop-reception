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
  defaultWorkload: number
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

export interface AttendanceModalProps {
  isModalOpen: boolean
  closeModal: Function
  departmentId: number | string
}

export interface EmployeeAttendanceProps {
  isEmployeesLoading: boolean
  employees: any[]
  toggleEmployee: Function
  updateEmplpyeeTime: Function
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
  name: string
  region: string
  category: string
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
  region: AsyncAutocompleteOption
  category: AsyncAutocompleteOption
}

export interface LocationItemPayload {
  regionId: string | number
  categoryId: string | number
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
  name: string
  description: string
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
