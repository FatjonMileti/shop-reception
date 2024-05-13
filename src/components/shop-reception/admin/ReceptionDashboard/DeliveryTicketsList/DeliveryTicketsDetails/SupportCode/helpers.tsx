import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Status',
    field: 'supportStatus',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'HUBC',
    field: 'hubName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cod support',
    field: 'externalCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cod eterogen',
    field: 'heterogeneousCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Creat de',
    field: 'createdBy',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data crearii',
    field: 'created',
    align: 'left',
    type: 'string',
    render: row => formatUIDate(row.created)
  },
  {
    title: 'Actualizat de',
    field: 'updatedBy',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Ultima actualizare',
    field: 'updated',
    align: 'left',
    type: 'string',
    render: row => formatUIDate(row.updated)
  }
]
