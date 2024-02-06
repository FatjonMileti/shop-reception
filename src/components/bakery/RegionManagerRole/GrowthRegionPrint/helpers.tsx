import { Box } from '@mui/material'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    type: 'string',
    width: '60px'
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
    minWidth: '140px',
    type: 'string',
    width: '18px'
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    minWidth: '140px',
    type: 'string',
    width: '18px'
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    minWidth: '140px',
    type: 'string',
    width: '18px'
  },

  {
    title: 'MV',
    field: 'average',
    align: 'left',
    isGroup: true,
    type: 'string',
    width: '18px'
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    isGroup: true,
    type: 'string',
    width: '18px'
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    isGroup: true,
    type: 'string',
    width: '18px'
  },

  {
    title: 'Gama produs',
    field: 'clusterMandatory',
    align: 'left',
    width: '18px',
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
    width: '18px',
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
    width: '18px',
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
    width: '40px',
    type: 'string'
  }
]
