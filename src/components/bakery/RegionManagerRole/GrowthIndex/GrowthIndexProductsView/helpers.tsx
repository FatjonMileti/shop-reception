import { ImageCell } from "components/core-ui/ImageCell"
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
    {
      title: 'Produs',
      field: 'productName',
      align: 'left',  
      width: '170px',
      render: row => (
        <ImageCell imageUrl={row.imageUrl} value={row.productName} />
      ) 
    },
    {
      title: 'Cod METI',
      field: 'metiCode',
      align: 'left',
      width: '150px'
    },
    {
      title: 'Familie',
      field: 'familyName',
      align: 'left',
      width: '140px'
    },
    {
      title: 'Cod familie',
      field: 'familyCode',
      align: 'left',
      width: '140px'
    },
    {
      title: 'Coeficient',
      field: 'generalGrowth',
      align: 'left',
      width: '140px',
      disableSorting: true
    },
    {
      title: 'Ultima actualizare',
      field: 'username',
      align: 'left',
      width: '140px'
    },
    {
      title: 'Ultima modificare',
      field: 'lastChange',
      align: 'left',
      width: '140px'
    }
]

export const drawerFilters = (familiesQuery) => [
  {
    name: 'family',
    value: undefined,
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
  }
]

