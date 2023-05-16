import * as React from 'react'
import { Divider } from '@fullscreendigital/carrefour-dex-fe'

const ProductGeneralInfo = ({ price, currency, eanCode, storeCode }) => {
  return (
    <div>
      {price} {currency}
      <Divider component="div" />
      Cod ean: {eanCode} Cod intern: {storeCode}
    </div>
  )
}

export default ProductGeneralInfo
