import { Box } from '@mui/material'
import BooleanIcon from 'components/core-ui/BooleanIcon/BooleanIcon'
import { DescriptionText } from 'components/core-ui/DescriptionText'
import { IconCell } from 'components/core-ui/IconCell'

export const VOLUMETRY_TASKS_URL = '/volumetry/task-templates'
export const VOLUMETRY_DEPARTMENTS_URL = '/volumetry/department?&size=-1'
export const VOLUMETRY_FREQUENCIES_URL = '/volumetry/frequency?&size=-1'
export const VOLUMETRY_CATEGORIES_URL = '/volumetry/category?&size=-1'

export const STATE_OPTIONS = [
  {
    label: 'Activ',
    value: 'true'
  },
  {
    label: 'Inactiv',
    value: 'false'
  }
]

export const columns = [
  {
    title: 'Departament / Raioane',
    field: 'rayons',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume task',
    field: 'taskName',
    align: 'left',
    type: 'string',
    width: '250px'
  },
  {
    title: 'Ora recomandata de inceput',
    field: 'estimateStartTime',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Ora recomandata de final',
    field: 'estimateEndTime',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Frecventa',
    field: 'frequency',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Productivitate',
    field: 'standardProductivityValue',
    align: 'left',
    type: 'string',
    collapsible: true
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
    field: 'category',
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
        <IconCell value={row.status ? 'active' : 'inactive'} />
      </Box>
    )
  }
]
