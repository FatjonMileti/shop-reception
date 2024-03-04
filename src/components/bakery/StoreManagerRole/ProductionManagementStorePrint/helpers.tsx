import { Box } from '@mui/material'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    type: 'string',
    width: '60px',
  },
  {
    title: 'Cod METI',
    field: 'productMetiCode',
    align: 'left',
    type: 'string',
    width: '30px'
  },
  {
    title: 'Familie',
    field: 'familyName',
    align: 'left',
    type: 'string',
    width: '60px'
  },
  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left',
    type: 'string',
    width: '18px'
  },
  {
    title: 'MV',
    field: 'average',
    align: 'left',
    width: '18px',
    type: 'string'
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    width: '18px',
    type: 'string'
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    width: '18px',
    type: 'string'
  },

  {
    title: 'MV',
    field: 'average',
    align: 'left',
    isGroup: true,
    type: 'string',
    width: '18px',
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    isGroup: true,
    type: 'string',
    width: '18px',
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    isGroup: true,
    type: 'string',
    width: '18px',
  },
  {
    title: 'Gama produs',
    field: 'clusterMandatory',
    align: 'left',
    type: 'string',
    width: '18px',
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
    width: '18px',
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
    width: '18px',
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
    type: 'string',
    minWidth: '40px'
  }
]
