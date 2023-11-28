import { formatUIDate } from 'utils/helpers'

export const toTableRowItems = items => items.map(item => ({
  id: item.id,
  'teamMember.name': item.teamMember.name,
  teamMemberId: item.teamMember.id,
  dayOffType: item.dayOffType,
  startDate: formatUIDate(item.startDate),
  endDate: formatUIDate(item.endDate),
  numberOfHours: item.numberOfHours
}))