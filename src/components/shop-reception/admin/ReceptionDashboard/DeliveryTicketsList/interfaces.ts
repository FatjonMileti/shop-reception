export interface DeliveryTicket {
  id: number | string
  externalTicketId?: string
  externalShopCode?: string
  shopCode: string
  created: string
  deliveryHour?: string
  expectedDeliveryDate?: Date
  transporterCode?: string
  transportCode: string
  sealCode: string
  truckNumber: string
  status: string
  validatedShopCodes?: string
  sentShopCodes?: string
  receptionFile?: string
  depositName: string
  numberOfSupports: number
  validatedSupports: number
}

export interface DeliveryTicketDetails {
  id: number
  externalOrderId: string
  originalOrderId: string
  supportCode: string
  heterogeneousCode: string
  expectedSupportType: string
  receivedSupportType?: string | null
  secondarySupportType: string
  supportStatus: string
  eanCode: string
  eanReceived: string
  productCode: string
  productName: string
  priorityForSale: boolean
  measureUnit: string
  deliveredQuantity: string
  totalDeliveredQuantity: string
  qualitativeQuantity: string
  defectQuantity: string
  missingQuantity: string
  defect?: boolean
  defectReason: string
  recommendedScanType: string
  scanType: string
  secondarySupportNumber: string
  shortDlc: boolean
  dlcDate: string
  dlcDateExcel: string
  confirmedDlc?: string
  batch: string
  sensitive: boolean
  verified: boolean
  missing: boolean
  shopName: string
  receptionDate: string
  validityPercentage: string
  lifetimePercent?: string
  sgr: boolean
  canBeSentToMeti?: boolean
}
