export const toTableRowItems = (items: AdminStore[]) => items.map((item: AdminStore) => ({
  id: item.id,
  metiCode: item.metiCode,
  metiName: item.metiName,
  metiType: item.metiType,
  metiVersion: item.metiVersion,
  adCode: item.adCode,
  receptionDeviation: item.receptionDeviation,
  regionName: item.regionName,
  sftpIp: item.sftpIp,
  sftpPath: item.sftpPath,
  canEditQuantities: item.canEditQuantities,
  active: item.active,
  hourlyIntervals: item.hourlyIntervals || 0
}))