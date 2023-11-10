export interface UsersManagementItem {
  lastName: string
  firstName: string
  storeName: string
  regionName: number
  roles: string[]
  enable: boolean
  id: string
}

export interface UserItem {
  lastName: string
  firstName: string
  role: string
  isRegionManager: boolean
  regionAssociatedStructure: string
  isStoreManager: boolean
  storeAssociatedStructure: string
  isTrainee: boolean
  traineeAssociatedStructure: string
  status: string
}

export interface AddRegionItem {
  divisionType: string
  enable: string
  name: string
  responsible: string
}