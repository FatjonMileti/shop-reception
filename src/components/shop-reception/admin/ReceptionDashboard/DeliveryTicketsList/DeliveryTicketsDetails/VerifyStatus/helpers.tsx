import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Status',
    field: 'statusValue',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Tip scanare',
    field: 'q',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Contor suporti',
    field: 'w',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Numar inmatriculare',
    field: 'e',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Creat de',
    field: 'createdBy',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Data crearii',
    field: 'created',
    align: 'left',
    type: 'string',
    disableSorting: true,
    render: row => formatUIDate(row.created)
  },
  {
    title: 'Actualizat de',
    field: 'updatedBy',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Ultima actualizare',
    field: 'updated',
    align: 'left',
    type: 'string',
    disableSorting: true,
    render: row => formatUIDate(row.updated)
  }
]
