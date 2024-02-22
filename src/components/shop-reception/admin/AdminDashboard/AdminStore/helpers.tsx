import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Cod Magazin',
    field: 'metiCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume',
    field: 'metiName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip Magazin',
    field: 'metiType',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Versiune METI',
    field: 'metiVersion',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cod AD',
    field: 'adCode',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Abatere receptie produse (grame)',
    field: 'receptionDeviation',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Regiune',
    field: 'regionName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'IP SFTP',
    field: 'sftpIp',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cale SFTP',
    field: 'sftpPath',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Permite editare cantitǎți recepționate',
    field: 'canEditQuantities',
    align: 'left',
    type: 'string',
    render: row => (row.canEditQuantities ? 'Da' : 'Nu'),
    disableSorting: true
  },
  {
    title: 'Activ',
    field: 'active',
    align: 'left',
    type: 'string',
    render: row => (row.active ? 'Da' : 'Nu')
  },
  {
    title: 'Intervale orare',
    field: 'hourlyIntervals',
    align: 'left',
    type: 'string',
    disableSorting: true
  }
]

export const drawerFilters = (shopCodes, metiShops, metiVersions, shopTypes, parentSocieties) => [
  {
    name: 'shopCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={shopCodes}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează magazin'
  },

  {
    name: 'metiVersion',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează versiune"
        disableClearable
        options={metiVersions}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează versiune'
  },

  {
    name: 'regionId',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează regiune"
        disableClearable
        options={metiShops}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează regiune'
  },

  {
    name: 'active',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Activ/inactiv"
        disableClearable
        options={[
          {
            value: 'active',
            label: 'Activ'
          },

          {
            value: 'inactive',
            label: 'Inactiv'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Activ/inactiv'
  },

  {
    name: 'shopType',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza tip magazin"
        disableClearable
        options={shopTypes}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza tip magazin'
  },

  {
    name: 'parentSociety',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza societatea"
        disableClearable
        options={parentSocieties}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza societatea'
  }
]
