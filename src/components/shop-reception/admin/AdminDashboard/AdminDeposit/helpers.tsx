import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'

export const columns = [
  {
    title: 'Cod depozit',
    field: 'code',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nume',
    field: 'name',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Tip depozit',
    field: 'type',
    align: 'left',
    type: 'string',
    collapsible: true,
    width: '100px'
  },
  {
    title: 'Procent valabilitate',
    field: 'validityPercentage',
    align: 'left',
    type: 'string',
    collapsible: true,
    width: '100px'
  },
  {
    title: 'Activ',
    field: 'active',
    align: 'left',
    type: 'string',
    width: '50px',
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
    width: '50px',
    render: row => (
      <Box>
        <IconCell value={row.acceptReturn ? 'active' : 'inactive'} />
      </Box>
    )
  },
  {
    title: 'C.I.F',
    field: 'CIF',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Sediu',
    field: 'office',
    align: 'left',
    type: 'string',
    width: '200px'
  },
  {
    title: 'Banca',
    field: 'bankName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cont',
    field: 'bankAccount',
    align: 'left',
    type: 'string',
    width: '200px'
  },
  {
    title: 'Capital social subscris varsat',
    field: 'capital',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Punct de lucru',
    field: 'workingPoint',
    align: 'left',
    type: 'string',
    width: '200px'
  }
]
