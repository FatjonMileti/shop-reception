export interface CountyCityInterface {
  value: any
  label: string
}

export interface PersoanaFizica {
  name: string
  phone: string
  email: string
  address: string
  county: {
    id: string | number
    name: string
  }
  city: {
    id: string | number
    name: string
  }
  type: string
}

export interface PersoanaJuridica {
  name: string
  cif: string
  tradeRegister: string
  bank: string
  bankAccount: string
  phone: string
  email: string
  address: string
  county: {
    id: string | number
    name: string
  }
  city: {
    id: string | number
    name: string
  }
}
