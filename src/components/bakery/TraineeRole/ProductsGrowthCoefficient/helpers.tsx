import { ImageCell } from 'components/core-ui/ImageCell'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    type: 'string',
    width: '170px',
    render: (row: any) => <ImageCell imageUrl={row.imageUrl} value={row.productName} />
  },
  {
    title: 'Cod METI',
    field: 'metiCode',
    align: 'left',
    type: 'string',
    width: '150px'
  },
  {
    title: 'Familie',
    field: 'familyName',
    align: 'left',
    type: 'string',
    width: '150px'
  },
  {
    title: 'Cod familie',
    field: 'familyCode',
    align: 'left',
    type: 'string',
    width: '150px'
  },
  {
    title: 'Coeficient general',
    field: 'generalGrowth',
    align: 'left',
    type: 'string',
    width: '200px'
  },
  {
    title: 'Ultima actualizare',
    field: 'username',
    align: 'left',
    type: 'string',
    width: '200px'
  },
  {
    title: 'Ultima modificare',
    field: 'lastChange',
    align: 'left',
    type: 'date',
    width: '200px'
  },
  {
    title: 'Coeficient',
    field: 'growth',
    align: 'left',
    type: 'string',
    width: '200px',
    disableSorting: true,
    isGroup: true
  }
]

export const drawerFilters = (familiesQuery) => [
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
]