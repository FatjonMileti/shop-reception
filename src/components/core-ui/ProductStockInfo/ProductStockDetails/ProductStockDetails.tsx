import { ProductGeneralInfo } from './ProductGeneralInfo'
import { KeyValuePairs } from 'components/core-ui/KeyValuePairs'
import { toProductStockKeyValuePairs } from 'utils/serializers'
import s from './ProductStockDetails.modules.scss'

const ProductStockDetails = ({ stock, infoItems, actions }) => {
  const {
    price,
    currency,
    id,
    eanCode,
    storeCode,
    available,
    sold,
    reserved,
    initialStock,
    imobStock,
    isWarehouse,
    hasBuyback,
    buybackOptions
  } = stock

  const items = { available, sold, reserved, initialStock, imobStock }

  return (
    <div>
      <ProductGeneralInfo
        price={price}
        currency={currency}
        id={id}
        eanCode={eanCode}
        storeCode={storeCode}
        addToCartAction={actions.addToCart}
        isWarehouse={isWarehouse}
        hasBuyback={hasBuyback}
        buybackOptions={buybackOptions}
        available={available}
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
