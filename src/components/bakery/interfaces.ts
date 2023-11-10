export interface UsersManagementItem {
  lastName: string
  firstName: string
  storeName: string
  regionName: number
  roles: string[]
  enable: boolean
  id: string
}

export interface EditUserItem {
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

export interface EditZoneItem {
  name: string
  responsible: string
  divisionType: string
  enable: string
  stores: string[]
  id: string
}

export interface AddZoneItem {
  name: string
  responsible: string
  divisionType: string
  enable: string
  stores: string[]
  id: string
}
