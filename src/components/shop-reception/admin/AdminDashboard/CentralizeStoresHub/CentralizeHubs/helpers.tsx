import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Magazin',
    field: 'destinationName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Livrare marfa din depozit',
    field: 'depositNames',
    align: 'left',
    type: 'string',
    width: '300px'
  },
  {
    title: 'Huburi',
    field: 'hubNames',
    align: 'left',
    type: 'string'
  }
]

export const drawerFilters = (shopCodes, depositOptions, hubsOptions) => [
  {
    name: 'shopCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={shopCodes || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează magazin'
  },
  {
    name: 'depositId',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează depozit"
        disableClearable
        options={depositOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează depozit'
  },
  {
    name: 'hubName',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează hub"
        disableClearable
        options={hubsOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează hub'
  }
]
