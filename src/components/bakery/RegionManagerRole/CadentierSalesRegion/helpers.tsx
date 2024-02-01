import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { BooleanText } from 'components/core-ui/BooleanText'
import { ImageCell } from 'components/core-ui/ImageCell'
import { DatePicker, Autocomplete } from '@fullscreendigital/carrefour-dex-fe'

export const columns = [
    {
      title: 'Produs',
      field: 'productName',
      align: 'left',
      sticky: true,
      render: row => (
        <ImageCell imageUrl={row.imageUrl} value={row.productName} />
      )      
    },
    {
      title: 'Cod METI',
      field: 'productMetiCode',
      align: 'left',
      sticky: true
    },
    {
      title: 'Medie vanzari',
      field: 'average',
      align: 'left',
      minWidth: '140px'
    },
    {
      title: 'Cantitati propuse',
      field: 'quantityToProduce',
      align: 'left',
      minWidth: '140px',
    },
    {
      title: 'Cantitati modificate',
      field: 'calculation',
      align: 'left',
      minWidth: '140px',
    },
    {
      title: 'Medie vanzari',
      field: 'average',
      align: 'left',
      minWidth: '140px',
      isGroup: true
    },
    {
      title: 'Cantitati propuse',
      field: 'quantityToProduce',
      align: 'left',
      minWidth: '140px',
      isGroup: true
    },
    {
      title: 'Cantitati modificate',
      field: 'calculation',
      align: 'left',
      minWidth: '140px',
      isGroup: true
    },
    {
      title: 'Vanzari reale',
      field: 'realSales',
      align: 'left',
      minWidth: '140px',
      isGroup: true
    },
    {
      title: 'Vanzari in destocaj',
      field: 'clearanceSales',
      align: 'left',
      minWidth: '140px',
      isGroup: true
    },
    {
      title: 'Gama produs',
      field: 'clusterMandatory',
      align: 'left',
      render: row => (
        <BooleanText onSuccess='O' onFailure='F' value={row.productRange} />
      )
    },
    {
      title: 'Oferta in ziua respectiva',
      field: 'inPromotion',
      align: 'left',
      minWidth: '200px',
      render: row => (
        <BooleanIcon value={row.inPromotion} icon="Flag" onFailure='#E5E5E5' onSuccess='#33691E' />
      ) 
    },
    {
        title: 'Produs nou',
        field: 'newProduct',
        align: 'left',
        render: row => (
          <BooleanIcon value={row.newProduct} icon="Flag" onFailure='#E5E5E5' onSuccess='#33691E' />
        ) 
    },
    {
      title: 'Familie',
      field: 'familyName',
      align: 'left',
      width: '140px'
    },
    {
        title: 'Ultima pers care a modificat fisierul',
        field: 'changedBy',
        align: 'left',
        minWidth: '200px'
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