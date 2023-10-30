export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    projectName: item.project.name,
    stage: item.stage,
    iibKey: item.project.iibKey,
    ipbKey: item.project.ipbKey,
    startDate: item.startDate,
    endDate: item.endDate
  }))
