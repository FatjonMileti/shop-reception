import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'

export const columns = [
  {
    title: 'Cod depozit',
    field: 'code',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume',
    field: 'name',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip depozit',
    field: 'type',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Procent valabilitate',
    field: 'validityPercentage',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Activ',
    field: 'active',
    align: 'left',
    type: 'string',
    render: row => (
      <Box>
        <IconCell value={row.active ? 'active' : 'inactive'} />
      </Box>
    )
  },
  {
    title: 'Accepta retur ambalaje',
    field: 'acceptReturn',
    align: 'left',
    type: 'string',
    render: row => (
      <Box>
        <IconCell value={row.acceptReturn ? 'active' : 'inactive'} />
      </Box>
    )
  },
  {
    title: 'C.I.F',
    field: 'cif',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Sediu',
    field: 'office',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Banca',
    field: 'bankName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cont',
    field: 'bankAccount',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Capital social subscris varsat',
    field: 'capital',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Punct de lucru',
    field: 'workingPoint',
    align: 'left',
    type: 'string'
  }
]
