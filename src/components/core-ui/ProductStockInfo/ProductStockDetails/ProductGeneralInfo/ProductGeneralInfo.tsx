import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Divider, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import { makeCorePostRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { ProductActions } from 'reducers/productSlice'
import s from './ProductGeneralInfo.modules.scss'

const ProductGeneralInfo = ({
  price,
  currency,
  eanCode,
  storeCode,
  addToCartAction,
  isWarehouse,
  hasBuyback,
  buybackOptions
}) => {
  const navigate = useNavigate()

  const { showNotification } = useNotification()

  const dispatch = useDispatch()

  const [selectedBuybackOption, setSelectedBuybackOption] = React.useState(hasBuyback && buybackOptions[0].value || '')

  const addToCart = async () => {
    const { action } = addToCartAction

    try {
      if (action.type === 'POST') {
        await makeCorePostRequest(`${action.url}`, { ean: eanCode, quantity: 1, isWarehouse, buyback: selectedBuybackOption })
        showNotification({
          message: 'Produsul a fost adaugat in cos',
          type: 'success'
        })
      }
      dispatch(ProductActions.clearProduct())
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
          {price}&nbsp;{currency}
        </div>
        <IconButton
          onClick={addToCart}
          label="Adauga in cos"
          variant="contained"
          endIcon={<Icon iconName="AddCircle" tiny={true} fill="white" />}
        />
      </div>
      <Divider component="div" />
      {hasBuyback && <div className={s.infoContainer} style={{ justifyContent: 'flex-end' }}>
        <Input 
          type='select'
          name='buyback-input'
          label='Mod achizitie'
          values={buybackOptions}
          value={selectedBuybackOption}
          variant='standard'
          width='320px'
          onChange={event => setSelectedBuybackOption((event.target as any).value)}
          disabled={buybackOptions.length == 1}
        />
      </div>}
      {hasBuyback && <Divider component="div" />}
      <div className={s.infoContainer}>
        <span className={s.firstCode}>
          <span className={s.lightText}>Cod EAN:</span> <strong>{eanCode}</strong>
        </span>
        <span className={s.secondCode}>
          <span className={s.lightText}>Cod intern:</span> <strong>{storeCode}</strong>
        </span>
      </div>
    </div>
  )
}

export default ProductGeneralInfo
