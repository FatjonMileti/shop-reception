export const columns = [
  {
    title: 'Id alerta',
    field: 'id',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Id articol',
    field: 'articleId',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume articol',
    field: 'articleName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data amanare',
    field: 'snoozeStart',
    align: 'left',
    type: 'string',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Data finalizare amanare',
    field: 'snoozeEnd',
    align: 'left',
    type: 'string',
    disableSorting: true,
    collapsible: true
  }
]
