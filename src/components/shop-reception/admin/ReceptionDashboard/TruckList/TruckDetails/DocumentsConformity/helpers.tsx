import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Depozit',
    field: 'depositName',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Magazin',
    field: 'shopName',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'HUB',
    field: 'hubName',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Aviz/BL',
    field: 'hasNotice',
    type: 'string',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.hasNotice ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Scrisoare de transport/CRM',
    field: 'hasTransportNote',
    type: 'string',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.hasTransportNote ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Receptie in interval orar',
    field: 'arrivalConform',
    type: 'string',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.arrivalConform ? 'activ' : 'inactiv'} />
      </Box>
    )
  },

  {
    title: 'Aprobator',
    field: 'approvedBy',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Data aprobare',
    field: 'approvedDate',
    type: 'string',
    disableSorting: true,
    render: row => formatUIDate(row.approvedDate)
  }
]
