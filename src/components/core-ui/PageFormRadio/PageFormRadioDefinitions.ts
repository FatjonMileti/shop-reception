export interface RadioButtonOption {
  value: string
  label: string
  disabled?: boolean
}

export interface PageFormRadioProps {
  defaultValue: string
  forms: any
  options: RadioButtonOption[]
}
