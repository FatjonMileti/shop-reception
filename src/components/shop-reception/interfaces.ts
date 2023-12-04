interface TruckItem {
  id: number;
  store: string;
  hub: string;
  warehouseName: string;
  truckLocation: string;
  registrationNumber: string;
  driverCode: string;
  raceCode: string;
  seals: string;
  deliveryReceipts: string;
  complianceDocuments: string;
  thermodiagramConformity: string;
  receptionWithinHours: string;
  sealCompliance: string;
  status: string;
  registrationDate: string;
  registrationOperator: string;
  eTransportStatus: string;
}

interface DeliverySlip {
  id: number;
  store: string;
  warehouseName: string;
  deliverySlip: string;
  status: string;
  seal: string;
  raceCode: string;
  registrationNumber: string;
  expectedSupports: string;
  destinationReachedSupports: string;
  registrationDate: string;
}

interface AdminDeposit {
  id: number;
  depositCode: string;
  name: string;
  depositType: string;
  address: string;
  validityPercentage: string;
  emails: string;
  active: boolean;
}

interface AdminHub {
  id: number;
  hubCode: string;
  name: string;
  hubType: string;
  address: string;
  hourlyIntervals: number;
  active: boolean;
}

interface AdminStore {
  id: number;
  storeCode: string;
  name: string;
  storeType: string;
  METIVersion: string;
  adCode: string;
  grams: number;
  region: string;
  ip: string;
  way: string;
  quantities: string;
  active: boolean;
  hourlyIntervals: number;
}

interface AdminRegion {
  id: number;
  regionCode: string;
  name: string;
  regionManager: string;
  active: boolean;
}

interface CentralizeStoresHub {
  id: number;
  store: string;
  deposit: string;
  hubs: string;
}

interface ScanType {
  id: number;
  storeType: string;
  region: string;
  storeCode: string;
  storeName: string;
  scanType: string;
  startDate: string;
  lastDate: string;
  active: boolean;
}

interface SensitiveProduct {
  id: number;
  storeType: string;
  storeCode: string;
  storeName: string;
  district: string;
  family: string;
  subfamily: string;
  UbCode: string;
  productCode: string;
}

interface SubFamilyValidityThreshold {
  id: number;
  familyCode: string;
  subfamilyCode: string;
  subfamily: string;
  family: string;
  districtCode: string;
  district: string;
  validityThreshold: string;
}

interface PackingType {
  id: number;
  packagingCode: string;
  additionalCodes: string;
  name: string;
  main: string;
  combination: string;
  active: boolean;
  return: string;
  generatedBarcode: string;
}

interface BalancePackage {
  id: number;
  store: string;
  hub: string;
  society: string;
  supportType: string;
  qualitativeInventory: string;
  theoreticalStock: string;
  inventoryDefect: string;
  difference: string;
  finalStockAfterInventory: string;
  inventoryManager: string;
  inventoryDate: string;
  inventoryUpdate: string;
  inventoryHistory: string;
}

interface DifferencesProduct {
  id: number;
  deliverySlip: string;
  store: string;
  warehouse: string;
  productName: string;
  homeOrder: string;
  metiOrder: string;
  unitOfMeasure: string;
  expectedQuantity: string;
  qualitativeReceivedQuantity: string;
  defectiveReceivedQuantity: string;
  grams: string;
  inStockQuantity: number;
  difference: string;
  raceCode: string;
  sentToMeti: string;
  integrationOperator: string;
}

interface DLCProducts {
  id: number;
  storeType: string;
  storeCode: string;
  storeName: string;
  district: string;
  family: string;
  subfamily: string;
  UbCode: string;
  productCode: string;
}

interface MetiFile {
  id: number;
  deliverySlip: string;
  store: string;
  warehouse: string;
  integrationOperator: string;
  status: string;
  sentFile: string;
  receivedFile: string;
  sentToMeti: string;
  receivedFromMeti: string;
  productsDifferences: string;
  metiProductDifferences: string;
  exportNonIntegratedProducts: string;
  error: boolean;
  forgot: boolean;
}