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

export interface AddEditRegionItem {
  id?: string | number
  divisionType: string
  enable: string | boolean
  name: string
  responsible: string
}

export interface FamiliesItem {
  code: string
  name: string
  divisionType: string
  moduleName: string
  id: string
}

export interface EditFamilyItem {
    id: string
    name: string
    code: number
    enable: string | boolean
    moduleName: string
    moduleId: string
    divisionType: string
}