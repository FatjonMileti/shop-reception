import { Action } from 'components/utils/definitions/Definitions'

export interface PlusMinusNumberInputProps {
  action: Action
  count: number
  field: string
  payload?: { [key: string]: string }
  additionalAction?: () => void
}
