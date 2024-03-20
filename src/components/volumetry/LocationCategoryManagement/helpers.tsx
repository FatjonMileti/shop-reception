import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'
import { LOCATION_TYPES } from './constants'

export const columns = [
  {
    title: 'Business unit',
    field: 'category',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Descriere',
    field: 'description',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Tip magazin',
    field: 'locationType',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Creat de',
    field: 'createdBy',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Creat la',
    field: 'createdAt',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Ultima modificare',
    field: 'lastModifiedBy',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Data ultimei modificari',
    field: 'lastModifiedAt',
    align: 'left',
    type: 'string',
    collapsible: true
  }
]

export const locationTypeOptions = LOCATION_TYPES.map(type => ({ value: type, label: type }))

export const getFilters = () => [
  {
    name: 'category',
    label: 'Business unit',
    type: 'text',
    filter: <Input type="text" name="category" label="Business unit" variant="outlined" />
  },
  {
    name: 'locationType',
    label: 'Tip magazin',
    type: 'autocomplete',
    value: '',
    filter: (
      <Autocomplete label="Tip magazin" variant="outlined" options={locationTypeOptions} />
    )
  },
  {
    name: 'createdBy',
    label: 'Creat de',
    type: 'text',
    filter: <Input type="text" name="createdBy" label="Creat de" variant="outlined" />
  }
]
