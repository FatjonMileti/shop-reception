import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { BooleanText } from 'components/core-ui/BooleanText'
import { ImageCell } from 'components/core-ui/ImageCell'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    sticky: true,
    render: row => (
      <ImageCell imageUrl={row.productImageUrl} value={row.productName} />
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
    minWidth: "140px"
  },
  {
    title: 'Cantitati propuse',
    field: 'quantityToProduce',
    align: 'left',
    minWidth: '140px'
  },
  {
    title: 'Cantitati modificate',
    field: 'calculation',
    align: 'left',
    minWidth: '140px'
  },
  {
    title: 'Medie vanzari',
    field: 'average',
    align: 'left',
    minWidth: "140px",
    isGroup: true
  },
  {
    title: 'Cantitati propuse',
    field: 'quantityToProduce',
    align: 'left',
    minWidth: "140px",
    isGroup: true
  },
  {
    title: 'Cantitati modificate',
    field: 'calculation',
    align: 'left',
    minWidth: "140px",
    isGroup: true

  },
  {
    title: 'Vanzari reale',
    field: 'realSales',
    align: 'left',
    minWidth: "140px",
    isGroup: true
  },
  {
    title: 'Vanzari in destocaj',
    field: 'clearanceSales',
    align: 'left',
    minWidth: "140px",
    isGroup: true
  },
  {
    title: 'Gama produs',
    field: 'clusterMandatory',
    align: 'left',
    minWidth: '140px',
    isGroup: true,
    render: row => (
      <BooleanText onSuccess='O' onFailure='F' value={row.clusterMandatory} />
    )
  },
  {
    title: 'Oferta in ziua respectiva',
    field: 'inPromotion',
    align: 'left',
    minWidth: '200px',
    render: row => (
      <BooleanIcon icon={'Flag'} value={row.inPromotion} onSuccess='#33691E' onFailure='#E5E5E5'/>
    )
  },
  {
    title: 'Produs nou',
    field: 'newProduct',
    align: 'left',
    render: row => (
      <BooleanIcon icon={'Flag'} value={row.newProduct} onSuccess='#33691E' onFailure='#E5E5E5'/>
    )
  },
  {
    title: 'Ultima pers care a modificat fisierul',
    field: 'username',
    align: 'left',
    minWidth: '200px'
  }
]



