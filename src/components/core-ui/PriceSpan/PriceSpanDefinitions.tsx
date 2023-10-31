export interface PriceSpanProps {
  value: string | number
  currency: string
  totalPrice?: string | number
  color?: string
  discountLabel?: string
  totalPriceWithoutDiscount?: string | number
}
