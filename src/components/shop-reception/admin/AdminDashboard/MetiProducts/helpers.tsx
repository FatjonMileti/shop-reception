import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Cod produs',
    field: 'code',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume produs',
    field: 'name',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Unitate de mǎsurǎ',
    field: 'unit',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Valabilitate (zile)',
    field: 'lifetimeDays',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Raion',
    field: 'rayon',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Familie',
    field: 'family',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Subfamilie',
    field: 'subFamily',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Prag valabilitate subfamilie',
    field: 'validityLimit',
    align: 'left',
    type: 'string',
    disableSorting: true
  }
]

export const drawerFilters = (
  measurementUnitsOptions,
  metiRayonsOptions,
  metiFamiliesOptions,
  metiSubfamiliesOptions
) => [
  {
    name: 'code',
    filter: <Input variant="outlined" label="Cod produs" type="text" />,
    type: 'text',
    label: 'Cod produs'
  },
  {
    name: 'name',
    filter: <Input variant="outlined" label="Nume produs" type="text" />,
    type: 'text',
    label: 'Nume produs'
  },
  {
    name: 'unit',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează unitate de masură"
        disableClearable
        options={measurementUnitsOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Unitate de masură'
  },
  {
    name: 'rayCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează raion"
        disableClearable
        options={metiRayonsOptions || []}
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
        label="Selectează familie"
        disableClearable
        options={metiFamiliesOptions || []}
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
        label="Selectează subfamilie"
        disableClearable
        options={metiSubfamiliesOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Subfamilie'
  },
  {
    name: 'hasValidity',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează prag de valabilitate"
        disableClearable
        options={[
          {
            value: 'true',
            label: 'Da'
          },
          {
            value: 'false',
            label: 'Nu'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Prag de valabilitate'
  }
]
