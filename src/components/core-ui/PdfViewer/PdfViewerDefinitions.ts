import { Action } from 'components/utils/definitions/Definitions'

export interface PdfViewerActions {
  downloadAction: Action
  printAction: Action
  scanReceiptAction: {
    href: string
    label: string
  }
}

export interface PdfViewerProps {
  action?: Action
  actions: PdfViewerActions
}
