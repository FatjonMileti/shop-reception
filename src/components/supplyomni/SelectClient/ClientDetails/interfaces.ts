import { AsyncAutocompleteOption } from 'components/core-ui/AsyncAutocomplete/AsyncAutocompleteDefinitions'

interface Address {
  city: string
  county: string
  address: string
  countyCode: string
  fullAddress: string
}

export interface Client {
  id: string
  email: string
  phone: string
  address: Address
  name: string
  cif: string
  companyRegistrationNumber: string
}

export interface OrderFormaData {
  clientId: number | string
  paymentMethod: string
  deliveryType: string
  hasDifferentDeliveryAddress: boolean
  hasDeliveryDate: boolean
  city: { id: string; name: string }
  county: { id: string; name: string }
  newDeliveryAddress: { address: string }
}
