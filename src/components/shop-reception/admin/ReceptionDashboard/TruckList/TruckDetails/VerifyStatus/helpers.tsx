import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Status',
    field: 'statusValue',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Tip scanare',
    field: 'processType',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Contor suporti',
    field: 'counter',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Numar inmatriculare',
    field: 'truckNumber',
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
