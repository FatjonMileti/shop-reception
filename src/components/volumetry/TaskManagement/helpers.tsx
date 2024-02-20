import { Input } from 'components/core-ui/Input'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { STATE_OPTIONS } from './constants'
import { AutocompleteOption } from '../interfaces'
import { IconCell } from 'components/core-ui/IconCell'
import { DescriptionText } from 'components/core-ui/DescriptionText'
import { Box } from '@mui/material'

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

export const columns = [
  {
    title: 'Departament / Raioane',
    field: 'rayonsOrDepartment',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume task',
    field: 'name',
    align: 'left',
    type: 'string',
    width: '250px'
  },
  {
    title: 'Interval orar recomandat',
    field: 'recommendedTimeInterval',
    align: 'left',
    type: 'string',
    collapsible: true,
    disableSorting: true
  },
  {
    title: 'Frecventa',
    field: 'frequency',
    align: 'left',
    type: 'string',
    collapsible: true,
    disableSorting: true
  },
  {
    title: 'Volum estimat',
    field: 'defaultWorkload',
    align: 'left',
    type: 'string',
    collapsible: true,
    disableSorting: true
  },
  {
    title: 'Productivitate standard',
    field: 'standardProductivity',
    align: 'left',
    type: 'string',
    collapsible: true,
    disableSorting: true
  },
  {
    title: 'Sursa volum de lucru',
    field: 'workVolumeSource',
    align: 'left',
    type: 'string',
    collapsible: true,
    minWidth: '200px',
    render: row => <DescriptionText value={row.workVolumeSource} />
  },
  {
    title: 'Prioritate',
    field: 'priority',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Categorie',
    field: 'volumetryLocationCategory',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Activ',
    field: 'isActive',
    align: 'left',
    type: 'string',
    collapsible: true,
    render: row => (
      <Box>
        <IconCell value={row.isActive ? 'active' : 'inactive'} />
      </Box>
    )
  }
]

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id || '',
    rayonsOrDepartment: item.rayonsOrDepartment || '',
    name: item.name || '',
    recommendedTimeInterval: item.recommendedTimeInterval || '',
    frequency: item.frequency || '',
    defaultWorkload: item.defaultWorkload || '',
    standardProductivity: item.standardProductivity || '',
    workVolumeSource: item.workVolumeSource || '',
    priority: item.priority || '',
    volumetryLocationCategory: item.volumetryLocationCategory || '',
    isActive: item.isActive || ''
  }))
