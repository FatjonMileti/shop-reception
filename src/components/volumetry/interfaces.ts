export interface ValueLabelInterface {
  value: string
  label: string
}

export interface EmployeeManagementItem {
  id: string | number
  departmentName: string
  name: string
  position: string
}

export interface TaskManagementItem {
  id: string | number
  departmentName: string
  taskName: string
  estimateStartTime: string
  estimateEndTime: string
  frequency: string
  prodStandardValue: string
  umStandardProd: string
  workVolumeSource: string
  priority: number
  status: boolean
}
