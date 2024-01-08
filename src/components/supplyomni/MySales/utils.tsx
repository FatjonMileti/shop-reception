import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { TableFilters } from './models'
import { formatPayloadDate } from 'utils/helpers'

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
        variant="outlined"
        onChange={(value: Date) => setTableFilter({ ...tableFilter, startDate: value })}
        value={tableFilter.startDate}
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
        variant="outlined"
        onChange={(value: Date) => setTableFilter({ ...tableFilter, endDate: value })}
        value={tableFilter.endDate}
      />
    )
  }
]
