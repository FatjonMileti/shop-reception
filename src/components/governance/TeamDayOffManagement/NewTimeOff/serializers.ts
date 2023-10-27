import { TeamDayOffManagementItem, TimeOffValues } from 'components/interfaces'
import { formatPayloadDate } from 'utils/helpers'

export const toTimeOffPayload = (values: TimeOffValues, editItem: TeamDayOffManagementItem) => ({
  teamMember: { id: values.teamMember.value ?? (editItem as TeamDayOffManagementItem)?.id },
  dayOffType: values.dayOffType,
  startDate: formatPayloadDate(values.startDate),
  endDate: formatPayloadDate(values.endDate),
  numberOfHours: values.numberOfHours || null
})
