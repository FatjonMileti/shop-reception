interface TruckItem {
  id: number
  store: string
  hub: string
  warehouseName: string
  truckLocation: string
  registrationNumber: string
  driverCode: string
  raceCode: string
  seals: string
  deliveryReceipts: string
  complianceDocuments: string
  thermodiagramConformity: string
  receptionWithinHours: string
  sealCompliance: string
  status: string
  registrationDate: string
  registrationOperator: string
  eTransportStatus: string
}

interface AdminDeposit {
  id: number
  code: string
  name: string
  type: string
  active: boolean
  validityPercentage?: string | number
  address?: string
  emails?: string
}

interface AdminHub {
  id: number
  code: string
  name: string
  type: string
  address: string
  active: boolean
  users?: string[]
  packagingResponsibleEmails?: string[]
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
  regionName: string
  sftpIp: string
  sftpPath: string
  canEditQuantities: string
  active: boolean
  hourlyIntervals: number
}

interface AdminRegion {
  id: number
  regionCode: string
  name: string
  regionManager: string
  active: boolean
}

interface CentralizeStoresHub {
  id: number
  store: string
  deposit: string
  hubs: string
}

interface ScanType {
  id: number
  storeType: string
  region: string
  storeCode: string
  storeName: string
  scanType: string
  startDate: string
  lastDate: string
  active: boolean
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
  shopType: {
    key: string
    value: string
  }
}

interface SubFamilyValidityThreshold {
  id: number
  familyCode: string
  subfamilyCode: string
  subfamily: string
  family: string
  districtCode: string
  district: string
  validityThreshold: string
}

interface PackingType {
  id: number
  packagingCode: string
  additionalCodes: string
  name: string
  main: string
  combination: boolean
  active: boolean
  return: boolean
  generatedBarcode: string
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
  deliverySlip: string
  store: string
  warehouse: string
  productName: string
  homeOrder: string
  metiOrder: string
  unitOfMeasure: string
  expectedQuantity: string
  qualitativeReceivedQuantity: string
  defectiveReceivedQuantity: string
  grams: string
  inStockQuantity: number
  difference: string
  raceCode: string
  sentToMeti: string
  integrationOperator: string
}

interface DLCProducts {
  id: number
  storeType: string
  storeCode: string
  storeName: string
  district: string
  family: string
  subfamily: string
  UbCode: string
  productCode: string
}

interface SeriesNumber {
  id: number
  series: string
  startInterval: number
  currentNumber: number
  year: number
  society: string
}

interface SGRProducts {
  id: number
  storeType: string
  storeCode: string
  storeName: string
  district: string
  family: string
  subfamily: string
  UbCode: string
  productCode: string
}

interface MetiFile {
  id: number
  deliverySlip: string
  store: string
  warehouse: string
  integrationOperator: string
  status: string
  sentFile: string
  receivedFile: string
  sentToMeti: string
  receivedFromMeti: string
  productsDifferences: string
  metiProductDifferences: string
  exportNonIntegratedProducts: string
  error: boolean
  forgot: boolean
}

interface MetiProduct {
  id: number
  productCode: string
  productName: string
  measurementUnit: string
  validDays: string
  district: string
  family: string
  subfamily: string
  subfamilyValidityThreshold: string
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
  name: string
  emails: string
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
  deliverySlip: string
  warehouse: string
  store: string
  date: string
  success: string
  failureReason: string
  fileDownloaded: string
  reProcessing: string
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
  raceCode: string
  raceType: string
  loadingPlace: string
  uploadDate: string
  carNumber: string
  warehouseName: string
  driverName: string
  driverPhone: string
  hubName: string
  storeName: string
  society: string
  goodsCategory: string
  numberOfPallets: number
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
  resolved: string
  resolvingDate: string
  resolvedBy: string
  resolvingComment: string
  unload: string
  hasAttachment: boolean
}

interface UnorderedProducts {
  id: number
  depositName: string
  shopName: string
  shopCode: string
  productCode: string
  productName: string
  productEan: string
  validatedQuantity: number
  brokenQuantity: number
  defectReason: string
  externalSupportCode: string
  deliveryTicketExternalId: string
  created: string
  createdBy: string
  resolved: boolean
  updated: string
  lastUpdateBy: string
}
