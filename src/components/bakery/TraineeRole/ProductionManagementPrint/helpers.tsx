import { Box } from '@mui/material'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cod METI',
    field: 'productMetiCode',
    align: 'left',
    type: 'string'
  },

  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left',
    type: 'string'
  },
  {
    title: 'MV',
    field: 'average',
    align: 'left',
    minWidth: '140px',
    type: 'string'
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    minWidth: '140px',
    type: 'string'
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    minWidth: '140px',
    type: 'string'
  },

  {
    title: 'MV',
    field: 'average',
    align: 'left',
    isGroup: true,
    type: 'string'
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    isGroup: true,
    type: 'string'
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    isGroup: true,
    type: 'string'
  },

  {
    title: 'Gama produs',
    field: 'clusterMandatory',
    align: 'left',
    type: 'string',
    render: (row: any) => (
      <Box>
        <BooleanIcon
          value={row.inPromotion}
          icon={'Flag'}
          onSuccess="#33691E"
          onFailure="#E5E5E5"
        />
      </Box>
    )
  },
  {
    title: 'Oferta in ziua respectiva',
    field: 'inPromotion',
    align: 'left',
    type: 'boolean',
    render: (row: any) => (
      <Box>
        <BooleanIcon
          value={row.inPromotion}
          icon={'Flag'}
          onSuccess="#33691E"
          onFailure="#E5E5E5"
        />
      </Box>
    )
  },
  {
    title: 'Produs nou',
    field: 'newProduct',
    align: 'left',
    type: 'boolean',
    render: (row: any) => (
      <Box>
        <BooleanIcon value={row.newProduct} icon={'Flag'} onSuccess="#33691E" onFailure="#E5E5E5" />
      </Box>
    )
  },
  {
    title: 'Ultima persoana care a modificat fisierul',
    field: 'username',
    align: 'left',
    type: 'string'
  }
]
