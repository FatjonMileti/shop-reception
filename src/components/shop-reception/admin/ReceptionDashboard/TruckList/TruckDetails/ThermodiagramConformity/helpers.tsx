import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { formatUIDate } from 'utils/helpers'

export const columns = [
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
    title: 'Conformitate termodiagrama',
    field: 'conform',
    type: 'string',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.conform ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Temperatura',
    field: 'arrivalTemperature',
    type: 'string',
    disableSorting: true
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
  },
  {
    title: 'Resigilat',
    field: 'truckSealStatusValue',
    type: 'string',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.truckSealStatusValue ? 'activ' : 'inactiv'} />
      </Box>
    )
  }
]
