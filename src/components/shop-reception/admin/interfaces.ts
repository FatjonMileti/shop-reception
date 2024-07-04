interface TruckItem {
  id: number
  approvedDate: string
  approver: string
  arrivalConform: boolean
  created: string
  createdBy: string
  creationOperator: string
  depositName: string
  depositTemperature: number
  documentsConform: boolean
  driverName: string
  etransportStatus: string
  flowType: string
  flowTypeValue: string
  hubName: string
  manualCreationDate: string
  sealConform: boolean
  seals: string
  shopName: string
  shopTemperature: number
  status: string
  statusValue: string
  thermodiagramConform: boolean
  ticketCodes: string
  transportCode: string
  truckNumber: string
}

interface DeliveryTruck {
  id: string
  approveDate: string
  arrivalConform: boolean
  deliveredShopCode: string
  deliveredShopCodeName: string
  deliveryTicketCreated: string
  deliveryTickets: string
  deliveryType: string
  depositIds: string
  depositType: string
  driverName: string
  expectedDeliveryDate: string
  flowType: string
  hubReceived: string
  hubSent: string
  sealConform: boolean
  false
  shopCode: string
  shopName: string
  status: string
  supportCount: number | string
  thermodiagramConform: boolean
  transportCode: string
  truckCreated: string
  truckId: number | string
  truckNumber: string
}
interface NoticeSeriesNumber {
  id: number
  canEdit: boolean
  noticeCurrentNumber: number | string
  noticeMaxNumber: number | string
  noticeMinNumber: number | string
  noticeSeries: string
  parentSociety: string
  year: number | string
}
interface ParentSociety {
  id: number
  bankAccount: string
  bankName: string
  businessName: string
  created: string
  createdBy: string
  fiscalAddress: string
  lastUpdate: string
  lastUpdateBy: string
  parentSocietyName: string
  regNumber: string
  socialCap: string
  vatId: string
}

interface AdminDeposit {
  id: number
  code: string
  name: string
  type: string
  address: string
  validityPercentage: number
  emails: string[]
  packagingResponsibleEmail: string
  cif: string
  office: string
  bankAccount: string
  bankName: string
  workingPoint: string
  capital: string
  active: boolean
  acceptReturn: boolean
  depositUsers: string[]
}

interface AdminHub {
  id: number
  code: string
  name: string
  type: string
  address: string
  active: boolean
  users?: string[]
  packagingResponsibleEmails?: string
}

interface AdminHubDeliveryInterval {
  receiveFromDeposit: boolean
  depositId: number
  depositName: string
  depositCode: string
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  startInterval: string
  endInterval: string
}

interface AdminStore {
  id: number
  metiCode: string
  metiName: string
  metiType: string
  metiVersion: string
  adCode: string
  receptionDeviation: number
  regionNames: string
  sftpIp: string
  sftpPath: string
  canEditQuantities: string
  active: boolean
  hourlyIntervals: number
  address: string
  city: string
  town: string
  regNumber: string
  CIF: string
  office: string
  bankName: string
  bankAccount: string
  capital: string
  parentSociety: string
  canCallReturnTruck: boolean
}

interface AdminRegion {
  id: number
  code: string
  name: string
  responsible: string
  active: boolean
  shopIds?: []
}

interface CentralizeStoresHub {
  destinationId: number
  destinationName: string
  depositNames: string
  hubNames: string
}

interface ScanType {
  id: number
  active: boolean
  start: string
  end: string
  shopType: {
    key: string
    value: string
  }
  regionName: string
  shopCode: string
  shopName: string
  type: {
    key: string
    value: string
  }
}

interface SensitiveArticle {
  id: string
  dateInfo: string
  donePercent: string
  idDeliverySupport: string
  lastUpdate: string
  scannedNo: number | string
  shopName: string
  verifiedNo: number | string
}

