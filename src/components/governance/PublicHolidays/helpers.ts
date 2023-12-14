import { BasicTableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/esm/components/BasicTable'
import { formatUIDate } from '../../../utils/helpers'
import { PublicHolidayItem } from '../interfaces'

export const columns: BasicTableHeaderType[] = [
  {
    title: 'Description',
    field: 'description',
    align: 'left'
  },
  {
    title: 'Date',
    field: 'date',
    align: 'left'
  }
]

export const toTableRowItems = (items: PublicHolidayItem[]) =>
  items.map(item => ({
    id: item.id,
    date: formatUIDate(item.date),
    description: item.description
  }))
