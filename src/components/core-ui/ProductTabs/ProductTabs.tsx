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
  const [tabLabels, setTabLabels] = React.useState(rest.tabs.map(tab => tab.label))

  React.useEffect(() => {
    // console.log("[ProductTabs] product: ", product)
    setTabLabels(rest.tabs.map(tab => tab.content && product[tab.content.id] ? `${tab.content.title} (${product[tab.content.id].available} buc)` : tab.label))
  }, [product])

  // console.log("[ProductTabs] rest: ", rest)

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
      <Tabs {...rest} labels={tabLabels} handleChange={handleChange} value={product.selectedStockTab} />
    </div>
  ) : null
}

export default ProductTabs
