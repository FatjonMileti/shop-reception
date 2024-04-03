interface Product {
  id: string;
  name: string;
  metiCode: number;
  pluCode: string;
  familyName: string;
  familyCode: number;
  subfamily: string;
  unitBusiness: string;
  metricUnit: string;
  dlcDays: number;
  enable: boolean;
  batch: boolean;
  divisiontype?: string;
  imageUrl: string;
}

interface Supplier {
  id: string;
  productCode: number;
  supplierCode: number;
  supplierName: string;
  enable: boolean;
}

interface Batch {
  id: string;
  product: Product;
  supplier: Supplier;
  entryDate: string;
  expireDate: string;
  batchName: string;
  hasExpireDate: boolean;
  hasSecondaryDlc: boolean;
  batchQuantity: number;
  batchStatus: string;
  dlcDays: number;
  isVerified: boolean;
  consumedAmount: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
  imageUrl: string;
}

interface TraceabilityFrozen {
  id: string;
  batch: Batch;
  quantity: number;
  openingDate: string;
  dlc: string;
}

interface Store {
  id: string;
  metiCode: number;
  name: string;
  storeType: string;
}

export interface TracedProduct {
  id: string;
  product: Product;
  store: Store;
  productionDate: string;
  chargeNumber: string;
  productionOperator: string;
  quantity: number;
  thermalCondition: string;
  conform: boolean;
  dlc: string;
  nonComplianceReason: string;
  productDestination: string;
  modifiedBy: string;
  modifiedDate: string;
  createdBy: string;
  createdDate: string;
  traceabilityFrozenList: TraceabilityFrozen[];
  frozen: boolean;
  verified: boolean;
  createdUser: boolean;
}