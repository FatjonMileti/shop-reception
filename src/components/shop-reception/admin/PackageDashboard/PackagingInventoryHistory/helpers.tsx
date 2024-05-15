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
    title: 'Calitativ',
    field: 'intactNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Defect',
    field: 'brokenNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Responsabil inventar',
    field: 'createdBy',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data inventar',
    field: 'createdDate',
    align: 'left',
    type: 'string'
  }
]
