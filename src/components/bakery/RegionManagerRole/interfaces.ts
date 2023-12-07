export interface ProductManagementItem {
    id: string
    productName: string
    metiCode: string
    eanCodes: string
    pluCode: string
    appelCodes: string
    familyModuleName: string
    familyName: string
    subfamily: string
    unitBusiness: string
    enable: boolean
    status: string
    provider: string
    fabricationMethod: string
    clusterName: string
    clusterMandatory: boolean
    scheduleProduct: boolean
    minStock: string
    newProduct: boolean
    imageUrl: string
}

export interface ApplicationReportDynamicDtosItem {
    date: Date
    printCadentier: boolean
    modifyCadentier: boolean
    modifyStoreGrowth: boolean
    modifyProductGrowth: boolean
    login: boolean
}
  
export interface TableItem {
    storeName: string
    username: string
    lastAccess: Date
    lastChange: Date
    applicationReportDynamicDtos: ApplicationReportDynamicDtosItem[]
}
  