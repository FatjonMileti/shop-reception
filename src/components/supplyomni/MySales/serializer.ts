import { formatPayloadDate, formatUIDate } from 'utils/helpers'
import { SaleModel, TableRowModel } from './models'

export const toTableRowItems = (items: any[], isUIDate): TableRowModel[] =>
  items.map((item: SaleModel) => ({
    proformaId: item.proformaId,
    orderCreationDate: isUIDate
      ? formatUIDate(item.orderCreationDate)
      : formatPayloadDate(item.orderCreationDate),
    productName: item.productName,
    productEan: item.productEan,
    productPrice: item.productPrice,
    productQuantity: item.productQuantity,
    totalPrice: item.totalPrice
  }))
