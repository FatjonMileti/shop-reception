import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { formatPayloadDate } from 'utils/helpers'
import { IndividualCapacityTableFilter } from '../interfaces'
import { Dispatch, SetStateAction } from 'react'

export const buildTableFilterInputs = (
  tableFilters: IndividualCapacityTableFilter,
  setTableFilters: Dispatch<SetStateAction<IndividualCapacityTableFilter>>
) => [
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    value: formatPayloadDate(tableFilters.startDate),
    required: true,
    filter: (
      <DatePicker
        value={tableFilters.startDate}
        onChange={value => setTableFilters({ ...tableFilters, startDate: value })}
        label="Start date"
        variant="standard"
      />
    )
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    value: formatPayloadDate(tableFilters.endDate),
    required: true,
    filter: (
      <DatePicker
        value={tableFilters.endDate}
        onChange={value => setTableFilters({ ...tableFilters, endDate: value })}
        label="End date"
        variant="standard"
      />
    )
  }
]
