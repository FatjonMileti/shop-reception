import { Input } from 'components/core-ui/Input'
import { RowActionType, TableFilters, TableRowModel } from './interaces'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'

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
    name: 'id',
    label: 'Numar comanda',
    type: 'number',
    filter: (
      <Input
        type="number"
        name="id"
        label="Numar comanda"
        variant="standard"
        onChange={value => setTableFilter({ ...tableFilter, id: value })}
        value={tableFilter.id}
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
        onChange={(value: any) => console.log(value)}
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
        onChange={(value: any) => console.log(value)}
        value={tableFilter.endDate}
      />
    )
  }
]
