import { Filter } from 'components/core-ui/Table/TableDefinitions'

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

export interface TableItem {
    average: number
    calculation: number
    clusterMandatory: boolean
    id: string
    imageUrl: string
    inPromotion: boolean
    list: TableItemListItem[]
    newProduct: boolean
    productMetiCode: number
    productName: string
    quantityToProduce: number
    subfamily: string
    username: string
}

interface TableItemListItem {
    average: number
    calculation: number
    end: string
    id: string
    name: string
    quantityToProduce: number
    start: string
}

export interface SubfamilyItem {
    index: number
    subFamily: string
}

export interface TableState {
    order: string
    orderBy: string
    tableFilters: Filter[]
}