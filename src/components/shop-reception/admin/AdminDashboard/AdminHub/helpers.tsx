import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { ViewActionIcon } from 'icons'

export const columns = (setModal, selectRow) => [
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
    title: 'Intervale orare',
    field: 'hourlyIntervals',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px',
    render: row => (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          selectRow(row.id)
          setModal('interval')
        }}
      >
        <ViewActionIcon />
      </div>
    )
  }
]
