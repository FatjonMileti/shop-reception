import { Input } from 'components/core-ui/Input'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { STATE_OPTIONS } from './constants'
import { AutocompleteOption } from '../interfaces'

export const buildTableFilterFields = (
  departmentOptions: AutocompleteOption[],
  categoryOptions: AutocompleteOption[],
  priorityOptions: AutocompleteOption[],
  frequencyOptions: AutocompleteOption[],
  workVolumeOptions: AutocompleteOption[]
) => [
  {
    name: 'name',
    label: 'Nume Task',
    type: 'text',
    filter: <Input type="text" name="name" label="Nume" variant="outlined" />
  },
  {
    name: 'genericDepartmentId',
    label: 'Dapartament',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Departament" variant="outlined" options={departmentOptions} />
  },
  {
    name: 'frequency',
    label: 'Frecventa',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Frecventa" variant="outlined" options={frequencyOptions} />
  },
  {
    name: 'priorityId',
    label: 'Prioritate',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Prioritate" variant="outlined" options={priorityOptions} />
  },
  {
    name: 'workVolumeSourceId',
    label: 'Sursa volum de lucru',
    type: 'autocomplete',
    value: '',
    filter: (
      <Autocomplete label="Sursa volum de lucru" variant="outlined" options={workVolumeOptions} />
    )
  },

  {
    name: 'volumetryLocationCategoryId',
    label: 'Categorie',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Categorie" variant="outlined" options={categoryOptions} />
  },

  {
    name: 'isActive',
    label: 'Stare',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Stare" variant="outlined" options={STATE_OPTIONS} />
  }
]

export const mapToValueLabel = (list): AutocompleteOption[] => {
  return list.map(item => ({ label: item.name, value: item.name }))
}
