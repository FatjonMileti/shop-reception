import { formatPayloadDate } from 'utils/helpers'
import { Item, TimeOffValues } from '../interfaces'

export const toTimeOffPayload = (values: TimeOffValues, editItem: Item) => ({
  teamMember: { id: values.teamMember.value ?? editItem.teamMemberId },
  dayOffType: values.dayOffType,
  startDate: formatPayloadDate(values.startDate),
  endDate: formatPayloadDate(values.endDate),
  numberOfHours: values.numberOfHours || null
})
