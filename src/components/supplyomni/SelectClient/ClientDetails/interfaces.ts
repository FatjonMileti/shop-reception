interface Address {
  city: string
  county: string
  countyCode: string
  address: string
  fullAddress: string
}

export interface Client {
  id: string
  email: string
  phone: string
  address: Address
  name: string
  cif: string
  tradeRegister: string
  bank: string
  bankAccount: string
  type: string
}
