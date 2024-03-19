import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'
import { AutocompleteOption } from '../interfaces'

export const columns = [
  {
    title: 'Nume locatie',
    field: 'name',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Regiune',
    field: 'region',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Business unit',
    field: 'category',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Tip locatie',
    field: 'locationType',
    align: 'left',
    type: 'string',
    collapsible: true
  }
]

export const getFilters = (
  regionOptions: AutocompleteOption[],
  categoryOptions: AutocompleteOption[],
  locationTypeOptions: AutocompleteOption[]
) => [
  {
    name: 'name',
    label: 'Nume Locatie',
    type: 'text',
    filter: <Input type="text" name="name" label="Nume" variant="outlined" />
  },
  {
    name: 'regionId',
    label: 'Regiune',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Regiune" variant="outlined" options={regionOptions} />
  },
  {
    name: 'categoryId',
    label: 'Category',
    type: 'autocomplete',
    value: '',
    filter: (
      <Autocomplete label="Business unit" variant="outlined" options={categoryOptions} />
    )
  },
  {
    name: 'locationType',
    label: 'Tip locatie',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Tip locatie" variant="outlined" options={locationTypeOptions} />
  }
]
