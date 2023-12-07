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

export interface GrowthIndexItem {
    id: string
    name: string
    growth: number
    username: string
    lastChange: Date
    divisionType: string
}

export interface EditGrowthIndexItem {
    divisionType: string
    growth: number
    id: string
    lastChange: Date
    name: string
    username: string
}

export interface GrowthIndexProductViewListItem {
    timeSlotId: string
    start: string
    end: string
    growth: number
    name: string
}

export interface GrowthIndexProductViewItem {
    id: string
    productName: string
    imageUrl: string
    metiCode: number
    familyCode: number
    generalGrowth: number
    username: string
    lastChange: Date
    list: GrowthIndexProductViewListItem[]
}