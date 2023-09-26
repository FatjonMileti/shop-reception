import { Action } from 'components/utils/definitions/Definitions'

export interface SwitchProps {
  action: Action
  payloadKey: string
  successMessage?: string
  value?: boolean
  pathId?: string | number
}
