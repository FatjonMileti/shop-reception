import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { Accordion } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import { Box } from '@mui/material'
import { ProductStockInfoProps } from './ProductStockInfoDefinitions'
import { ProductStockDetails } from './ProductStockDetails'
import s from './ProductStockInfo.modules.scss'

const ProductStockInfo = (props: ProductStockInfoProps) => {
  const { type, icon, title, infoItems, actions } = props

  const product = useSelector((state: RootState) => state.product)

  return product[type] ? (
    <div className={s.productStockContainer}>
      <Accordion
        key={type}
        summary={
          <span className={s.productTypeTitle}>
            <Icon iconName={icon} tiny={true} />
            {title}
          </span>
        }
        details={
          <ProductStockDetails stock={product[type]} infoItems={infoItems} actions={actions} />
        }
        defaultExpanded={true}
        id={type}
        onChange={function noRefCheck() {}}
      />
    </div>
  ) : null
}

export default ProductStockInfo
