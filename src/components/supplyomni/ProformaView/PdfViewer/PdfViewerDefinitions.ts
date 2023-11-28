import { Action } from 'components/utils/definitions/Definitions'

export interface PdfViewerActions {
  downloadAction: Action
  printAction: Action
  printersAction: Action
  scanReceiptAction: {
    href: string
    label: string
  }
}

export interface Proform {
  id: string | number
  paid: boolean
  clientId: string | number
}

export interface PdfViewerProps {
  proform: Proform
  actions: PdfViewerActions
  isLoading: boolean
}
