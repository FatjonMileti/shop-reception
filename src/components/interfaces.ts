export interface TeamDayOffManagementItem {
  dayOffType: string
  endDate: Date
  startDate: Date
  id: number
  numberOfHours: number
  teamMemberName: string
}

export interface TeamAssignmentItem {
  assignedProject: string
  assignmentEndDate: Date
  assignmentStartDate: Date
  id: number
  iibKey: string
  ipbKey: string
  role: string
  teamMemberName: string
}

export interface ValueLabelInterface {
  value: string
  label: string
}

export interface TeamMember {
  label: string
  value: string
}

export interface TeamDayOffManagementTableFilter {
  teamMember: string
  dayOffType: string
  startDate: Date
  endDate: Date
}

export interface TeamAssignmentTableFilter {
  teamMemberName: string
  iibKey: string
  ipbKey: string
  assignedProject: string
}
