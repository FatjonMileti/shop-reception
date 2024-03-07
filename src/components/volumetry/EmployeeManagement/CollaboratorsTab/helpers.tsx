import { Autocomplete, Input } from "@fullscreendigital/carrefour-dex-fe"

export const columns = [
  {
    title: 'Departament',
    field: 'department',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume',
    field: 'fullName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Functie',
    field: 'jobTitle',
    align: 'left',
    collapsible: true,
    type: 'string'
  },
  {
    title: 'Angajator',
    field: 'employer',
    align: 'left',
    collapsible: true,
    type: 'string',
    disableSorting: true
  }
]

export const getTableFilterFields = (departmentsOptions, jobTitlesOptions) => [
  {
    name: 'fullName',
    label: 'Nume',
    type: 'text',
    value: '',
    filter: <Input type="text" name="fullName" label="Nume" variant="outlined" value="" />
  },
  {
    name: 'genericDepartmentId',
    label: 'Departament',
    type: 'autocomplete',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Departament"
        options={departmentsOptions}
        isOptionEqualToValue={(option, value) => option.value === value.value}
      />
    )
  },
  {
    name: 'jobTitleId',
    label: 'Functie',
    type: 'autocomplete',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Functie"
        options={jobTitlesOptions}
        isOptionEqualToValue={(option, value) => option.value === value.value}
      />
    )
  }
]
