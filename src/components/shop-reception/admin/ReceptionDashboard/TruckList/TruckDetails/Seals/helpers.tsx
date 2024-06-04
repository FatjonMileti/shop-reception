import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Sigiliu',
    field: 'sealCode',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Plecare',
    field: 'source',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Destinatie',
    field: 'destination',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Operator sigilare',
    field: 'sourceOperator',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Data sigilare',
    field: 'created',
    type: 'string',
    disableSorting: true,
    render: row => formatUIDate(row.created)
  },
  {
    title: 'Operator sigilare',
    field: 'approvedBy',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Conform',
    field: 'conform',
    type: 'string',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.truckSealStatusValue ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Data verificare',
    field: 'verificationDate',
    type: 'string',
    disableSorting: true,
    render: row => formatUIDate(row.verificationDate)
  }
]
