import { Input } from 'components/core-ui/Input'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { STATE_OPTIONS } from './constants'
import { ValueLabelInterface } from '../interfaces'

export const buildTableFilterFields = (
  departmentOptions: ValueLabelInterface[],
  frequencyOptions: ValueLabelInterface[],
  categoryOptions: ValueLabelInterface[]
) => [
  {
    name: 'department',
    label: 'Dapartament',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Departament" variant="outlined" options={departmentOptions} />
  },
  {
    name: 'taskName',
    label: 'Nume Task',
    type: 'text',
    filter: <Input type="text" name="taskName" label="Nume" variant="outlined" />
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
    name: 'frequency',
    label: 'Frecventa',
    type: 'autocomplete',
    value: '',
    filter: (
      <Autocomplete
        label="Frecventa"
        variant="outlined"
        multiple={true}
        options={frequencyOptions}
      />
    )
  },
  {
    name: 'category',
    label: 'Categorie',
    type: 'autocomplete',
    value: '',
    filter: <Autocomplete label="Categorie" variant="outlined" options={categoryOptions} />
  }
]

export const mapToValueLabel = (list): ValueLabelInterface[] => {
  return list.map(item => ({ label: item.name, value: item.name }))
}
