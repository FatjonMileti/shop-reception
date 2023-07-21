export type Action = {
  url: string
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  valueKey?: string
  labelKey?: string
  storeIn?: string
  href?: string
  variable?: string
  errorMessage?: string
}

export interface SelectOption {
  label: string
  value: string | number
}
