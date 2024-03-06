export interface Product {
  id: string;
  name: string;
  metiCode: number;
  familyName: string;
  familyCode: number;
  subfamily: string;
  unitBusiness: string;
  metricUnit: string;
  dlcDays: number;
  enable: boolean;
  batch: boolean;
  divisiontype: string;
  imageUrl: string;
}

export interface Supplier {
  id: string;
  productCode: number;
  supplierCode: number;
  supplierName: string;
  enable: boolean;
}


export interface ReceivedProduct {
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
  closeReason: string;
  dlcDays: number;
  verifiedBy: string;
  verifiedDate: string;
  consumedAmount: number;
  modifiedDate: string;
  modifiedBy: string;
  verified: boolean;
  imageUrl: string;
  createdBy: string;
  createdUser: boolean;
}

export interface SubfamilyItem {
  index: number
  subFamily: string
}

export interface FamilyItem {
  id: string
  name: string
}


export enum CloseReason {
  OUT_OF_STOCK = 'In afara stocului',
  NON_CONFORM = 'Neconform',
  WITHDRAWN = 'Retras',
  EXPIRED = 'Expirat',
  OTHER = 'Altul'
}