import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'

export const columns = [
  {
    title: 'Cod Regiune',
    field: 'code',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Denumire',
    field: 'name',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Responsabil regiune',
    field: 'responsible',
    align: 'left',
    type: 'string'
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
  }
]
