import * as React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'configureStore'
import { ProductActions } from 'reducers/productSlice'
import { Tabs } from '../Tabs'
import s from './ProductTabs.modules.scss'

const ProductTabs = props => {
  const { value, ...rest } = props

  const product = useSelector((state: RootState) => state.product)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProductActions.setProduct({ selectedStockTab: value }))
  }, [value])

  const handleChange = (_, newValue: number) => {
    dispatch(
      ProductActions.setProduct({
        selectedStockTab: newValue,
        selectedStockType: rest.tabs[newValue].content.type
      })
    )
  }

  return product.title ? (
    <div className={s.productTabs}>
      <Tabs {...rest} handleChange={handleChange} value={product.selectedStockTab} />
    </div>
  ) : null
}

export default ProductTabs
