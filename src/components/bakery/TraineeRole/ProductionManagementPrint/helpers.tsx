import { Box } from '@mui/material'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    type: 'string',
    width: 60,
  },
  {
    title: 'Cod METI',
    field: 'productMetiCode',
    align: 'left',
    type: 'string',
    width: 30,
  },

  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left',
    type: 'string',
    width: 18
  },
  {
    title: 'MV',
    field: 'average',
    align: 'left',
    minWidth: '140px',
    type: 'string',
    width: 18
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    minWidth: '140px',
    type: 'string',
    width: 18
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    minWidth: '140px',
    type: 'string',
    width: 18
  },

  {
    title: 'MV',
    field: 'average',
    align: 'left',
    disableSorting: false,
    isGroup: true,
    type: 'string',
    width: 18
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    disableSorting: false,
    isGroup: true,
    type: 'string',
    width: 18
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    disableSorting: false,
    isGroup: true,
    type: 'string',
    width: 18
  },

  {
    title: 'Gama produs',
    field: 'clusterMandatory',
    align: 'left',
    type: 'string',
    render: (row: any) => (
      <Box>
        <BooleanIcon value={row.inPromotion} icon={'Flag'}
          onSuccess="#33691E"
          onFailure="#E5E5E5" />
      </Box>
    ),
    width: 18
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
    ),
    width: 18
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
    ),
    width: 18
  },
  {
    title: 'Ultima persoana care a modificat fisierul',
    field: 'username',
    align: 'left',
    width: 40,
    type: 'string'
  }
]
