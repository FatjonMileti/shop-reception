import { RowItem } from './interfaces'

export const toTableRowItems = (items: RowItem[]) =>
  items.map(item => ({
    id: item.id,
    name: item.name,
    cif: item.cif,
    address: item.address.fullAddress,
    phone: item.phone
  }))

export const columns = [
  {
    title: 'Nume',
    field: 'name',
    align: 'left'
  },
  {
    title: 'COD/CIF',
    field: 'cif',
    align: 'left'
  },
  {
    title: 'Adresa',
    field: 'address',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Telefon',
    field: 'phone',
    align: 'left',
    collapsible: true
  }
]
