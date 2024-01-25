import { Box } from '@mui/material'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { BooleanText } from 'components/core-ui/BooleanText'
import { ImageCell } from 'components/core-ui/ImageCell'
import { DatePicker, Autocomplete, FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'

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
    width: '200px',
    type: 'string',
    defaultPrintSelected: true
  },
  {
    title: 'Cod METI',
    field: 'productMetiCode',
    align: 'left',
    width: '100px',
    sticky: true,
    type: 'string',
    defaultPrintSelected: true
  },
  {
    title: 'Familie',
    field: 'familyName',
    align: 'left',
    type: 'string',
    defaultPrintSelected: false
  },
  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left',
    type: 'string',
    defaultPrintSelected: false
  },
  {
    title: 'MV',
    field: 'average',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    type: 'string',
    defaultPrintSelected: false
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    type: 'string',
    defaultPrintSelected: true
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    type: 'string',
    defaultPrintSelected: false
  },

  {
    title: 'MV',
    field: 'average',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    isGroup: true,
    type: 'string',
    defaultPrintSelected: false
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    isGroup: true,
    type: 'string',
    defaultPrintSelected: true
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    isGroup: true,
    type: 'string',
    defaultPrintSelected: false
  },

  {
    title: 'Gama produs',
    field: 'clusterMandatory',
    align: 'left',
    type: 'string',
    render: (row: any) => (
      <Box>
        <BooleanText value={row.inPromotion} onSuccess="O" onFailure="F" />
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
    ),
    minWidth: '100px'
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
    minWidth: '200px',
    type: 'string'
  }
]

export const drawerFilters = (currentDate, familiesQuery, subfamiliesQuery) => [
  {
    name: 'date',
    value: currentDate,
    filter: (
      <DatePicker
        label="Planificare pentru"
        variant="outlined"
        value={currentDate}
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
    label: 'Familie'
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
