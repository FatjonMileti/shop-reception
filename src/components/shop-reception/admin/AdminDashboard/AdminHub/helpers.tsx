import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { EditActionIcon, ViewActionIcon } from 'icons'
import { URLS } from '../../constants'

export const columns = navigate => [
  {
    title: 'Cod hub',
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
    title: 'Tip hub',
    field: 'type',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Adresǎ',
    field: 'address',
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
  },
  {
    title: 'Interval orar',
    align: 'left',
    type: 'string',
    render: row => (
      <span
        onClick={() => navigate(URLS.AUTH_ADMIN_HUBS_DELIVERY_INTERVAL.replace(':id', row.id))}
        style={{ cursor: 'pointer' }}
      >
        <ViewActionIcon />
      </span>
    )
  }
]
