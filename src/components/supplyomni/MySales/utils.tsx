import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { TableFilters } from './models'

export const buildTableFilterInputs = (
  tableFilter: TableFilters,
  setTableFilter: (tableFilters: TableFilters) => void
) => [
  {
    name: 'startDate',
    label: 'Data inceput',
    type: 'date',
    filter: (
      <DatePicker
        label="Data inceput"
        variant="standard"
        onChange={(value: Date) => setTableFilter({ ...tableFilter, startDate: value })}
        value={tableFilter.startDate}
      />
    )
  },
  {
    name: 'endDate',
    label: 'Data sfarsit',
    type: 'date',
    filter: (
      <DatePicker
        label="Data sfarsit"
        variant="standard"
        onChange={(value: Date) => setTableFilter({ ...tableFilter, endDate: value })}
        value={tableFilter.endDate}
      />
    )
  }
]
