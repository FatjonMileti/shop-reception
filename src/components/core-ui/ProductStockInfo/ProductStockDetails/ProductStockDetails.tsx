import * as React from 'react'
import { ProductGeneralInfo } from './ProductGeneralInfo'

const ProductStockDetails = ({ stock }) => {
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
      {Object.keys(items).map(key => {
        return (
          <div>
            {key}: {items[key]}
          </div>
        )
      })}
    </div>
  )
}

export default ProductStockDetails
