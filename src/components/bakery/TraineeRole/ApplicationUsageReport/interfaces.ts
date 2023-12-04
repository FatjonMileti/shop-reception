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
