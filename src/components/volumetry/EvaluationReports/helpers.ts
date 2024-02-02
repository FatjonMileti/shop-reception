export const columns = [
  {
    title: 'Departament',
    field: 'department',
    align: 'left'
  },
  {
    title: 'Nr. zilei',
    field: 'dayNumber',
    align: 'left'
  },
  {
    title: 'Nr. task zilnice din total',
    field: 'totalDailyTasks',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Nr. zilnic task-uri executate',
    field: 'totalExcutedTasks',
    align: 'left',
    collapsible: true
  },
  {
    title: '% aplicare proces volumetrie',
    field: 'appliedVolumetryProcessPercentage',
    align: 'left',
    collapsible: true,
  },
  {
    title: 'Utilizat vs. Standard (nr. ore)',
    field: 'utilizedVsStandardHours',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Utilizat vs. Standard (FTE)',
    field: 'utilizedVsStandardFTE',
    align: 'left',
    collapsible: true,
  }
]
