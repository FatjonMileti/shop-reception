export const getColumns = isForShop => [
  ...(isForShop
    ? [
        {
          title: 'Magazin',
          field: 'shopName',
          align: 'left',
          type: 'string'
        }
      ]
    : [
        {
          title: 'HUB',
          field: 'hubName',
          align: 'left',
          type: 'string'
        }
      ]),
  {
    title: 'Tip suport',
    field: 'supportType',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Sold',
    field: 'stock',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Responsabil',
    field: 'createdBy',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Aviz/Bon livrare',
    field: 'noticeCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data actualizare',
    field: 'createdDate',
    align: 'left',
    type: 'string'
  }
]
