import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Serie',
    field: 'noticeSeries',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Inceput de interval',
    field: 'noticeMinNumber',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Numar curent',
    field: 'noticeCurrentNumber',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Sfarsit de interval',
    field: 'noticeMaxNumber',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'An',
    field: 'year',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Societatea',
    field: 'parentSociety',
    align: 'left',
    type: 'string',
    disableSorting: true
  }
]

export const drawerFilters = societyOptions => [
  {
    name: 'noticeSeries',
    filter: <Input variant="outlined" label="Serie aviz" type="text" />,
    type: 'text',
    label: 'Serie aviz'
  },
  {
    name: 'parentSociety',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează societatea"
        options={societyOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Societate'
  },
  {
    name: 'year',
    filter: <Input variant="outlined" label="An" type="text" />,
    type: 'text',
    label: 'An'
  }
]
