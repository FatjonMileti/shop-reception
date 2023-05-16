import * as React from 'react'
import { Divider, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import s from './ProductGeneralInfo.modules.scss'

const ProductGeneralInfo = ({ price, currency, eanCode, storeCode }) => {
  return (
    <div>
      <div className={s.infoContainer}>
        <div className={s.price}>
          {price} {currency}
        </div>
        <IconButton
          onClick={() => console.log('adauga in cos')}
          label="Adauga in cos"
          variant="contained"
          endIcon={<Icon iconName="Add" tiny={true} />}
        />
      </div>
      <Divider component="div" />
      <div className={s.infoContainer}>
        <span className={s.firstCode}>Cod EAN: <strong>{eanCode}</strong></span>
        <span className={s.secondCode}>Cod intern: <strong>{storeCode}</strong></span>
      </div>
    </div>
  )
}

export default ProductGeneralInfo
