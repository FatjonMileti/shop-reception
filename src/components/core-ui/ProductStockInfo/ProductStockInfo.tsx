import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { ProductStockInfoProps } from './ProductStockInfoDefinitions'
import { ProductStockDetails } from './ProductStockDetails'
import s from './ProductStockInfo.modules.scss'

const ProductStockInfo = (props: ProductStockInfoProps) => {
  const { infoItems, actions } = props

  const product = useSelector((state: RootState) => state.product)

  return (
    <div className={s.productTab}>
      <ProductStockDetails stock={product[product.selectedStockType]} infoItems={infoItems} actions={actions} />
    </div>
  )
}

export default ProductStockInfo
