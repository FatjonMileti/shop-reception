import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Status',
    field: 'deliveryStatusValue',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Locatie camion',
    field: 'supportTypeFlowValue',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Creat de',
    field: 'createdBy',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Data crearii',
    field: 'created',
    type: 'string',
    disableSorting: true,
    render: row => formatUIDate(row.created)
  },
  {
    title: 'Actualizat de',
    field: 'updatedBy',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Ultima actualizare',
    field: 'updated',
    type: 'string',
    disableSorting: true,
    render: row => formatUIDate(row.updated)
  }
]
