export interface SelectOption {
  label: string
  value: string | number
}

export interface ComboValue extends SelectOption {
  name: string
}
