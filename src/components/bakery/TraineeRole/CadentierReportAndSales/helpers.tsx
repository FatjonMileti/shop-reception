import { Box } from '@mui/material'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { ImageCell } from 'components/core-ui/ImageCell'
import { Autocomplete, DatePicker } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    render: (row: any) => (
      <Box>
        <ImageCell value={row.productName} imageUrl={row.imageUrl} />
      </Box>
    ),
    sticky: true,
    type: 'string'
  },
  {
    title: 'Cod METI',
    field: 'productMetiCode',
    align: 'left',
    sticky: true,
    type: 'string'
  },

  {
    title: 'Medie vanzari',
    field: 'average',
    align: 'left',
    type: 'string',
    minWidth: '140px'
  },
  {
    title: 'Cantitati propuse',
    field: 'quantityToProduce',
    align: 'left',
    minWidth: '140px',
    type: 'string'
  },
  {
    title: 'Cantitati modificate',
    field: 'calculation',
    align: 'left',
    minWidth: '140px',
    type: 'string'
  },
  {
    title: 'Medie vanzari',
    field: 'average',
    align: 'left',
    minWidth: '140px',
    type: 'string',
    isGroup: true
  },

  {
    title: 'Cantitati propuse',
    field: 'quantityToProduce',
    align: 'left',
    minWidth: '140px',
    type: 'string',
    isGroup: true
  },
  {
    title: 'Cantitati modificate',
    field: 'calculation',
    align: 'left',
    minWidth: '140px',
    type: 'string',
    isGroup: true
  },
  {
    title: 'Vanzari  reale',
    field: 'realSales',
    align: 'left',
    minWidth: '170px',
    type: 'string',
    isGroup: true
  },

  {
    title: 'Vanzari in destocaj',
    field: 'clearanceSales',
    align: 'left',
    type: 'string',
    width: '180px',
    isGroup: true
  },
  {
    title: 'Gama produs',
    field: 'productRange',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Oferta in ziua respectiva',
    field: 'dailyOffer',
    align: 'left',
    minWidth: '200px',
    type: 'boolean',
    render: (row: any) => (
      <Box>
        <BooleanIcon value={row.dailyOffer} icon={'Flag'} onSuccess="#33691E" onFailure="#E5E5E5" />
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
    title: 'Familie',
    field: 'familyName',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Ultima persoana care a modificat fisierul',
    field: 'changedBy',
    align: 'left',
    minWidth: '200px',
    type: 'string'
  }
]

export const drawerFilters = (prevDay, familiesQuery, subfamiliesQuery) => [
  {
    name: 'date',
    value: prevDay,
    filter: (
      <DatePicker
        label="Planificare pentru"
        variant="outlined"
        value={prevDay}
        onChange={() => {}}
        required
      />
    ),
    type: 'date',
    label: 'Planificare pentru'
  },
  {
    name: 'family',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Familie"
        options={familiesQuery.data || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Familie',
    clearFiltersOnChange: ['subfamily']
  },
  {
    name: 'subfamily',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Subfamilie"
        options={subfamiliesQuery.data || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Subfamilie'
  },
]