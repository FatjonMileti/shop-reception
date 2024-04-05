export interface TaskDescriptionProps {
  item: any // TODO: To add type when db schema is defined
  shouldRefreshData: boolean
  setShouldRefreshData: Function
  setSelectedRowId: Function
  employees?: any[] // TODO: To add type when db schema is defined
  hideDetails?: boolean
}

export interface AssignEmployeeProps {
  isModalOpen: boolean
  closeModal: Function
  taskName: string
  departmentAlias: string
  workloadMeasurementUnit: string
  setShouldRefreshData: Function
  taskTemplateId: string
  setSelectedRowId: Function
  minDivision: number
}

export interface TaskCurrentState {
  isTaskStarted: boolean
  isTaskEnded: boolean
  showStartButton: boolean
  showStopButton: boolean
  isTaskPaused: boolean
  showPauseButton: boolean
  showResumeButton: boolean
}

export interface EmployeeProps {
  employee: any // TODO: To add type when db schema is defined
  task: any // TODO: To add type when db schema is defined
  setShouldRefreshData: Function
  setSelectedRowId: Function
  hideDetails?: boolean
}

export interface EmployeeProgressProps {
  taskCurrentState: TaskCurrentState
  employee: any // TODO: To add type when db schema is defined
  customCapsuleColors: {
    label: string
    value: string
    progress?: string
  }
}

export interface EmployeeCapsuleProps {
  employee: any // TODO: To add type when db schema is defined
  customCapsuleColors: {
    label: string
    value: string
  }
}

export interface EmployeeActionsProps {
  taskCurrentState: TaskCurrentState
  updateTaskStatus: Function
  openStopTaskModal: Function
}

export interface EditCurrentTaskTemplateProps {
  isModalOpen: boolean
  closeModal: Function
  editItem: any // TODO: To add interface when db schema is defined
  setShouldRefreshData: Function
}

export interface EditAllocationModalProps {
  isModalOpen: boolean
  closeModal: Function
  task: any // TODO: To add interface when db schema is defined
  setShouldRefreshData: Function
  setSelectedRowId: Function
  editItem?: any // TODO: To add interface when db schema is defined
  employee?: any // TODO: To add type when db schema is defined
  hideWorkload?: boolean
}