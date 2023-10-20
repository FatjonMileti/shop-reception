import { formatUIDate } from "utils/helpers";

export const toTableRowItems = items => items.map(item => ({
  id: item.id,
  teamMemberName: item.teamMember.name,
  dayOffType: item.dayOffType,
  startDate: formatUIDate(item.startDate),
  endDate: formatUIDate(item.endDate),
  numberOfHours: item.numberOfHours
}))