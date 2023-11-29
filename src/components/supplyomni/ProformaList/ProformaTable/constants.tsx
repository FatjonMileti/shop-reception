import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { TableFilters } from './interfaces'
import dayjs from 'dayjs'

export const RESOURCE_URI = '/supply-omni/order'

export const tableColumns = [
  {
    title: 'Numar Proforma',
    field: 'proformaId',
    align: 'left',
    disableSorting: true
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
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Nume client',
    field: 'clientName',
    align: 'left',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Lista produse',
    field: 'products',
    align: 'left',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Activ',
    field: 'paid',
    align: 'left',
    disableSorting: true,
    collapsible: true,
    render: row => (
      <Box>
        <IconCell value={row.paid ? 'inactive' : 'active'} />
      </Box>
    )
  }
]

export const defaultTableFilters: TableFilters = {
  startDate: null,
  endDate: null,
  agentName: null,
  clientName: null,
  productsName: null,
  proformaId: null
}
