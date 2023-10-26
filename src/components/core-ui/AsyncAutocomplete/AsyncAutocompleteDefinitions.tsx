export interface AsyncAutocompleteOption {
  value: string | number
  label: string
}

export interface AsyncAutocompleteProps {
  value: AsyncAutocompleteOption
  options: AsyncAutocompleteOption[]
  name: string
  label: string
  variant: 'outlined' | 'standard'
  onChange: (value: any) => void
  onBlur?: () => void
  disableClearable?: boolean
  error?: boolean
  helperText?: string
  required?: boolean
}