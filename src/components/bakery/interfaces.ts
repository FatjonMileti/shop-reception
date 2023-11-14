export interface UsersManagementItem {
  lastName: string
  firstName: string
  storeName: string
  regionName: number
  roles: string[]
  enable: boolean
  id: string
}

export interface ZoneItem {
  name: string
  responsible: string
  divisionType: string
  enable: string
  stores: string[]
  id: string
}

export interface AddEditZoneItem {
  id?: string | number
  name: string
  responsible: string
  enable: string | boolean
  divisionType: string
  stores: string[]
}

export interface RegionItem {
  name: string
  responsible: string
  divisionType: string
  enable: string
  stores: string[]
  id: string
}

export interface AddEditRegionItem {
  id?: string | number
  divisionType: string
  enable: string | boolean
  name: string
  responsible: string
}

export interface StoreItem {
  name: string
  metiCode: string
  divisionType: string
  parentSociety: string
  region: string
  zone: string
  enable: string
  id: string
}

export interface EditStoreItem {
  id?: string | number
  name: string
  divisionType: string
  enable: string | boolean
  metiCode: string
  parentSociety: string
  region: string
  zone: string
}

export interface ClustersItem {
  name: string
  mandatory: string
  enable: string | boolean
  id: string
}

export interface EditClusterItem {
  name: string
  mandatory: string | boolean
  enable: string | boolean
  id: string
}

export interface ValueLabelInterface {
  value: string
  label: string
}
