export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    name: item.name || '',
    metiCode: item.metiCode || '',
    divisionType: item.divisionType || '',
    parentSociety: item.parentSociety || '',
    region: item.region || '',
    zone: item.zone || '',
    enable: item.enable,
  }))