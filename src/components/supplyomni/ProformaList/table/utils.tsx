import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { TableFilters } from './interfaces'
import { Input } from 'components/core-ui/Input'

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
        variant="standard"
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
        variant="standard"
        onChange={value => setTableFilter({ ...tableFilter, clientName: value })}
        value={tableFilter.clientName}
      />
    )
  },
  {
    name: 'productsName',
    label: 'Nume produse',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="productsName"
        label="Nume produs"
        variant="standard"
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
        variant="standard"
        onChange={value => setTableFilter({ ...tableFilter, proformaId: value })}
        value={tableFilter.proformaId}
      />
    )
  },

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