interface SensitiveProduct {
  id: number
  shopCode: string
  shopName: string
  prodName: string
  ubName: string
  sfaName: string
  famName: string
  rayName: string
  shopType: ShopType
}

interface SubFamilyValidityThreshold {
  id: string
  sfaCode: string
  sfaName: string
  famCode: string
  famName: string
  rayCode: string
  rayName: string
  validityLimit: number | string
}

interface PackingType {
  id: number
  code: string
  externalCode: string
  name: string
  main: boolean
  combined: boolean
  missing: boolean
  active: boolean
  alternativeCodes: string
  returnable: boolean
  childrenIds?: number[]
}

interface BalancePackage {
  id: number
  store: string
  hub: string
  society: string
  supportType: string
  qualitativeInventory: string
  theoreticalStock: string
  inventoryDefect: string
  difference: string
  finalStockAfterInventory: string
  inventoryManager: string
  inventoryDate: string
  inventoryUpdate: string
  inventoryHistory: string
}

interface DifferencesProduct {
  id: number
  externalTicketId: string
  shopName: string
  shopCode: string
  depositName: string
  productCode: string
  productName: string
  originalOrderId: string
  metiOrderId: string
  measureUnit: string
  transportCode: string
  orderedQuantity: number | string
  receivedQuantity: number | string
  brokenQuantity: number | string
  receptionDeviation: number | string
  stockQuantity: number | string
  missingQuantity: number | string
  transporterCode: string
  metiSentDate: string
  integrationOperator: string
  archivePath: string
}
interface AutocompleteOption {
  label: string
  value: string | number
}

interface DLCProducts {
  id: number
  shopCode: string
  shopName: string
  prodName: string
  ubName: string
  sfaName: string
  famName: string
  rayName: string
  shopType: {
    key: string
    value: string
  }
}


interface ShopType {
  key: string
  value: string
}

interface SGRProducts {
  id: number
  shopCode: string
  shopName: string
  prodName: string
  ubName: string
  famName: string
  sfaName: string
  rayName: string
  shopType: ShopType[]
}

interface MetiFile {
  id: number
  shopCode: string
  shopName: string
  depositName: string
  depositCode: string
  createdBy: string
  fileStatus: string
  fileStatusValue: string
  ticketExternalId: string
  receivedFilePath: string
  sentFilePath: string
  createdDate: string
  sentTime: string
  receivedTime: string
  hasError: boolean
  hasDifference: boolean
  hasMetiDifference: boolean
  hasRetry: boolean
  hasNotIntegrated: boolean
  numberOfSentFiles: number
  numberOfReceivedFiles: number
}

interface MetiProduct {
  id: number
  code: string
  name: string
  unit: string
  lifetimeDays: number
  rayon: string
  family: string
  subFamily: string
  validityLimit: number
}

interface PackagingCompliance {
  id: number
  store: string
  warehouse: string
  deliverySlip: string
  supportType: string
  supportCode: string
  supportCompliance: string
  receptionDate: string
  downloadImages: string
}

interface PackagingDispute {
  id: number
  warehouse: string
  storeType: string
  store: string
  via: string
  society: string
  shopTaskDate: string
  storeTaskSolutionDate: string
  notificationsSent: string
  shopNoticeNumber: string
  shopNoticeDate: string
  status: string
}

interface PackagingDisputeTimer {
  id: number
  timerType: string
  timerTypeValue: string
  timerValue: string
  timerDescription: string
}

interface PackagingInventory {
  id: number
  store: string
  hub: string
  society: string
  supportType: string
  inventoryQualitative: string
  theoreticalBalanceQualitative: string
  defectiveInventory: string
  difference: string
  finalStockAfterInventory: string
  inventoryManager: string
  inventoryDate: string
}

interface PackagingInventoryHistory {
  id: number
  store: string
  supportType: string
  qualitative: string
  defective: string
  inventoryManager: string
  inventoryDate: string
}

interface CentralizedNotice {
  id: number
  inventoryDate: string
}

