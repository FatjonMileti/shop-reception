import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'HUB',
    field: 'hubName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Societate',
    field: 'parentSociety',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip suport',
    field: 'supportType',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Sold teoretic',
    field: 'stock',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data actualizare',
    field: 'createdDate',
    align: 'left',
    type: 'string'
  }
]

export const getFilters = ({
  shopOptions,
  hubOptions,
  supportTypeOptions,
  parentSocietyOptions
}) => [
  {
    name: 'shopCode',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza magazin"
        options={shopOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Magazin'
  },
  {
    name: 'hubId',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selecteaza Hub" options={hubOptions || []} multiple />
    ),
    type: 'autocomplete',
    label: 'Hub'
  },
  {
    name: 'supportType',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza tip Suport"
        options={supportTypeOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Tip Suport'
  },
  {
    name: 'parentSociety',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza societate"
        options={parentSocietyOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Societate'
  }
]
