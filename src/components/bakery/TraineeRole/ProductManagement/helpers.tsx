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
    align: 'left',
    collapsible: true
  },
  {
    title: 'Cod PLU',
    field: 'pluCode',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Cod APPEL PRIX',
    field: 'appelCodes',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Raion',
    field: 'familyModuleName',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Familie',
    field: 'familyName',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left',
    collapsible: true
  },
  {
    title: 'UB',
    field: 'unitBusiness',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Status',
    field: 'status',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Furnizor',
    field: 'provider',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Metoda fabricatie',
    field: 'fabricationMethod',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Cluster',
    field: 'clusterName',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Obligatoriu',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <IconCell value={row.clusterMandatory ? 'active' : 'inactive'} />
      </Box>
    ),
    collapsible: true
  },
  {
    title: 'Produs Cadentier',
    field: 'test',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Stoc minim prezentare',
    field: 'minStock',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Produs nou',
    field: 'newProduct',
    align: 'left',
    collapsible: true
  }
]
