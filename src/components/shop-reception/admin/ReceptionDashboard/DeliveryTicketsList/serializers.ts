import { DeliveryTicket } from "./interfaces";

export const toTableRowItems = (items: DeliveryTicket[]) => items.map((item: DeliveryTicket) => ({
  id: item.id,
  shopCode: item.shopCode || '',
  depositName: item.depositName || '',
  externalTicketId: item.externalTicketId || '',
  status: item.status || '',
  transportCode: item.transportCode || '',
  sealCode: item.sealCode || '',
  truckNumber: item.truckNumber || '',  
  numberOfSupports: item.numberOfSupports || 0,
  validatedSupports: item.validatedSupports || 0,
  created: item.created || '',
}))

