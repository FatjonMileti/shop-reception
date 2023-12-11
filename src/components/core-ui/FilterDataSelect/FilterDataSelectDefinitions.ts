export interface FilterDataSelectOption {
    value: string | number
    label: string
}
  
export interface FilterDataSelectProps { 
placeholderButton?: string
defaultSelectedData?: FilterDataSelectOption | {} | FilterDataSelectOption[] | [] 
options: FilterDataSelectOption[] | []
name: string
label?: string
multiSelect?: boolean,
showSearch?: boolean,
showCounter?: boolean,
counterLabel?: string,
noDataFoundLabel?: string,
allTypesLabel?: string,
onSelect: (value: any) => void
}