import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductGeneralInfo } from './ProductGeneralInfo'
import { KeyValuePairs } from 'components/core-ui/KeyValuePairs'
import { Icon } from 'components/core-ui/Icon'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { toProductStockKeyValuePairs } from './serializers'
import s from './ProductStockDetails.modules.scss'

const ProductStockDetails = ({ stock, infoItems, actions }) => {
  const navigate = useNavigate()

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
        addToCartAction={actions.addToCart}
      />
      <div>
        <KeyValuePairs
          pairs={toProductStockKeyValuePairs(infoItems, items)}
          columns={2}
          className={s.stockInfo}
        />
        {actions?.viewOtherStocks && (
          <div className={s.otherStocksBtnContainer}>
            <IconButton
              onClick={() => navigate(actions.viewOtherStocks.href)}
              label={actions.viewOtherStocks.label}
              variant={actions.viewOtherStocks.variant}
              endIcon={<Icon iconName="StoreMallDirectoryOutlined" tiny={true} fill='primary' />}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductStockDetails
