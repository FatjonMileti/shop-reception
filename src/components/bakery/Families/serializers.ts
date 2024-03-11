export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    code: item.code ?? '',
    name: item.name || '',
    divisionType: item.divisionType || '',
    moduleName: item.moduleName || '',
    moduleId: item.moduleId || '',
    enable: item.enable || ''
  }))