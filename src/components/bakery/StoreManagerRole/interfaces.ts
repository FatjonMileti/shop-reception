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

export interface SubfamilyItem {
  index: number
  subFamily: string
}

export interface FamilyItem {
  id: string
  name: string
}
