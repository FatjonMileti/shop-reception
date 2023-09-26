import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { ProductStockInfoProps } from './ProductStockInfoDefinitions'
import { ProductStockDetails } from './ProductStockDetails'
import s from './ProductStockInfo.modules.scss'
import { Paper } from '@mui/material'

const ProductStockInfo = (props: ProductStockInfoProps) => {
  const { infoItems, actions } = props

  const product = useSelector((state: RootState) => state.product)

  return (
    <Paper className={s.productTab}>
      <ProductStockDetails
        stock={product[product.selectedStockType]}
        infoItems={infoItems}
        actions={actions}
      />
    </Paper>
  )
}

export default ProductStockInfo
