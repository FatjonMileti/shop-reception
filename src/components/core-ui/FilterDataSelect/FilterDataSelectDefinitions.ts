export interface FilterDataSelectOption {
    value: string | number
    label: string
}
  
export interface FilterDataSelectProps { 
placeholderButton?: string
selectedData: FilterDataSelectOption
options: FilterDataSelectOption[] | []
name: string
label?: string
showSearch?: boolean,
showCounter?: boolean,
counterLabel?: string,
noDataFoundLabel?: string,
allTypesLabel?: string,
onSelect: (value: any) => void
}