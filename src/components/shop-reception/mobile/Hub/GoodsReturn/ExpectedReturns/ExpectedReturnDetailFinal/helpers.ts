import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'

export const columns: Array<TableHeaderType> = [
  {
    title: '',
    field: 'supportCode',
    align: 'left'
  },
  {
    title: '',
    field: 'supportTypeName',
    align: 'left'
  },
  {
    title: 'Așteptat',
    field: 'supportNumber',
    align: 'left'
  },
  {
    title: 'Descărcate',
    field: 'confirmedSupportNumber',
    align: 'left'
  }
]