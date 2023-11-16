import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { TableFilters } from './interfaces'
import dayjs from 'dayjs'

export const RESOURCE_URI = '/supply-omni/order'

export const tableColumns = [
  {
    title: 'Numar Proforma',
    field: 'proformaId',
    align: 'left'
  },
  {
    title: 'Data Proforma',
    field: 'creationDate',
    align: 'left'
  },
  {
    title: 'Nume Agent',
    field: 'agentName',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Nume client',
    field: 'clientName',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Lista produse',
    field: 'products',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Activ',
    field: 'paid',
    align: 'left',
    render: row => (
      <Box>
        <IconCell value={row.paid ? 'inactive' : 'active'} />
      </Box>
    ),
    collapsible: true
  }
]

export const defaultTableFilters: TableFilters = {
  startDate: dayjs(new Date(), 'DD/MM/YYYY'),
  endDate: dayjs(new Date(), 'DD/MM/YYYY'),
  agentName: null,
  clientName: null,
  productsName: null,
  proformaId: null
}
