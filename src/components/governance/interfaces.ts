export interface TeamDayOffManagementItem {
  dayOffType: string
  endDate: Date
  startDate: Date
  id: number
  numberOfHours: number
  teamMemberName: string
  teamMemberId: string
}
export interface EffortMatrix {
  id: number
  role: string
  evaluationPhase: number
  analysisPhase: number
  designPhase: number
  developmentPhase: number
  systemTestPhase: number
  uatPhase: number
  rolloutPhase: number
  hypercarePhase: number
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
  teamMemberId: string
  projectId: string
}

export interface ValueLabelInterface {
  value: string
  label: string
}

export interface TeamMember {
  label: string
  value: string
}

export interface Role {
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

export interface TeamCapacityTableFilter {
  teamMemberName: string
  endDate: Date
  startDate: Date
  baseRole: string
}

export interface TimeOffValues {
  teamMember: TeamMember
  dayOffType: string
  startDate: any
  endDate: any
  numberOfHours?: number
}
