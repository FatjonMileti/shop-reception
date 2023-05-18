import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import { makeCorePostRequest } from 'utils/api'
import { useNotification } from 'hooks'
import s from './ProductGeneralInfo.modules.scss'

const ProductGeneralInfo = ({ price, currency, eanCode, storeCode, addToCartAction }) => {
  const navigate = useNavigate()

  const { showNotification } = useNotification()

  const addToCart = async () => {
    const { action } = addToCartAction

    try {
      if (action.type === 'POST') {
        await makeCorePostRequest(`${action.url}`, { eanCode, storeCode })
        showNotification({
          message: 'Produsul a fost adaugat in cos',
          type: 'success'
        })
      }
      navigate(addToCartAction.href)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la adaugarea produsului in cos. ${error?.message}`,
        type: 'error'
      })
    }
  }

  return (
    <div>
      <div className={s.infoContainer}>
        <div className={s.price}>
          {price} {currency}
        </div>
        <IconButton
          onClick={addToCart}
          label="Adauga in cos"
          variant="contained"
          endIcon={<Icon iconName="AddCircle" tiny={true} fill='white' />}
        />
      </div>
      <Divider component="div" />
      <div className={s.infoContainer}>
        <span className={s.firstCode}>
          Cod EAN: <strong>{eanCode}</strong>
        </span>
        <span className={s.secondCode}>
          Cod intern: <strong>{storeCode}</strong>
        </span>
      </div>
    </div>
  )
}

export default ProductGeneralInfo
