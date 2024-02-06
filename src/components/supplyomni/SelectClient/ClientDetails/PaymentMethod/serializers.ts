import { OrderFormaData } from '../interfaces'

export const toOrderPayload = (values: OrderFormaData) => ({
  clientId: values.clientId,
  paymentMethod: values.paymentMethod,
  deliveryType: values.deliveryType,
  ...(values.hasDifferentDeliveryAddress
    ? {
        newDeliveryAddress: {
          city: values.city,
          county: values.county,
          address: values.newDeliveryAddress.address
        }
      }
    : {})
})
