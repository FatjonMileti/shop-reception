export interface Item {
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

export interface TableFilter {
  teamMember: string
  dayOffType: string
  startDate: Date
  endDate: Date
}
