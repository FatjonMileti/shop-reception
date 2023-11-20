export interface TableRowModel {
  dayOffType: string
  endDate: string
  startDate: string
  id: number
  numberOfHours: number
  teamMemberId: number
}

export interface TimeOffModel {
  id: number
  teamMember: TeamMemberModel
  dayOffType: string
  startDate: Date
  endDate: Date
  numberOfHours: number
}

export interface TeamMemberModel {
  id: number
  name: string
  domain: string
}
