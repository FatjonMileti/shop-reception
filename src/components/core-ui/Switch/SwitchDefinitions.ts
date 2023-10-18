import { Action } from 'components/utils/definitions/Definitions'

export interface SwitchProps {
  action: Action
  payloadKey: string
  successMessage?: string
  value?: boolean
  pathId?: string | number
  confirmModal?: ConfirmSwitchModalProps
  disableOnToggle?: boolean
}

export interface ConfirmSwitchModalProps {
  modalTitle: string
  toggleTrueMessage: string
  toggleFalseMessage: string
  cancelButtonText: string
  confirmButtonText: string
}
