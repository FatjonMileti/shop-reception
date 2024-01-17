export const columns = [
  {
    title: 'Nume task',
    field: 'taskTemplateName',
    align: 'left',
    type: 'string',
    width: '250px'
  },
  {
    title: 'Volum de lucru',
    field: 'totalWorkload',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Alocare nr. angajati',
    field: 'estimatedWorkers',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Estimare ore',
    field: 'estimatedWorkHours',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Angajati repartizati real',
    field: 'actualWorkers',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Ore alocate standard',
    field: 'standardAllocatedHours',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'FTE standard',
    field: 'fteStandard',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Ore utilizate magazin',
    field: 'hoursUsed',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'FTE alocat magazin',
    field: 'fteUsed',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Diferenta ore vs standard',
    field: 'expectedActualDifference',
    align: 'left',
    type: 'string',
    collapsible: true
  }
]