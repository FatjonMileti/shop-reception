import * as React from 'react'
import { ProductGeneralInfo } from './ProductGeneralInfo'
import { KeyValuePairs } from 'components/core-ui/KeyValuePairs'
import { toProductStockKeyValuePairs } from './serializers'
import s from './ProductStockDetails.modules.scss'

const ProductStockDetails = ({ stock, infoItems }) => {
  const {
    price,
    currency,
    eanCode,
    storeCode,
    available,
    sold,
    reserved,
    initialStock,
    imobStock
  } = stock

  const items = { available, sold, reserved, initialStock, imobStock }
  return (
    <div>
      <ProductGeneralInfo
        price={price}
        currency={currency}
        eanCode={eanCode}
        storeCode={storeCode}
      />
      <div>
      <KeyValuePairs
        pairs={toProductStockKeyValuePairs(infoItems, items)}
        columns={2}
        className={s.stockInfo}
      />
      </div>
    </div>
  )
}

export default ProductStockDetails
