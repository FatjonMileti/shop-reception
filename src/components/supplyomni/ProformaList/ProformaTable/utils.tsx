import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { Input } from 'components/core-ui/Input'
import { TableFilters } from './interfaces'
import { formatPayloadDate } from 'utils/helpers'

export const buildTableFilterInputs = (
  tableFilter: TableFilters,
  setTableFilter: (tableFilters: TableFilters) => void
) => [
  {
    name: 'agentName',
    label: 'Nume agent',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="agentName"
        label="Nume agent"
        variant="outlined"
        onChange={value => setTableFilter({ ...tableFilter, agentName: value })}
        value={tableFilter.agentName}
      />
    )
  },
  {
    name: 'clientName',
    label: 'Nume client',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="clientName"
        label="Nume client"
        variant="outlined"
        onChange={value => setTableFilter({ ...tableFilter, clientName: value })}
        value={tableFilter.clientName}
      />
    )
  },
  {
    name: 'products.name',
    label: 'Nume produse',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="products.name"
        label="Nume produs"
        variant="outlined"
        onChange={value => setTableFilter({ ...tableFilter, productsName: value })}
        value={tableFilter.productsName}
      />
    )
  },
  {
    name: 'proformaId',
    label: 'Numar proforma',
    type: 'number',
    filter: (
      <Input
        type="number"
        name="proformaId"
        label="Numar proforma"
        variant="outlined"
        onChange={value => setTableFilter({ ...tableFilter, proformaId: value })}
        value={tableFilter.proformaId}
      />
    )
  },

  {
    name: 'startDate',
    label: 'Data inceput',
    type: 'date',
    value: formatPayloadDate(tableFilter.startDate),
    filter: (
      <DatePicker
        label="Data inceput"
        variant="outlined"
        onChange={(value: any) => setTableFilter({ ...tableFilter, startDate: value })}
        value={tableFilter.startDate}
      />
    )
  },
  {
    name: 'endDate',
    label: 'Data sfarsit',
    type: 'date',
    value: formatPayloadDate(tableFilter.endDate),
    filter: (
      <DatePicker
        label="Data sfarsit"
        variant="outlined"
        onChange={value => {
          setTableFilter({ ...tableFilter, endDate: value })
        }}
        value={tableFilter.endDate}
      />
    )
  }
]
