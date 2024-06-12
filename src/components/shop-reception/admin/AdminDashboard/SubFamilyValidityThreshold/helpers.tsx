import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Cod sub familie',
    field: 'sfaCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Sub familie',
    field: 'sfaName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Familie',
    field: 'famName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Raion',
    field: 'rayName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Prag valabilitate',
    field: 'validityLimit',
    align: 'left',
    type: 'string',
    disableSorting: true
  }
]

export const drawerFilters = (metiFamilies, metiSubfamilies, metiRayons) => [
  {
    name: 'famCode',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selecteaza familie" options={metiFamilies || []} />
    ),
    type: 'autocomplete',
    label: 'Selecteaza familie'
  },
  {
    name: 'sfaCode',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza subfamilie"
        options={metiSubfamilies || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza subfamilie'
  },
  {
    name: 'rayCode',
    value: undefined,
    filter: <Autocomplete variant="outlined" label="Selecteaza raion" options={metiRayons || []} />,
    type: 'autocomplete',
    label: 'Selecteaza raion'
  }
]
