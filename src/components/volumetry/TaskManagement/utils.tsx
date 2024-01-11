import { Input } from 'components/core-ui/Input'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { STATE_OPTIONS } from './constants'
import { AutocompleteOption } from '../interfaces'

export const buildTableFilterFields = (
  departmentOptions: AutocompleteOption[],
  categoryOptions: AutocompleteOption[]
) => [
  {
    name: 'rayonsOrDepartment',
    label: 'Dapartament',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Departament" variant="outlined" options={departmentOptions} />
  },
  {
    name: 'name',
    label: 'Nume Task',
    type: 'text',
    filter: <Input type="text" name="name" label="Nume" variant="outlined" />
  },
  {
    name: 'priority',
    label: 'Prioritate',
    type: 'number',
    filter: <Input type="number" name="priority" label="Prioritate" variant="outlined" />
  },
  {
    name: 'state',
    label: 'Stare',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Stare" variant="outlined" options={STATE_OPTIONS} />
  },
  {
    name: 'volumetryLocationCategory',
    label: 'Categorie',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Categorie" variant="outlined" options={categoryOptions} />
  }
]

export const mapToValueLabel = (list): AutocompleteOption[] => {
  return list.map(item => ({ label: item.name, value: item.name }))
}
