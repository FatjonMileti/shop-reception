export interface Item {
  teamMemberId: string
  dayOffType: string
  endDate: Date
  startDate: Date
  id: number
  numberOfHours: number
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

export interface TimeOffValues {
  teamMember: TeamMember
  dayOffType: string
  startDate: any
  endDate: any
  numberOfHours?: number
}
