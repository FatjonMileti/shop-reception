import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Tip magazin',
    field: 'shopType',
    align: 'left',
    type: 'string',
    render: row => row.shopType?.value
  },
  {
    title: 'Cod magazin',
    field: 'shopCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Raion',
    field: 'rayName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Familie',
    field: 'famName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Subfamilie',
    field: 'sfaName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cod UB',
    field: 'ubName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cod Produs',
    field: 'prodName',
    align: 'left',
    type: 'string',
    disableSorting: true
  }
]

export const drawerFilters = (shopTypes, metiRayons, metiFamilies, metiSubfamilies, metiUB) => [
  {
    name: 'shopType',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={shopTypes || []}
      />
    ),
    type: 'autocomplete',
    label: 'Magazin'
  },

  {
    name: 'rayCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează raion"
        disableClearable
        options={metiRayons || []}
      />
    ),
    type: 'autocomplete',
    label: 'Raion'
  },

  {
    name: 'famCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Familie"
        disableClearable
        options={metiFamilies || []}
      />
    ),
    type: 'autocomplete',
    label: 'Familie'
  },

  {
    name: 'sfaCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Subfamilie"
        disableClearable
        options={metiSubfamilies || []}
      />
    ),
    type: 'autocomplete',
    label: 'Subfamilie'
  },

  {
    name: 'ubCode',
    value: '',
    filter: (
      <Autocomplete variant="outlined" label="Cod UB" disableClearable options={metiUB || []} />
    ),
    type: 'autocomplete',
    label: 'Cod UB'
  },

  {
    name: 'prodCode',
    value: '',
    filter: <Input variant="outlined" label="Cod produs" type="text" />,
    type: 'text',
    label: 'Cod produs'
  }
]
