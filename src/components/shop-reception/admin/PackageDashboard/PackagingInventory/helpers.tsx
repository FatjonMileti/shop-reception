import { DownloadIcon } from 'icons'

export const columns = [
  {
    title: 'Magazin',
    field: 'store',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Hub',
    field: 'hub',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Societate',
    field: 'society',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip Suport',
    field: 'supportType',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Calitativ Inventar',
    field: 'inventoryQualitative',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Calitativ Sold Tearetic',
    field: 'theoreticalBalanceQualitative',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Defect Inventar',
    field: 'defectiveInventory',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Defect Imagine',
    field: 'defectiveImage',
    align: 'left',
    collapsible: 'true',
    render: (row) => (
      <DownloadIcon />
    ),
  },
  {
    title: 'Diferenta',
    field: 'difference',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Stoc final dupa inventar',
    field: 'finalStockAfterInventory',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Responsabil inventar',
    field: 'inventoryManager',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Dată inventar',
    field: 'inventoryDate',
    align: 'left',
    type: 'string'
  }
]