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