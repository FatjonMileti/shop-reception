import { DeliveryTicket } from './interfaces'

export const toTableRowItems = (items: DeliveryTicket[]) =>
  items.map((item: DeliveryTicket) => ({
    id: item.id,
    createdBy: item.createdBy,
    created: item.created,
    lastUpdateBy: item.lastUpdateBy,
    lastUpdate: item.lastUpdate,
    externalTicketId: item.externalTicketId,
    externalShopCode: item.externalShopCode,
    shopCode: item.shopCode,
    deliveryType: item.deliveryType,
    deliveryDate: item.deliveryDate,
    deliveryHour: item.deliveryHour,
    expectedDeliveryDate: item.expectedDeliveryDate,
    transporterCode: item.transporterCode,
    transportCode: item.transportCode,
    sealCode: item.sealCode,
    truckNumber: item.truckNumber,
    driverCode: item.driverCode,
    temperature: item.temperature,
    status: item.status,
    validatedShopCodes: item.validatedShopCodes,
    sentShopCodes: item.sentShopCodes,
    deposit: item.deposit,
    receptionFile: item.receptionFile,
    statusValue: item.statusValue,
    shopCodeName: item.shopCodeName,
    numberOfSupports: item.numberOfSupports,
    validatedSupports: item.validatedSupports
  }))
