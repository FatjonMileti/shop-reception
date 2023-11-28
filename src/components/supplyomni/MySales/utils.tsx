import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { TableFilters } from './models'
import dayjs from 'dayjs'
import { formatPayloadDate, getDatePickerDate } from 'utils/helpers'

export const buildTableFilterInputs = (
  tableFilter: TableFilters,
  setTableFilter: (tableFilters: TableFilters) => void
) => [
  {
    name: 'startDate',
    label: 'Data inceput',
    type: 'date',
    required: true,
    value: formatPayloadDate(tableFilter.startDate),
    filter: (
      <DatePicker
        label="Data inceput"
        variant="standard"
        onChange={(value: Date) => setTableFilter({ ...tableFilter, startDate: value })}
        value={dayjs('2022-12-29')}
      />
    )
  },
  {
    name: 'endDate',
    label: 'Data sfarsit',
    type: 'date',
    required: true,
    value: formatPayloadDate(tableFilter.endDate),
    filter: (
      <DatePicker
        label="Data sfarsit"
        variant="standard"
        onChange={(value: Date) => setTableFilter({ ...tableFilter, endDate: value })}
        value={dayjs('2022-12-29')}
      />
    )
  }
]