interface TransportResponsible {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface PackagingTypesDifference {
  id: number
  warehouse: string
  store: string
  hub: string
  society: string
  supportCode: string
  deliverySlip: string
  expectedSupportType: string
  supportTypeConfirmed: string
  registrationNumber: string
  date: string
  downloadImages: string
}

interface ReceptionFile {
  id: number
  externalTicketId: string
  depositName: string
  shopNames: string
  createdDate: string
  success: string
  reason: string
  reimportAllowed: string
}

interface ReturnedPackaging {
  id: number
  store: string
  warehouse: string
  hub: string
  society: string
  packageCodeLoaded: string
  packTypeLoaded: string
  quantityLoaded: string
  downloadedAmount: string
  shopNoticeNumber: string
  seal: string
  shopShipmentDate: string
  noticeHub: string
  route: string
  registrationNumber: string
  returnPacking: string
  verificationDate: string
  checkOperator: string
  status: string
}

interface ReturnTruck {
  id: number
  store: string
  viaHub: string
  warehouseSupplier: string
  society: string
  route: string
  registrationNumber: string
  driveNumber: string
  returnPackaging: string
  seals: string
  shopNotices: string
  hubNotices: string
  complianceDocuments: string
  thermodiagramConformity: string
  receptionWithinHours: string
  sealCompliance: string
  status: string
  registrationDate: string
  shippingDate: string
}

interface RollingPackages {
  id: number
  warehouse: string
  store: string
  hub: string
  society: string
  expectedSupportType: string
  confirmedSupportType: string
  truckLocation: string
  registrationNumber: string
  supportCode: string
  deliverySlip: string
  noticeNumber: string
  entry: string
  lesire: string
  finalStockAfterInventory: string
  date: string
  image: string
}

interface SupportTradability {
  id: number

  transportCode: string
  truckType: string
  flowType: string
  expeditionDate: string
  truckNumber: string
  depositName: string
  driverName: string
  driverPhone: string
  hubName: string
  shopName: string
  parentSociety: string
  packageCategory: string
  arrivedSupportsNumber: number | string
  supportsNumberReleased: number | string
  inHubReleaseDateTime: string
  inHubPresentationHour: string
  inHubReleaseHour: string
  inHubLoadingDateTime: string
  inHubLoadingHour: string
  truckNumberHub: string
  driverNameHub: string
  loadedSupportsNumber: number | string
  inShopReleaseDate: string
  inShopReleaseHour: string
}

interface GoodsDeliveryReport {
  id: number
  finalStores: string
  warehouses: string
  cargoCategory: string
  departureHub: string
  arrivalHub: string
  raceCode: string
  truckNumber: string
  driverName: string
  deliveryStatus: string
  location: string
  estimatedDeliveryDate: string
  arrivalStoreName: string
  arrivalStoreCode: string
  thermodiagramCompliance: string
  sealCompliance: string
  arrivalCompliance: string
  registrationDate: string
  deliverySlips: string
  arrivalDate: string
  supportNumber: string
}

interface SupportWrongDestination {
  id: number
  supportCode: string
  depositName: string
  externalTicketId: string
  externalOrderId: string
  originalOrderId: string
  shopName: string
  destinationShopName: string
  lastUpdateBy: string
  lastUpdate: string
  resolved: boolean
  resolvingDate: string
  resolvedBy: string
  resolvingComment: string
  hasAttachment: boolean
  wrongDestinationResultId: string
  supportId: string
  canResolve: boolean
}

interface UnorderedProducts {
  id: number
  depositName: string
  shopName: string
  shopCode: string
  productCode: string
  productName: string
  productEan: string
  validatedQuantity: number | string
  brokenQuantity: number | string
  defectReason: string
  externalSupportCode: string
  deliveryTicketExternalId: string
  created: string
  createdBy: string
  resolved: boolean
  updated: string
  lastUpdateBy: string
}
