interface Address {
  address: string
  city: string
  county: string
  countryCode: string
  fullAddress: string
}

export interface RowItem {
  id: string
  name: string
  cif: string
  address: Address
  phone: string
}

export interface TableRowItem {
  id: string
  name: string
  cif: string
  address: string
  phone: string
}
