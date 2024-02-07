export const toTableRowItems = items =>
  items.map(item => ({
    appelCodes: item.appelCodes || '',
    clusterMandatory: item.clusterMandatory || '',
    clusterName: item.clusterName || '',
    eanCodes: item.eanCodes || '',
    enable: item.enable || '',
    fabricationMethod: item.fabricationMethod || '',
    familyModuleName: item.familyModuleName || '',
    familyName: item.familyName || '',
    id: item.id || '',
    imageUrl: item.imageUrl || '',
    metiCode: item.metiCode || '',
    minStock: item.minStock || 0,
    newProduct: item.newProduct || '',
    pluCode: item.pluCode || '',
    productName: item.productName || '',
    provider: item.provider || '',
    scheduleProduct: item.scheduleProduct || '',
    status: item.status || '',
    subfamily: item.subfamily || '',
    unitBusiness: item.unitBusiness || ''
  }))
