import { formatUIDate } from 'utils/helpers'
import { TableRowModel, TimeOffModel } from './interfaces'

export const toTableRowItems = (items: TimeOffModel[]): TableRowModel[] =>
  items.map(
    (item: TimeOffModel) =>
      ({
        id: item.id,
        dayOffType: item.dayOffType || '',
        startDate: formatUIDate(item.startDate),
        endDate: formatUIDate(item.endDate),
        numberOfHours: item.numberOfHours || ''
      } as TableRowModel)
  )
