import { formatPayloadDate } from 'utils/helpers'
import { SaleModel, TableRowModel } from './models'

export const toTableRowItems = (items: SaleModel[]): TableRowModel[] =>
  items.map((item: SaleModel) => ({
    orderCreationDate: formatPayloadDate(item.orderCreationDate),
    productName: item.productName,
    productEan: item.productEan,
    productPrice: item.productPrice,
    productQuantity: item.productQuantity,
    totalPrice: item.totalPrice
  }))
