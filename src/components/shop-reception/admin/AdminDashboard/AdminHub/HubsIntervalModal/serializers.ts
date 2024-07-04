import { formatUITime } from 'utils/helpers'

export const toTableRowItems = items =>
  items.map(item => ({
    depositId: item.depositId,
    receiveFromDeposit: item.receiveFromDeposit,
    depositName: item.depositName,
    depositCode: item.depositCode,
    monday: item.monday,
    tuesday: item.tuesday,
    wednesday: item.wednesday,
    thursday: item.thursday,
    friday: item.friday,
    saturday: item.saturday,
    sunday: item.sunday,
    startInterval: formatUITime(item.startInterval),
    endInterval: formatUITime(item.endInterval)
  }))
