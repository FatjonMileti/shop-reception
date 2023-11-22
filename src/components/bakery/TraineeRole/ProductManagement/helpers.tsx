import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { ImageCell } from 'components/core-ui/ImageCell'
import { TableItem } from './interfaces'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <ImageCell value={row.productName} imageUrl={row.imageUrl} />
      </Box>
    ),
    sticky: true,
    width: '200px'
  },
  {
    title: 'Cod METI',
    field: 'metiCode',
    align: 'left',
    width: '100px',
    sticky: true
  },

  {
    title: 'Cod EAN',
    field: 'eanCodes',
    align: 'left'
  },
  {
    title: 'Cod PLU',
    field: 'pluCode',
    align: 'left'
  },
  {
    title: 'Cod APPEL PRIX',
    field: 'appelCodes',
    align: 'left'
  },
  {
    title: 'Raion',
    field: 'familyModuleName',
    align: 'left'
  },
  {
    title: 'Familie',
    field: 'familyName',
    align: 'left'
  },
  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left'
  },
  {
    title: 'UB',
    field: 'unitBusiness',
    align: 'left'
  },
  {
    title: 'Status',
    field: 'status',
    align: 'left'
  },
  {
    title: 'Furnizor',
    field: 'provider',
    align: 'left'
  },
  {
    title: 'Metoda fabricatie',
    field: 'fabricationMethod',
    align: 'left'
  },
  {
    title: 'Cluster',
    field: 'clusterName',
    align: 'left'
  },
  {
    title: 'Obligatoriu',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <IconCell value={row.clusterMandatory ? 'active' : 'inactive'} />
      </Box>
    )
  },
  {
    title: 'Produs Cadentier',
    field: 'scheduleProduct',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <IconCell value={row.scheduleProduct ? 'active' : 'inactive'} />
      </Box>
    )
  },
  {
    title: 'Stoc minim prezentare',
    field: 'minStock',
    align: 'left'
  },
  {
    title: 'Produs nou',
    field: 'newProduct',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <IconCell value={row.newProduct ? 'active' : 'inactive'} />
      </Box>
    )
  }
]
