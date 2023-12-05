export interface FilterDataSelectOption {
    value: string | number
    label: string
}
  
export interface FilterDataSelectProps { 
selectedData: FilterDataSelectOption
options: FilterDataSelectOption[] | []
name: string
label?: string
showSearch?: boolean,
showCounter?: boolean,
counterLabel?: string,
noDataFoundLabel?: string,
onSelect: (value: any) => void
}