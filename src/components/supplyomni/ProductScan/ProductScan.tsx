import s from './ProductScan.modules.scss'
import { useState } from 'react'
import { ProductTabs } from './ProductTabs'
import ProductGeneralInfo from './ProductGeneralInfo/ProductGeneralInfo'
import { ProductStockResponse } from './interfaces'
import { ProductBarcodeScanner } from 'components/core-ui/ProductBarcodeScanner'

const ProductScan = () => {
  const [product, setProduct] = useState<ProductStockResponse>(null)

  return (
    <div className={s.mainContainer}>
      <ProductBarcodeScanner
        action={{ url: '/supply-omni/product', type: 'GET' }}
        onProductChange={value => setProduct(value)}
      />

      {product && (
        <>
          <h2 className={s.productTitle}>{product.title}</h2>
          <ProductTabs
            value={0}
            id="test"
            tabs={[
              {
                content: (
                  <ProductGeneralInfo
                    product={product.storeStock}
                    neighboursStock={product.neighboursStock}
                  />
                ),
                label: `Stoc magazin (${product.storeStock.available} buc)`,
                tabIndex: 0
              },
              {
                content: (
                  <ProductGeneralInfo
                    product={product.warehouseStock}
                    neighboursStock={product.neighboursStock}
                  />
                ),
                label: `Stoc depozit ${product.warehouseStock.locationName} (${product.warehouseStock.available} buc)`,
                tabIndex: 1
              }
            ]}
            product={product}
          />
        </>
      )}
    </div>
  )
}

export default ProductScan
