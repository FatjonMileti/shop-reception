import { Action, SelectOption } from 'components/utils/definitions/Definitions'

export interface CountyCityProps {
  action: Action
  width: string | number
  label: string
  variant: 'outlined' | 'standard'
  id?: string
}

export interface CountyCitySelectProps {
  county: CountyCityProps
  city: CountyCityProps
  value: {
    county: SelectOption
    city: SelectOption
  }
  onChange: (value: SelectOption | string, variable: 'county' | 'city') => void
  hidden?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  required?: boolean
}
