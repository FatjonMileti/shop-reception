export interface TableState {
    order: string
    orderBy: string
    tableFilters: Filter[]
}

export interface Filter {
    name: string
    value: string | number | string[]
}