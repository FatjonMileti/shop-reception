import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import s from './ProductTitle.modules.scss'

const ProductTitle = () => {
  const product = useSelector((state: RootState) => state.product)

  return product.title ? (
    <h2 className={s.productTitle}>{product.title}</h2>
  ) : (
    ''
  )
}

export default ProductTitle
