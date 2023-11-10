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
